import React from 'react';
import yourImage from '../assets/description.jpg';

const AboutPage = () => (
  <div className='flex items-center p-4'>
    <img className='w-96 h-auto mb-4' src={yourImage} alt="description img" />
    <div className='flex flex-col items-start text-left pl-4'>
    <h1 className='text-3xl font-bold mb-2'>About Us</h1>
    <p className='text-lg text-gray-600'>We are a platform connecting people and places seamlessly.</p>
    </div>
  </div>
);

export default AboutPage;
