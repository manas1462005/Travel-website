import React from 'react';
import yourImage from '../assets/telephone.jpg';

const ContactPage = () => (
  <div className="flex items-center justify-start min-h-screen p-6">
    <div className="flex items-center justify-center w-full max-w-4xl">
      <img className='w-96 h-auto mr-16' src={yourImage} alt="contacts" />
      <div className='flex flex-col ml-16'>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Info</h1>
        <p className="text-xl text-gray-600 mb-4">
          Email: <span className="text-blue-500 font-semibold">support@example.com</span>
        </p>
        <p className="text-xl text-gray-600">
          Phone: <span className="text-blue-500 font-semibold">+123 456 7890</span>
        </p>
      </div>
    </div>
  </div>
);

export default ContactPage;
