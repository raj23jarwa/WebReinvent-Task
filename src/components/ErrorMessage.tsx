// components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className="text-red-600 text-sm text-center mb-4">{message}</div>;
};

export default ErrorMessage;
