import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, 'Username must be at least 3 characters long'],
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long'],
    },
    role:{
        type: String,
        required: true,
        enum: ["chef", "customer", "admin"],
        default: "customer",
    },
    profileImage:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
        minLength: [10, 'Phone number must be at least 10 digits long'],
        match:[/^[6-9]\d{9}$/, "Invalid phone number format"],
        trim: true,
    },
    address:{
        street:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        pincode:{
            type: Number,
            required: true,
            minLength: [6, 'Pincode must be at least 6 digits long'],
        },
        coordinates:{
            lat:{
                type: Number,
            },
            lng:{
                type: Number,
            }
        },
        //Chef specific fields
        chefProfile:{
            documents:[
                {
                    type: String,
                }
            ],
            isVerified:{
                type: Boolean,
                default: false,
            },
            appliedAt:{
                type: Date,
            },
            verifiedAt:{
                type: Date,
            },
            category:[
                {
                    type: String,
                }
            ],
            isAvailable:{
                type: Boolean,
                default: true,
            },
            rating:{
                type: Number,
                default: 0,
                min: 0,
                max: 5,
            },
            fssai:{
                type: Number,
            },
            accountStatus:{
                type: String,
                enum: ["pending", "approved", "rejected", "blocked"],
                default: "pending",
            },
            bio:{
                type: String,
                max: [200, 'Bio cannot exceed 200 characters'],
            },
            reviews:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ReviewModel",
                }
            ]
        }
    }

}, {timestamps: true});

const userModel = mongoose.models.userModel || mongoose.model("userModel", userSchema);

export default userModel;