import mongoose from "mongoose";

const AttemptSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    userAnswer:{
        type:String,
        required:true,
    },
    aiAnswer:{
        type:String,
        default: null,
    },
    selfRating:{
        type:String,
        enum:["got it!","partially Correct","Missed it"],
        default:null,
    },
    nextReviewDate:{
        type: Date,
        default: null,
    }

},{timestamps:true});

const Attempt =mongoose.model("Attempt",AttemptSchema);
export default Attempt;