const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const roles = ['user', 'admin'];

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: roles,
        default: 'user',
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false
    }
});

function hashPassword(next) {
    try {
        if (this.isNew) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(this.password, salt);
            this.password = hashedPassword;
        }

        next();
    } catch(error) {
        next(error);
    }
}

function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
}

/**
 * Checks if the given role matches the role of the current object.
 *
 * @param {string} role - The role to check against.
 * @returns {boolean} - True if the role matches, false otherwise.
 */
function hasRole(role) {
    return this.role === role;
}

/**
 * Converts the user object to a JSON representation.
 * 
 * @returns {Object} The user object without the password field.
 */
function toJSON() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

UserSchema.pre('save', hashPassword);
UserSchema.methods.isValidPassword = isValidPassword;
UserSchema.methods.hasRole = hasRole;
UserSchema.methods.toJSON = toJSON;

const User = mongoose.model("user", UserSchema);

module.exports = User;
