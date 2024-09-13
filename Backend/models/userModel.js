// const mongoose= require('mongoose')

// // schema design 
// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,'name is required']
//     },
//     email:{
//         type:String,
//         required:[true,'email is required and should be unique'],
//         unique:true,
//     },
//     password:{
//         type:String,
//         required:[true, "password is required"],
//     }
    

// },{timestamps:true})
// //export
// const userModal= mongoose.modelNames('users',userSchema)
// module.exports=userModal




const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
