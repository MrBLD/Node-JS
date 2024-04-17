import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date
}


const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required: true,
        default:Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    verifyCode: string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim: true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        // Regex for email validation
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code Expired"],
    },
    isVerified:{
        type:Boolean,
        required:[true,"Is verified is required"],
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:{
        type: [MessageSchema],
        default:[]
    }
})

const UserModel=(mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema))

export default UserModel;