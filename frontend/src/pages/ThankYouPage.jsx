import { useNavigate } from "react-router-dom";

export default function ThankYouPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="my-8 text-center">
      <h1 className="text-3xl font-bold">Thank You!</h1>
      <p className="text-lg my-4">We appreciate your booking. Have a great stay!</p>
      <button
        onClick={handleBackToHome}
        className="bg-primary px-6 py-3 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
}
