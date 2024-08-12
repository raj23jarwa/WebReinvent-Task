import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fill email and password if "Remember Me" was checked
    const remember = localStorage.getItem('rememberMe') === 'true';
    if (remember) {
      setEmail(localStorage.getItem('userEmail') || '');
      setPassword(localStorage.getItem('userPassword') || '');
      setRememberMe(true);
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login(email, password);
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        sessionStorage.setItem('userEmail', email); // Store the email in session storage

        toast.success("Signin successful! 🚀", {
          position: "top-right",
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/Dashboard");
        }, 2000);

        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userPassword', password);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userPassword');
        }

      } else {
        toast.error("Login failed ❌", {
          position: "top-right",
          autoClose: 3000,
        });
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      toast.warning("Invalid email or password 😥", {
        position: "top-right",
        autoClose: 3000,
      });
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <ErrorMessage message={error} />}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</Link>
            </div>
          </div>
          <div>
            <Button type="submit">Sign In</Button>
          </div>
        </form>
        <ToastContainer/>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
