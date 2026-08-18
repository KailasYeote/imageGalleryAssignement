const User=require('../models/userModel')


const saveUser=(data)=>{
  const response=User.create(data)
  return response
}

const getUser = async (id) => {
  const user = await User.findById(id).select('-password');
  return user;
};

const Login = async (email, password) => {
  const response = await User.findOne({ email: email, password: password});
  if(!response){
    console.log("Invalid email password...")
    throw new Error("Invalid email password...")
  }
  return response;
};


const updateUser = async (id, data) => {
    const response = await User.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );

    return response;
};

module.exports={saveUser, getUser, Login, updateUser}