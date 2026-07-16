import Attempt from "../models/attempt.models.js";
import Question from "../models/question.models.js";
import User from "../models/user.models.js";
import { Groq } from "groq-sdk";
import 'dotenv/config';

const groqapi=new Groq({apiKey: process.env.GROQ_API_KEY});

export const submitAttempt=async(req,res)=>{
    try{
        const {questionId,userAnswer}= req.body;
        const userId = req.user._id;
        const question=await Question.findById(questionId);
        if(!question){
            return res.status(404).json({message:"Question not found"})
        }

        const completion= await groqapi.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages:[
        {
          role: 'user',
          content: `You are a strict but fair technical interview coach.

    Question: ${question.questionText}
    Key Concepts to cover: ${question.keyConcepts.join(', ')}
    Model Answer: ${question.modelAns}
    Student's Answer: ${userAnswer}

    Give feedback in exactly this format:
    What you got right: [specific points]
    What you missed: [specific gaps]
    What to review: [one specific topic or concept]

    Keep total response under 150 words. Be specific, not generic.`
            }
        ],
        max_tokens:300
        });

        const aiAnswer= completion.choices[0].message.content;

        const attempt= await Attempt.create({
            userId,
            questionId,
            userAnswer,
            aiAnswer

        });

        //update streak
        const user= await User.findById(userId);
        const date= new Date();
        const lastPracticed=user.lastPracticed;

        if(lastPracticed){
            const diff=Math.floor((date-lastPracticed)/(1000*60*60*24));
            if(diff===1){
                user.streak++;
            }else if(diff>1){
                user.streak=1;
            }
        }else{
            user.streak=1;
        }

        user.lastPracticed=date;
        await user.save();
        res.status(201).json({
            attempt,
            aiAnswer,
            modelAns: question.modelAns
        });
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//self rate
export const selfRateAttempt=async(req,res)=>{
    try {
        const {attemptId,selfRating}= req.body;
        const attempt=await Attempt.findById(attemptId);
        if(!attempt){
            return res.status(404).json({message:"Attempt not found"});
        }

        const today = new Date();
        let nextReviewDate;

        if (selfRating === 'got it!') {
        nextReviewDate = new Date(today.setDate(today.getDate() + 7));
        } else if (selfRating === 'partially Correct') {
        nextReviewDate = new Date(today.setDate(today.getDate() + 3));
        } else if (selfRating === 'Missed it') {
        nextReviewDate = new Date(today.setDate(today.getDate() + 1));
        }
        attempt.selfRating=selfRating;
        attempt.nextReviewDate=nextReviewDate;
        await attempt.save();
        res.json({message:"Rating Saved",attempt});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//get stats
export const getDashboardStats=async(req,res)=>{
    try {
        const userid= req.user._id;
        const attempts= await Attempt.find({userId:userid}).populate("questionId");

        const noofAttempts=attempts.length;
        const topicStats = {};
        const topics = ['DSA', 'HR', 'System Design', 'CS Fundamentals'];

        for(const topic of topics){
            const topicAttempts=attempts.filter(a => a.questionId?.topic === topic && a.selfRating != null);
            const total=topicAttempts.length;
            const correct=topicAttempts.filter(a=>a.selfRating==="got it!").length;
            const accuracy= total>0 ? Math.round((correct/total)*100) : 0;
            topicStats[topic] = {
                total,
                correct,
                accuracy,
                isWeak: accuracy < 50 && total > 0
            };
        }

        const user=await User.findById(userid);

        const today= new Date();
        const dueForReview= await Attempt.find({userId:userid,nextReviewDate:{$lte:today},selfRating: { $in:['Missed it', 'partially Correct']}}).populate("questionId");
        res.json({
            noofAttempts,
            topicStats,
            streak:user.streak,
            dueForReview
        })
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

//get full history
export const getHistory=async(req,res)=>{
    try {
        const userId=req.user._id;
        const attempts=await Attempt.find({userId}).populate("questionId").sort({createdAt:-1});
        res.json({attempts});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}