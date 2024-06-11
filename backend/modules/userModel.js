 const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    role: {
        type: String
    }
}, {
    timestamps: true
});

// Explicitly create a unique index on the email field
userSchema.index({ email: 1 }, { unique: true });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;