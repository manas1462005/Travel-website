import React, { useState } from 'react'
import Layouts from '../components/layouts/Layouts'
const token = localStorage.getItem('token')
const ToureAllValue = {
    name:"",
    duration:0,
    maxGroupSize:0,
    difficulty:"",
    ratingsAverage:0,
    ratingsQuantity:0,
    price:0,
    priceDiscount:0,
    summary:"",
    description:"",
    imageCover:null,
    images:null,
    startDates:"",
}

const CreateToure = () => {
    const [TourData, setTourData] = useState(ToureAllValue)

    const ToureInputValue = (e)=>{
    setTourData({...TourData ,[e.target.name]:e.target.value})
    }

const uploadImage = (e)=>{
   const fieldName = e.target.name; 
    if (fieldName === 'imageCover') {
        setTourData({
            ...TourData,
            imageCover: e.target.files[0],
        });
    } else if (fieldName === 'images') {
        setTourData({
            ...TourData,
            images: e.target.files,
        });
    }
}
    const ToureSubmit = async(e)=>{
        e.preventDefault()
        try{
            const formData = new FormData();
            formData.append('name', TourData.name);
            formData.append('duration', TourData.duration);
            formData.append('maxGroupSize', TourData.maxGroupSize);
            formData.append('difficulty', TourData.difficulty);
            formData.append('ratingsAverage', TourData.ratingsAverage);
            formData.append('ratingsQuantity', TourData.ratingsQuantity);
            formData.append('price', TourData.price);
            formData.append('priceDiscount', TourData.priceDiscount);
            formData.append('summary', TourData.summary);
            formData.append('description', TourData.description);
            formData.append('startDates', TourData.startDates);
            formData.append('imageCover', TourData.imageCover);
            if (TourData.images) {
                Array.from(TourData.images).forEach((image) => {
                    formData.append('images', image);
                });
            }
            const res = await fetch('http://127.0.0.1:8080/api/vi/tours',{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                body:formData
            })
            const data = await res.json()
            //console.log(data)
            if(res.ok){
                console.log("data send seccuessfully!")
            }else{
                console.log("data not send check api")
            }
        }catch(error){
            console.log("Check Server Api", error)
        }
    }
    return (
    <>
<div>
<form method='post' onSubmit={ToureSubmit} enctype="multipart/form-data" action="/uploads">
            <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">Full Name</label>
                <input onChange={(e)=> ToureInputValue(e)} type="text" name="name" id="name" placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="duration" className="mb-3 block text-base font-medium text-[#07074D]">Duration</label>
                <input onChange={(e)=> ToureInputValue(e)}  type="number" name="duration" id="duration" placeholder="Duration Of the Toure"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="maxGroupSize" className="mb-3 block text-base font-medium text-[#07074D]">maxGroupSize</label>
                <input onChange={(e)=> ToureInputValue(e)}  type="number" name="maxGroupSize" id="maxGroupSize" placeholder="maxGroupSize Of the Toure"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="difficulty" className="mb-3 block text-base font-medium text-[#07074D]">Difficulty</label>
            <select onChange={(e)=> ToureInputValue(e)}  id="difficulty"  name='difficulty' className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                  <option>easy</option>
                  <option>medium</option>
                  <option>difficult</option>
                    </select> 
            
            </div>
            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="ratingsAverage" className="mb-3 block text-base font-medium text-[#07074D]">
                            ratingsAverage
                        </label>
                        <input onChange={(e)=> ToureInputValue(e)}  type="text"  name="ratingsAverage" id="ratingsAverage"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="ratingsQuantity" className="mb-3 block text-base font-medium text-[#07074D]">
                        ratingsQuantity
                        </label>
                        <input onChange={(e)=> ToureInputValue(e)}  type="number" name="ratingsQuantity" id="ratingsQuantity"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                        price
                        </label>
                        <input onChange={(e)=> ToureInputValue(e)}  type="number" name="price" id="price"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="priceDiscount" className="mb-3 block text-base font-medium text-[#07074D]">
                        priceDiscount
                        </label>
                        <input onChange={(e)=> ToureInputValue(e)}  type="number" name="priceDiscount" id="priceDiscount"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="summary" className="mb-3 block text-base font-medium text-[#07074D]">
                        summary
                        </label>
                        <textarea onChange={(e)=> ToureInputValue(e)}  type="text" name="summary" id="summary"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
                        description
                        </label>
                        <textarea onChange={(e)=> ToureInputValue(e)}  type="text" name="description" id="description"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="imageCover" className="mb-3 block text-base font-medium text-[#07074D]">
                        imageCover
                        </label>
                        <input onChange={(e)=> uploadImage(e)}  type="file" name="imageCover" id="imageCover"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="images" className="mb-3 block text-base font-medium text-[#07074D]">
                        images
                        </label>
                        <input onChange={(e)=> uploadImage(e)}  type="file" name="images" id="images" multiple
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="startDates" className="mb-3 block text-base font-medium text-[#07074D]">
                startDates
                </label>
                <input onChange={(e)=> ToureInputValue(e)}  type="date" name="startDates" id="startDates"  placeholder="Start Date of Tour"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>


            {/* <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                startLocation
                </label>
                <div className="mb-5">
                            <input onChange={(e)=> ToureInputValue(e)}  type="text" name="coordinatesL" id="coordinates" placeholder="Enter coordinates"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <textarea onChange={(e)=> ToureInputValue(e)}  type="text" name="descriptionL" id="description" placeholder="Enter description"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <textarea onChange={(e)=> ToureInputValue(e)}  type="text" name="addressL" id="address" placeholder="Enter address"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div> */}



            {/* <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Location
                </label>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input onChange={(e)=> ToureInputValue(e)}  type="text" name="coordinatesb" id="coordinates" placeholder="Enter coordinates"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input onChange={(e)=> ToureInputValue(e)}  type="number" name="dayb" id="day" placeholder="day"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <textarea onChange={(e)=> ToureInputValue(e)}  type="text" name="descriptionb" id="description" placeholder="Enter description"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>


                    <div className="w-full px-3 sm:w-1/2">
                       
                        <div className="mb-5">
                            <textarea onChange={(e)=> ToureInputValue(e)}  type="text" name="addressb" id="address" placeholder="Enter address"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div> */}


            <div>
                <button type='submit'
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Create Toure
                </button>
            </div>
        </form>
</div>

    </>
  )
}

export default CreateToure
