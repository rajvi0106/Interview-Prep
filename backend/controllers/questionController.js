import Question from "../models/question.models.js";

export const addQuestion =async(req,res)=>{
    try {
        const {topic, difficulty, questionText, modelAns, keyConcepts} = req.body;

        const question =new Question({
            topic,
            difficulty,
            questionText,
            modelAns,
            keyConcepts
        });
        await question.save();

        res.status(201).json(question);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// random que
export const getQuestion= async(req,res)=>{
    try {
        const {topic,difficulty}=req.query;
        const filter={};
        if(topic) filter.topic=topic;
        if(difficulty) filter.difficulty=difficulty;
        const count=await Question.countDocuments(filter);
        if(count==0) {
            return res.status(404).json({message:"No questions found for the given criteria"});
        }

        const random =Math.floor(Math.random()*count);
        const que=await Question.findOne(filter).skip(random);
        res.json(que);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//all que

export const getAllQuestion=async(req,res)=>{
    try {
        const que=await Question.find();
        res.json(que);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}