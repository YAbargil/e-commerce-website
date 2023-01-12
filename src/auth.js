import jwt from "jsonwebtoken";

export const createToken = (user) => {
  var token = jwt.sign(
    {
      username: user.username,
      email: user.email,
    },
    process.env.SECRET
  );

  return token;
};

export const checkToken = (token) => {
  jwt.verify(token, process.env.SECRET);
};

export const isAuthorized = (req, res, next) => {
  let bearer = req.headers["authorization"] || null;
  if (!bearer) {
    res.status(401).send({ msg: "Unauthorized!" });
    return;
  }
  let [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).send({ msg: "Unauthorized!" });
    return;
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ msg: "Unauthorized!" });
    } else {
      console.log("token verified");
      next();
    }
  });
};
