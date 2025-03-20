import React from "react";

const UpiPayment = () => {
  const upiId = "om.alatagi@okhdfcbank";
  const amount = 100; // Example amount, you can pass this dynamically
  const name = "Om Alatagi";

  const handlePayment = () => {
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&mc=&tid=&tr=&tn=Payment&am=${amount}&cu=INR`;
    window.location.href = upiLink;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
      >
        Pay via UPI
      </button>
    </div>
  );
};

export default UpiPayment;
