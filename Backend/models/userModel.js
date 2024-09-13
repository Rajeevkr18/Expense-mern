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
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

// Schema design
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required and should be unique'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
}, { timestamps: true });

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

// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
