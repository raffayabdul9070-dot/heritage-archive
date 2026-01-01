import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
// Import Firebase functions and your config
import { auth } from './firebaseConfig'; 
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import './login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState(''); // Firebase uses email
  const [password, setPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // --- 1. Real Login Logic ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This checks the user against your Firebase Database
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); 
    } catch (error) {
      alert("Access Denied: Identity could not be verified.");
    }
  };

  // --- 2. Real Password Reset Logic ---
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sends a real reset link to the researcher's email
      await sendPasswordResetEmail(auth, email);
      alert("Security Reset Link sent to your official email!");
      setIsResetting(false);
    } catch (error) {
      alert("Error: Researcher ID/Email not found in our records.");
    }
  };

  return (
    <div className="login-screen">
      <div className="passport-card">
        <div className="passport-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/State_emblem_of_Pakistan.svg" alt="Emblem" />
          <h2>ISLAMIC REPUBLIC OF PAKISTAN</h2>
          <p>{isResetting ? "Security Key Recovery" : "National Linguistic Access Portal"}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isResetting ? (
            <motion.form 
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="login-form-fields" 
              onSubmit={handleSubmit}
            >
              <div className="input-row">
                <label>Official Email (Researcher ID)</label>
                <input 
                  type="email" 
                  value={email} 
                  placeholder="admin@portal.pk"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="input-row">
                <label>Security Key</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="verify-btn">VERIFY IDENTITY</button>
              
              <button 
                type="button" 
                className="forgot-link" 
                onClick={() => setIsResetting(true)}
              >
                Forgot Security Key?
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="reset"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="login-form-fields" 
              onSubmit={handleResetPassword}
            >
              <p className="reset-instruction">Enter your official email to receive a secure password reset link.</p>
              <div className="input-row">
                <label>Verify Researcher ID (Email)</label>
                <input 
                  type="email" 
                  value={email} 
                  placeholder="admin@portal.pk"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="verify-btn">SEND RESET LINK</button>
              
              <button 
                type="button" 
                className="forgot-link" 
                onClick={() => setIsResetting(false)}
              >
                Back to Login
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;