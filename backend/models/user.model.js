import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema for the user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
});

// Before saving a user document, execute this middleware function
userSchema.pre('save', async function(next){
    // Check if the password field has been modified
    // If the password has not been modified, proceed to the next function if any
    if(!this.isModified('password')) return next();

    // If the password is modified (new user or password update), hash it using bcrypt
    // '10' is the salt rounds (number of iterations to generate a secure hash)
    this.password = await bcrypt.hash(this.password, 10);

    // Proceed to the next function if any or save the user document
    next();
});


// Create a mongoose model based on the schema, which represents the 'User' collection in the database
const User = mongoose.model('User', userSchema);
export default User;