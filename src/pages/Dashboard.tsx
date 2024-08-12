import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to Sign In if no token is found
      navigate('/signin');
    } else {
      // Set user email or fetch user info if needed
      const savedEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') 
      setUserEmail(savedEmail || 'User');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-4 text-gray-600">Welcome back, {userEmail}!</p>
        
        {/* Recent Activity Section */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          <ul className="mt-4 space-y-2">
            <li className="p-4 bg-gray-50 rounded-md shadow-sm">Activity 1: Logged in</li>
            <li className="p-4 bg-gray-50 rounded-md shadow-sm">Activity 2: Updated profile</li>
            <li className="p-4 bg-gray-50 rounded-md shadow-sm">Activity 3: Viewed reports</li>
          </ul>
        </section>
        
        {/* Statistics or Data Section */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Statistics</h2>
          <div className="mt-4 flex space-x-4">
            <div className="w-1/3 p-4 bg-blue-100 rounded-lg shadow-sm text-center">
              <h3 className="text-lg font-semibold text-blue-600">Total Users</h3>
              <p className="text-2xl font-bold text-blue-800">150</p>
            </div>
            <div className="w-1/3 p-4 bg-green-100 rounded-lg shadow-sm text-center">
              <h3 className="text-lg font-semibold text-green-600">Active Sessions</h3>
              <p className="text-2xl font-bold text-green-800">45</p>
            </div>
            <div className="w-1/3 p-4 bg-yellow-100 rounded-lg shadow-sm text-center">
              <h3 className="text-lg font-semibold text-yellow-600">Pending Tasks</h3>
              <p className="text-2xl font-bold text-yellow-800">12</p>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/profile" className="text-blue-600 hover:underline">View Profile</Link>
            </li>
            <li>
              <Link to="/settings" className="text-blue-600 hover:underline">Account Settings</Link>
            </li>
            <li>
              <Link to="/reports" className="text-blue-600 hover:underline">View Reports</Link>
            </li>
          </ul>
        </section>

        {/* Logout Button */}
        <section className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
