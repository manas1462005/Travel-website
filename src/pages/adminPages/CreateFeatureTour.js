import React,{useState} from 'react'
const ToureAllValue = {
    name:"",
    duration:0,
    maxGroupSize:0,
    roome:0,
    beds:0,
    price:0,
    description:"",
    imageCover:null,
    images:null,
}
const token = localStorage.getItem('token')
const CreateFeatureTour = () => {
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
            formData.append('roome', TourData.roome);
            formData.append('beds', TourData.beds);
            formData.append('price', TourData.price);
            formData.append('description', TourData.description);
            formData.append('imageCover', TourData.imageCover);
            if (TourData.images) {
                Array.from(TourData.images).forEach((image) => {
                    formData.append('images', image);
                });
            }
            const res = await fetch('http://127.0.0.1:8080/api/vi/featuretoure',{
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
    {/*  onSubmit={ToureSubmit} */}
<form method='post'  onSubmit={ToureSubmit} enctype="multipart/form-data" action="/uploads">
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
                        <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                        price
                        </label>
                        <input onChange={(e)=> ToureInputValue(e)}  type="number" name="price" id="price"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="roome" className="mb-3 block text-base font-medium text-[#07074D]">
                            Roome
                        </label>
                        <input onChange={(e)=> ToureInputValue(e)}  type="text"  name="roome" id="roome"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="beds" className="mb-3 block text-base font-medium text-[#07074D]">
                       Beds
                        </label>
                        <input onChange={(e)=> ToureInputValue(e)}  type="number" name="beds" id="beds"
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
                        <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
                        description
                        </label>
                        <textarea onChange={(e)=> ToureInputValue(e)}  type="text" name="description" id="description"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div>
                <button type='submit'
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Create Feature Tour
                </button>
            </div>
        </form>
</div>
   </>
  )
}
export default CreateFeatureTour
