const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
const crypto = require('crypto');


const Schema = mongoose.Schema;

const userSchema = new Schema ({
        username: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        hashedPassword:{    
            type: String,
            require: true,
        },
        salt: String,
        
},{
    timestamps: true,
});

//virtual field

userSchema.virtual("password").set(function(password){
    //create temp variable
    this._password = password;

    this.salt = uuidv1();

    //encrypt the pass
    this.hashedPassword = this.encryptPassword(password);
});

userSchema.methods = {
    encryptPassword: function(password){
        if(!password)   return "";
        try {
            return crypto.createHmac("sha256",this.salt)
                        .update(password)
                        .digest("hex");
        }
        catch(err){

        }
    },
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashedPassword;
    }
}

module.exports = mongoose.model('User', userSchema)