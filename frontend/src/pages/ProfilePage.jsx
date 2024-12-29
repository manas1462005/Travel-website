import { useContext, useState } from "react"
import { UserContext } from "../usercontext"
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios";
import PlacesPage from "./placespage";
import Accountnav from "../AccountNav";

export default function AccountPage(){
    const [redirect,setRedirect] =useState(null);
    const {user, ready,setUser} = useContext(UserContext);

    let {subpage}= useParams();
    if (subpage === undefined){
        subpage = 'profile';
    }
    async function logout(){
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if (!ready){
        return 'loading...';
    }
    if (ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    if(redirect){
        return <Navigate to={redirect} />
    }
     
    return(
        <div>
            <Accountnav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2" >logout</button>
                </div>
            )}
            {subpage === 'places' &&(
                <PlacesPage />
            )}
        </div>
    )
}