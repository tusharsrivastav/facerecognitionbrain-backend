const register = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  const saltRounds = 10;

  if (!email || !password || !name) {
    return res.status(400).json("incorrect form data");
  }

  bcrypt.hash(password, saltRounds).then((hash) => {
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          const newUser = {
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          };

          return trx("users")
            .insert(newUser)
            .returning("*")
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => {
      console.log(err);
      res.status(400).json("unable to register");
    });
  });
};

export default register;
