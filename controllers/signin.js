const signin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form data");
  }

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((user) => {
      bcrypt
        .compare(password, user[0].hash)
        .then((isValid) => {
          if (isValid) {
            return db
              .select("*")
              .from("users")
              .where("email", "=", email)
              .then((user) => {
                res.json(user[0]);
              })
              .catch((err) => res.status(400).json("error getting user"));
          } else {
            res.status(200).json("wrong credentials");
          }
        })
        .catch((err) => res.status(400).json("error comparing hash"));
    })
    .catch((err) => {
      res.status(400).json("wrong credentials");
    });
};

export default signin;
