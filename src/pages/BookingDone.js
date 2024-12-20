import React from 'react'
import Layouts from '../components/layouts/Layouts'
import {Link} from 'react-router-dom'

const BookingDone = () => {
  return (
    <Layouts>
<div class="w-full flex justify-center mt-16 mb-52 ">
    <div class="bg-gray-800 relative rounded-2xl -mx-4 p-8 space-y-8 max-w-4xl text-center">
        <div class="space-y-4">
            <h2 class="text-white font-heading font-bold text-2xl">
                THANK YOU
            </h2>

            <p class="text-xl text-white">
                YOUR TOUR IS BOOKED 
            </p>
        </div>

        <Link class="inline-flex items-center justify-center font-medium tracking-tight rounded-lg border transition hover:scale-105 hover:-rotate-1 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset h-11 px-4 text-lg text-white shadow focus:ring-white border-transparent bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-600 focus:ring-offset-yellow-600"
            to="/">
            <span>BACK TO HOME PAGE</span>
        </Link>
    </div>
</div>
    </Layouts>
  )
}

export default BookingDone
