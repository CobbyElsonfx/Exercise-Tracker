const mongoose = require("mongoose")
const {isEmail, isStrongPassword} = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:[true,"Username is already in use"],
        lowercase:true
    },
    email : {
        type:String,
        required : true ,
        unique:[true,"Email already exist" ],
        lowercase: true,
        validate: [isEmail, "Invalid Email"]

    },
    password : {   
        type:String,
        minLength :[6, "Password must be more than Six characters"],
        required:true
    
    }
})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// userSchema.statics.login = async (email, password)=>{
//     const user = await this.findOne({email})
// }





module.exports = mongoose.model("user", userSchema)