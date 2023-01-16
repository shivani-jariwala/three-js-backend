const userModel = require("../models/userModel");

let userArray = []
// let userArray=[
//   {
//     id: '1673789099863',
//     email: 's@s.com',
//     password: '$2a$10$QGxkYLUKGIgKYb90a3.IiOu0omwJoeWTukHbyl5pg9qDd/pzWF4RK'
//   }
// ]

const register = (email, password) => {
  try {
  /**  when connected to DB */
  // const newUser = userModel({ ...user });
  // await newUser
  //   .save()
  //   .then((result) => {
  //     return callback(false, { message: "User created successfuly!" });
  //   })
  //   .catch((err) => {
  //     return callback({ errMessage: "Email already in use!", details: err });
  //   });

  /** here we're not connecting to DB, therefore just pushing it in array */
  userArray.push({id: Date.now().toString(), email, password});
  // return callback(false, { message: "success" });
  console.log("suer",userArray)
  return true;
  } catch (err) {
    return false;
  } 
};

const login = async (email, callback) => {
  try {
    /**  when connected to DB */
    // let user = await userModel.findOne({ email });
    // if (!user) return callback({ errMessage: "Your email/password is wrong!" });
    // return callback(false, { ...user.toJSON() });
    /** here we're not connecting to DB, therefore just retrieve it from an array */

    const filteredArray = userArray.filter((e) => {
      if(e.email == email) {
        return e;
      }
    });
    console.log("userArray",userArray,filteredArray)
    return filteredArray;
  } catch (err) {
    return false;
  }
};

module.exports = {
  register,
  login
};
