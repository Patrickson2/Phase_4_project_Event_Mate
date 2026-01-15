import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Password reset link sent to your email');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Forgot Password</h2>
        {message && <div className="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
        <p><Link to="/login">Back to Login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPassword;
