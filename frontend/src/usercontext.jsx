import axios from "axios";
import { createContext, useEffect, useState } from "react";
import data from "autoprefixer";
export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser]= useState(null);
    const [ready,setReady]= useState(false);
    useEffect(()=>{
        if (!user){
            axios.get('http://localhost:4000/profile', { withCredentials: true })
    .then(({ data }) => {
        console.log("Fetched profile data:", data); // Debug log
        setUser(data);
        setReady(true);
    })
    .catch((error) => {
        console.error("Error fetching profile:", error);
    });
 }
    }, []);
    return(
       <UserContext.Provider value={{user,setUser,ready}}>
        {children}
        </UserContext.Provider>
    );
}