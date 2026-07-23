import React from "react";
import   {useEffect,useContext} from "react"
import { createContext } from "react";
import { useState } from "react";
import api from "../api/axios.js"

const AuthContext= createContext(null);

export const authProvider =({children})=>{

    const [user, setUser]= useState(null);
    const [authError ,setAuthError]= useState(null);
    const [authLoading,setAuthLoading]= useState(false);
    const [checkingSession, setCheckingSession] =useState(true);

    useEffect( ()=>{
        const rehydrate = async () => {
        try {
            const res = await api.get("/api/auth/me");
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setCheckingSession(false);
        }
        };
        rehydrate();
    },[]);

    const signUp =async({name,email,password})=>{
        setAuthError(null);
        setCheckingSession(true);
        try {
            const res= await api.post("api/auth/signup",{name,email,password});
            setUser(res.data);
            return true;
        } catch (error) {
            setAuthError(error.response?.data?.message ||"SignUp Failed");
            return false;
        }finally{
            setAuthLoading(false)
        }
    }
    const login =async({email,password})=>{
        setAuthError(null);
        setCheckingSession(true);
        try {
            const res=await api.post("api/auth/login" ,{email,password})
            setUser(res.data);
            return true;
        } catch (error) {
            setAuthError(error.response.data.message ||"Login Failed")
        }finally{
            setAuthLoading(false);
        }
    }
    const logout =async()=>{
        try {
            await api.post("api/auth/logout");
        } catch (error) {
            console.log(error.message);
        }setUser(null);

    }
    return (
        <AuthContext.Provider
        value={{ user, authError, authLoading, checkingSession, signUp, login, logout }}
        >
            {children}
        </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
};