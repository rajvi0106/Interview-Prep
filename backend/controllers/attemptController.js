import Attempt from "../models/attempt.models.js";
import Question from "../models/question.models.js";
import User from "../models/user.models.js";
import { Groq } from "groq-sdk/client.js";

const groqapi= new Groq({apiKey: process.env.GROQ_API_KEY});

export const submitAttempt=async(req,res)=>{
    try{
        const {questionId,UserAnswer}= req.body;
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

        const attempt= new Attempt.create({
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

        if (selfRating === 'Got it') {
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