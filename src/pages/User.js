import React, { useEffect, useState } from 'react'
import Layouts from '../components/layouts/Layouts'
import { jwtDecode } from 'jwt-decode'
import {useData} from '../components/layouts/DataContext'
const token = localStorage.getItem('token');
const User = () => {
    const [userData, setUserData] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [curentPage , setCurrentPage] = useState(1)
    const [totalResults , setTotalResults] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const {UpdatetotalUserData} = useData();
    const resultsPerPage = 10;
// get all user data     
    const User_data = async()=>{
        try{
            const res = await fetch('http://127.0.0.1:8080/api/vi/users',{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify()   
            })
            if(!res.ok){
                console.log("daataaaaaa")
            }
            const data = await res.json()
            console.log(data)
            setUserData(data.data.user)
            setTotalResults(data.results)
            UpdatetotalUserData(data.results)
        }catch(error){
            console.log("somethink is wrong")
        }
    }
    const totalpage = Math.ceil(totalResults / resultsPerPage)
    const handelNextPage = ()=>{
        if(curentPage <  totalpage){
            setCurrentPage(curentPage + 1)
        }
    }
    const handelPrePage = ()=>{
        if(curentPage > 1 ){
            setCurrentPage(curentPage - 1)
        }
    }
    useEffect(()=>{
        User_data()
        if(token){
            const decode = jwtDecode(token)
            setCurrentUser({id:decode.id,name:decode.name,email:decode.email,phote:decode.phote,role:decode.role})
            setIsAdmin(decode.role === 'admin')
        }else{
            setCurrentUser(null)
        }
        setLoading(false);
    },[curentPage,UpdatetotalUserData])


    // DELETE USER FROM API
    const delete_user = async(userID)=>{
        try{
           const res = await fetch('http://127.0.0.1:8080/api/vi/users/'+userID,{
                method:"DELETE",
                headers:{
                    'Authorization': `Bearer ${token}`
                },
            })
            if(!res.ok){
                console.log("Show ERROR")
            }
            User_data()
        }
        catch(eror){
            console.log("error", eror)
        }
    }
    

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator while processing token
    }
    //console.log(currentUser.phote)
    //console.log(totalResults)
    // slice user data 
    const startIndex = (curentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const displayedUserData = userData.slice(startIndex, endIndex);
    const PageNumbers = []
    for( let i = 1; i<= totalpage; i++){
        PageNumbers.push(i)
    }
    if(!isAdmin){
        return <p>You are not authorized to access this page.</p>;
    }
  return (
    <>
<div className="flex flex-row m-10">
<div className="basis-1/5">
<div className="flex items-center justify-center mt-32">
<div className="max-w-xs">
 {currentUser ?(
    <div className="bg-red-50 shadow-xl rounded-lg h-96">
        <div className="photo-wrapper p-2">   
        <img className="w-32 h-32 rounded-full mx-auto" src={`http://localhost:8080/${currentUser.phote}`} alt="John Doe" />
        </div>
               <div className="p-2">
               <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{currentUser.name}</h3>
               <div className="text-center text-gray-400 text-xs font-semibold">
                   <p>{currentUser.role}</p>
               </div>
               <table className="text-xs my-3">
                   <tbody><tr>
                       <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                       <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                   </tr>
                   <tr>
                       <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                       <td className="px-2 py-2">+977 9955221114</td>
                   </tr>
                   <tr>
                       <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                       <td className="px-2 py-2">{currentUser.email}</td>
                   </tr>
               </tbody></table>
   
               <div className="text-center my-3">
                   <a href="/" className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" >View Profile</a>
               </div>
           </div>

       
     
    </div>
):(
    <p>Please log in to view user information</p>
)}
</div>

</div>

</div>


<div className="basis-3/4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-red-50">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    id
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {displayedUserData.map((data)=>{
            return(
            <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                    <div className="text-base font-semibold">{data._id}</div>
                    </div>
                </td>
                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">{data.name}</div>
                    </div>
                </th>
                <td className="px-6 py-4">
                <div className="font-normal text-gray-500">{data.email}</div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> {data.role}
                    </div>
                </td>
                <td className="px-6 py-4">
                   <button onClick={()=> delete_user(data._id)} className='btn btn-danger'>Delete</button>
                </td>
            </tr>
)
})}           
        </tbody>
    </table>
</div>

<div className='flex flex-col items-center mt-8'>
<span class="text-sm text-gray-700 dark:text-gray-400">
      Showing <span class="font-semibold text-gray-900 dark:text-white">{curentPage}</span> to <span class="font-semibold text-gray-900 dark:text-white">{totalpage}</span> of <span class="font-semibold text-gray-900 dark:text-white">{totalResults}</span> Entries
</span>
<nav aria-label="Page navigation example" className=' flex items-center justify-center mt-4'>
  <ul className="inline-flex -space-x-px text-sm">
    <li>
    <button onClick={handelPrePage} disabled={curentPage === 1} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Previous
    </button>
    </li>
    {PageNumbers.map((page)=>{
        return(  
    <li key={page}>
        <button onClick={()=> setCurrentPage(page)} className={`flex items-center justify-center px-3 h-8 leading-tight ${curentPage === page ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
            {page}
        </button>
    </li>
    )
})}
    <li>
    <button onClick={handelNextPage} disabled={curentPage === totalpage} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
      </button>
    </li>
  </ul>
</nav>

</div>

            </div>
            
</div>
    </>
  )
}
export default User
