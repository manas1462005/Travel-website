import React, { useEffect, useState } from 'react'
import Imageslider from '../components/layouts/Imageslider'
import { FaLocationDot } from "react-icons/fa6";
import {FaStar} from 'react-icons/fa'
import Layouts from '../components/layouts/Layouts'
//Today i work on fatch data from api using products id 
import {useNavigate, useParams} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
const token = localStorage.getItem('token')

const reviews ={
  review:"",
}
const booking ={
  name:"",
  phone:0
}
const Booking = () => {
  const {id} = useParams()
  const [toureData, settoureData] = useState([])
  const [images, setImages] = useState([])
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [message, setMessage] = useState(reviews)
  const [tourReview, setTourReview] = useState([])
  const [bookingTour , setBookingTour] = useState(booking)
  const [price, setPrice] = useState(0)
  const  navigate = useNavigate()

  const getReviewValue = (e)=>{
    setMessage({...message, [e.target.name]:e.target.value})
  }
  const getBookingData = (e)=>{
    setBookingTour({...bookingTour, [e.target.name]:e.target.value})
  }
//Use Effect Funcation  
  useEffect(()=>{
    getBooking()
    setPrice(toureData.price*5 - toureData.priceDiscount)
  },[toureData.price*5 - toureData.priceDiscount])

  //Booking Fetch API 
  const getBooking = async()=>{
    const res = await fetch(`http://127.0.0.1:8080/api/vi/tours/${id}`,{
      method:"GET",
      headers:{
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify()
    })
    if(res.ok){
      const data = await res.json()
      settoureData(data.data.toure)
      //console.log(data.data.toure.reviews.length) 
      setImages(data.data.toure.images)
      setTourReview(data.data.toure.reviews)
    }else{
      console.log("Error get data from api")
    }
  }
  //Create Review On the Tour
  const postReview = async(e)=>{
    e.preventDefault()
     // Get current user ID (assuming it's stored in localStorage after login
     if (!token) {
      console.error('Token not found.');
      return;
    }
     const decode = jwtDecode(token)
     const user = decode.id
     if(!user){
      console.log("user is Invaled")
      return;
     }
    if (!rating || rating < 1 || rating > 5) {
      console.error('Invalid rating.');
      return;
    }
    try{
      const {review} = message;
      const res = await fetch('http://127.0.0.1:8080/api/vi/review',{
      method:"POST",
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
       review:review,
       rating:rating,
       user:user,
       tour:id
      })
    })
    if(res.ok){
      console.log('Review posted successfully!')
      setMessage({review:""});
      setRating(null)
    }else{
      console.log('Failed to submit review.')
    }

    }catch(eror){
      console.error('Error posting review:', eror);
    }
  }
  const BookingTour = async(e)=>{
    e.preventDefault()
    if(!token){
      console.error('Token not found.');
      return;
    }
    const decode = jwtDecode(token)
    const user = decode.id
    if(!user){
      console.log("user is Invaled")
      return;
    }
    try{
      const {name, phone} = bookingTour;
      const res = await fetch('http://127.0.0.1:8080/api/vi/bookings',{
        method:"POST",
        headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name:name,
          tour:id,
          user:user,
          price:price,
          phone:phone
        })
      })
      if(res.ok){
        console.log('Review posted successfully!')
      }else{
        console.log('Failed to submit review.')
      }
    }catch(eror){
      console.log("something is wrong in api", eror)
    }

  }

  
  //console.log(tourReview)
  // console.log(toureData)
  // console.log(price)
  const BookingDone = (e)=>{
    navigate(e)
  }
  return (
  <Layouts>
<div className=''>
  <section className="text-gray-600 body-font">
  <div className="px-5 py-24  flex flex-row">
    <div className="basis-2/4 lg:w-3/5 md:w-1/2 ml-32 md:pr-16 lg:pr-0 pr-0">
      <Imageslider images={images}/>
      <div className='w-full mt-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='p-10'>
      <h1 className="title-font font-medium text-3xl text-gray-900">{toureData.name}</h1>
      <div class="mt-1">
          <span>${toureData.price}</span>
          <span class="text-gray-600 text-sm">/ {toureData.duration} Days</span>
        </div>
        <div class="mt-2 flex items-end">
            <span class="ml-2 text-gray-600 text-sm">{toureData.ratingsQuantity} Ratings</span>
        </div>
        <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
            {toureData.maxGroupSize}  &bull; Person
          </div>  
        <p className="leading-relaxed mt-4">{toureData.description}</p>

      </div>
    
      </div>
      <div className='w-full mt-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <form action="" method='POST' onSubmit={postReview}>
        <div className='p-8'>
        <h1>Review</h1>
        </div>
        <div className='p-8 flex flex-row'>
        { [...Array(5)].map((star,i)=>{
          const ratingValue = i + 1
          return(
            <label>
              <input name='rating' type='radio' value={ratingValue} onClick={()=> setRating(ratingValue)} className='sr-only'/>
              <FaStar size={50} color={ratingValue <= (hover || rating) ? "#ffc107":"e4e5e9"}
              onMouseEnter={()=> setHover(ratingValue)}
              onMouseLeave={()=> setHover(null)}
              />
            </label>

          );
        }) }
        </div>
      <div className='p-10'>
          <div class="relative">
              <input type="text" value={message.review} onChange={(e)=>getReviewValue(e)} name='review' id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is your Thought" required />
              <button type="submit"  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
      </div>
      </form>
      <div className='p-10'>
      {tourReview.map((item,index)=>{
        return(
        <div class="p-3">
                    <div class="flex gap-3 items-center">
                        <img src={`http://localhost:8080/${item.user.phote}`}
                                class="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
                        <div class="font-medium text-purple-800">
                        {item.user.name}
                        <div>
                        
                          </div>
                            <span class="text-sm text-gray-400 font-normal">{item.rating} Rating </span>
                        </div>
                        
                    </div> 
                        
                        <div class="text-gray-600 ml-10">{new Date(item.createAt).toDateString()}
                        <p>Time :{new Date(item.createAt).toLocaleTimeString()}</p>
                        </div> 
                        

                          <div class="mt-2 ml-10 text-purple-800">
                            <p  className='text-lg'>
                            {item.review} 
                            </p>
                            </div>
                      
                </div>
        )
      })}
      </div>
      </div>
      
  </div>

  {/* Booking Section  */}
    <div className="basis-2/4 lg:w-2/6 md:w-1/2 bg-white rounded-lg p-8 h-auto md:ml-auto w-full mr-20">
      <div className='bg-gray-100 lg:w-3/4  rounded-lg p-8 h-auto md:ml-auto w-full'>
<form action="" onSubmit={BookingTour} >
    <div className='flex flex-row justify-between p-5'>
      <div className='basis-6/12'>
      <h1 className='text-lg font-bold text-black-500 mt-3'>$ {toureData.price} / PerPerson</h1>
      </div>
      <div className='basis-6/12 flex flex-col items-end'> 
      <div className='flex items-end'>
      <svg class="w-5 h-5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
      </svg>
       <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white"> {toureData.ratingsAverage} ({tourReview.length})</p>
      </div>
      
      </div>
      </div>  
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Book Now </h2>
      <div className="relative mb-4">
        <label for="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
        <input type="text" value={bookingTour.name} onChange={(e)=> getBookingData(e)} id="full-name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label for="phone" className="leading-7 text-sm text-gray-600">Phone No</label>
        <input type="number" value={bookingTour.phone} onChange={(e)=> getBookingData(e)}  id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      
      <div className='flex flex-row justify-between p-5'>
      <div className='basis-6/12'>
      <h1 className='text-xl font-bold text-black-500 mt-3'>$ {toureData.price} x {toureData.duration} Person</h1>
      <h1 className='text-xl font-bold text-black-500 mt-3'> Discount </h1>
      <h1 className='text-xl font-bold text-black-500 mt-3'> Total </h1>
      
      </div>
      <div className='basis-6/12 flex flex-col items-end'> 
      <h1 className='text-xl  text-gray-500 mt-3 '>$ {  toureData.price * 5 }</h1>
      <h1 className='text-xl text-gray-500 mt-3'> $ {toureData.priceDiscount}</h1>
      <h1 className='text-xl text-gray-500 mt-3'> $  {toureData.price*5 - toureData.priceDiscount} </h1>
      
      </div>
      </div>
      <button onClick={(e)=> BookingDone('/bookingdone')} type='submit' className="mt-7 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full w-full">
        Book Now 
      </button>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  </Layouts>
  )
}

export default Booking
