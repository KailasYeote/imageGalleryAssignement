const mongoose =require('mongoose')

const userSchema=mongoose.Schema({
  fullName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    enum:["male", "female"],
    required:true
  },
  mobileNumber:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  confirmPassword:{
    type:String,
    required:true
  }
  
})

const User=mongoose.model('User', userSchema)
module.exports=User