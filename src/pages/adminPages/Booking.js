import React,{useEffect, useState} from 'react'
import { useData } from '../../components/layouts/DataContext'
const token = localStorage.getItem('token')
const Booking = () => {
  //get data from api and display data in table 
  // create useState() hook
  const [booking, setBooking] = useState([])
  const { UpdateSharedData } = useData();
  
    //get Review API
    const ReviewAll = async()=>{
        try{
            const res = await fetch('http://127.0.0.1:8080/api/vi/bookings',{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify()
            })
            if(res.ok){
                const data = await res.json()
                //console.log(data)
                setBooking(data.data.data)
                UpdateSharedData(data.results)

            }else{
                console.log("somethink is wrong")
            }

        }catch(eror){
            console.log("the error is here",eror)
        }
    }
    useEffect(()=>{
        ReviewAll()
    },[UpdateSharedData])
    // DeleteBOOKING API
    const DeleteBooking = async(userId)=>{
      try{
        const res = await fetch(`http://127.0.0.1:8080/api/vi/bookings/${userId}`,{
          method:"DELETE",
          headers:{
            'Authorization': `Bearer ${token}`
          },
          body:JSON.stringify()
        })
        if(res.ok){
          console.log("Booking is delete ")
          ReviewAll()
        }
      }catch(error){
        console.log("error during delete")

      }
    }
  return (
    <div>
        <div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Price</th>
              <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          {/* use Map funcation to display data  */}
          {booking.map((data, index)=>{
            return(
          <tbody key={index}>
            <tr class="odd:bg-white even:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.name}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">+92{data.phone}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.price}</td>
              <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <button  onClick={()=> DeleteBooking(data._id)}  type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
              </td>
            </tr>
          </tbody>
        )
      })}
        </table>
      </div>
    </div>
  </div>
</div>
</div>
  )
}
export default Booking
