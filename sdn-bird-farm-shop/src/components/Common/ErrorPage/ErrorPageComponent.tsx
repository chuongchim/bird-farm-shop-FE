import React from 'react';

interface ErrorPageProps {
  errorCode: string;
  errorMessage: string;
}

const ErrorPageComponent: React.FC<ErrorPageProps> = ({ errorCode, errorMessage }) => {
  const redirectToLoginPage = () => {
    // You can use React Router or another routing library to navigate to the login page.
    // Replace '/login' with the actual route to your login page.
    window.location.href = '/auth/login';
  };

  return (
    <div className="error-container">
      <h1>Error</h1>
      <div className="error-code">{errorCode}</div>
      <div className="error-message">{errorMessage}</div>
      <button className="login-button" onClick={redirectToLoginPage}>
        Go to Login Page
      </button>
    </div>
  );
};

export default ErrorPageComponent;
