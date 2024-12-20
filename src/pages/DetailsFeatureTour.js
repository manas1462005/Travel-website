import React, { useEffect, useState } from 'react'
import Layouts from '../components/layouts/Layouts'
import { useParams } from 'react-router-dom'
const DetailsFeatureTour = () => {
  const {id} = useParams()
  const [tour, setTour] = useState([])
  const [image , setImage] =  useState([])
  useEffect(()=>{
    FTOneDetails()
  },[])
  const FTOneDetails = async()=>{
    try{
      const res = await fetch(`http://127.0.0.1:8080/api/vi/featuretoure/${id}`,{
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify()
      })
      if(res.ok){
        const data = await res.json()
        //console.log(data)
        setTour(data.data.data)
        setImage(data.data.data.images)
      }else{
        console.log("Error we faced in this ")
      }
    }catch(error){
      console.log("Errp",error)
    }

  }
  console.log(tour)
  return (
    <Layouts>
<div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
  
  <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
    {image.map((s,index)=>{ 
    return <img class="w-full h-96 mt-5" alt="image of a girl posing" src={`http://127.0.0.1:8080/${s}`} />
    })}
  </div>
  <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6 ml-10">
  <h2 class="text-sm title-font text-gray-500 tracking-widest">World Traveling</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{tour.name}</h1>
        <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p class="leading-relaxed">{tour.description}</p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">{tour.duration}</span><span class="mr-3">/Days</span>
          </div>
          <div class="flex ml-6 items-center">
            <span class="title-font font-medium text-2xl text-gray-900">{tour.maxGroupSize}</span><span class="mr-3">/Size</span>
          </div>
          <div class="flex ml-6 items-center">

            <span class="title-font font-medium text-2xl text-gray-900">{tour.roome}</span><span class="mr-3">/room</span>
          </div>
          <div class="flex ml-6 items-center">
            <span class="title-font font-medium text-2xl text-gray-900">{tour.beds}</span><span class="mr-3">/beds</span>
           
          </div>
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">{tour.price}/RS</span>
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Booking</button>
        </div>
       
  </div>
</div> 
    </Layouts>
  )
}
export default DetailsFeatureTour
