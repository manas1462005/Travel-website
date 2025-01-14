import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function PaymentPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = location.state || { amount: 0 };
  const [selectedOption, setSelectedOption] = useState('');

  const handlePayment = async () => {
    if (!selectedOption) {
      alert('Please select a payment option.');
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      alert('Payment successful!');
      navigate('/thank-you');
    }, 1000);
  };

  return (
    <div className="my-8">
      <h1 className="text-3xl text-center">Payment Portal</h1>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl">
        <p className="text-xl">Amount: ${amount}</p>
        <div className="my-4">
          <label className="block mb-2">Select Payment Option:</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">--Select--</option>
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="net-banking">Net Banking</option>
          </select>
        </div>
        <button
          onClick={handlePayment}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
