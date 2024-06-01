import { createContext, useState } from "react";

export const AuthContext=createContext(null);

export const Context=({children})=>{
  const [user,setUser]=useState('hi iam a context');
  return(
    <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}