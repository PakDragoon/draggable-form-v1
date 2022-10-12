const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Data = require('./data')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is not valid!')
                }
            }
        },
        password: {
            type: String, 
            required: true,
            trim: true,
            minlength: 7,
            validate(value){
                if(value.toLowerCase().includes('password')){
                    throw new Error(`Password cannot be 'password'`)
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]

    }, {
        timestamps: true
    }
)

userSchema.virtual('datas', {
    ref: 'Data',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
userSchema.methods.generateAuthToken = async function () {
    const userAuth = this
    const token = jwt.sign({_id: userAuth._id}, 'thisismynewtoken')
    userAuth.tokens = userAuth.tokens.concat({token})
    await userAuth.save()
    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const userFound = await User.findOne({ email })
    if(!userFound){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, userFound.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return userFound
}
userSchema.pre('save', async function (next) {
    const userData = this
    if(userData.isModified('password')){
        userData.password = await bcrypt.hash(userData.password, 8)
    }
    next()
})
userSchema.pre('remove', async function (next) {
    const user = this
    await Data.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User 