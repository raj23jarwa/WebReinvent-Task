import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to Sign In if no token is found
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-4 text-gray-600">Welcome to your dashboard!</p>
        {/* Add additional dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;
