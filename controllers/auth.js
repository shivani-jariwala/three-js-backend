const bcrypt = require("bcryptjs");
const userService = require("../services/auth");
const auth = require("../middleware/auth");

const register = async (req, res) => {
  try {
  const { name, email, password } = req.body;
  console.log("params",name,email,password);
  if (!(name && email && password)){
      const err = new Error('Please fill all required areas!')
      throw err;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.hashedPassword = hashedPassword;
  await userService.register(email,hashedPassword);
  return res.status(200).send({message:'success'});
} catch (err) {
  return res.status(400).send({
    message:'failure',
    errMessage: 'Something went wrong' || err.message
  });
}
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("params",email,password);
  if (!(email && password)){
      const err = new Error('Please fill all required areas!')
      throw err;
  }

  return userService.login(email)
  .then((res1) => {
    const hashedPassword = res1[0].hashedPassword;
    if (!bcrypt.compareSync(password, res1[0].password)){
      const err = new Error('Your email/password is wrong!')
      throw err;
    }  
    res1[0].token = auth.generateToken(res1[0].id, res1[0].email);
    res1[0].password = undefined;
    res1[0].__v = undefined;
  
    return res
      .status(200)
      .send({ message: "success", user: res1[0] });
  })
  .catch((err) => {
    console.log("err",err)
    return res.status(400).send({
      message:'failure',
      errMessage: 'Something went wrong' || err.message ? err.message : err.errorMessage
    });
  })
};

module.exports = {
    register,
    login
  };