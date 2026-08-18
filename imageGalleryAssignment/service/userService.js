const repository=require('../repository/userRepo')

const saveUser=async(data)=>{
  const response=await repository.saveUser(data)
  return response
}

const getUser=async(id)=>{
  const response =await repository.getUser(id)
  return response
}

const userLogin=async(email, password)=>{
  const response=await repository.Login(email, password)
  return response
}


const updateUser=async(id, data)=>{
  const response=await repository.updateUser(id, data)
  return response
}


module.exports={saveUser, getUser, userLogin, updateUser}