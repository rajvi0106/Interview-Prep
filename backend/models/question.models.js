import mongoose from "mongoose";

const questionSchema= new mongoose.Schema({
    topic:{
        type:String,
        required:true,
        enum:['DSA', 'HR', 'System Design', 'CS Fundamentals'],
    },
    difficulty:{
        type:String,
        enum:['Easy', 'Medium', 'Hard'],
        required:true,
    },
    questionText:{
        type:String,
        required:true,
    },
    modelAns:{
        type:String,
        required:true,
    },
    keyConcepts: {
        type: [String],
        required: true
    }

},{timestamps:true});

const Question=mongoose.model("Question",questionSchema);
export default Question;