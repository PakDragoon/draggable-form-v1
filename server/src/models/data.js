const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
        status: {
            type: String,
            default: 'new'
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }, {
        timestamps: true,
        strict: false
    }
)

dataSchema.pre('save', async function (next) {
    next()
})

const Data = mongoose.model('Data', dataSchema)

module.exports = Data 