import { useState } from 'react';
import { Link } from 'react-router-dom';
import caduceusLogo from '../assets/caduceus-logo.svg';
import { submitStudentLogin, type StudentLoginPayload } from '../services/studentLoginService';

interface UserDetails {
  name: string;
  email: string;
  phoneNumber: string;
  class: string;
  state: string;
}

const AlreadyEnrolledLogin = () => {
  const [loginValues, setLoginValues] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    class: '11th',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      setLoginValues(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setLoginValues(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!loginValues.name.trim()) newErrors.name = 'Name is required';
    if (!loginValues.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValues.email)) newErrors.email = 'Invalid email format';
    if (!loginValues.password.trim()) newErrors.password = 'Password is required';
    if (!loginValues.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    else if (!validatePhoneNumber(loginValues.phoneNumber)) newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const loginPayload: StudentLoginPayload = {
        name: loginValues.name,
        email: loginValues.email,
        password: loginValues.password,
        phoneNumber: loginValues.phoneNumber,
        class: loginValues.class as '11th' | '12th' | 'Dropper',
      };

      const response = await submitStudentLogin(loginPayload);

      if (response.success && response.user) {
        setUserDetails(response.user);
        setIsLoggedIn(true);
      } else {
        alert(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Login error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo-section">
            <img src={caduceusLogo} alt="Shreyas Academy Logo" className="logo-image" />
            <span className="logo-text">Shreyas Academy</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
          </div>
        </div>
      </nav>

      <main style={{ marginTop: '80px' }}>
        <section className="signup" id="login-student">
          <div className="section-container">
            <div className="signup-content">
              <div className="signup-form">
                {isLoggedIn && userDetails ? (
                  <div className="signup-success">
                    <div className="success-icon">✓</div>
                    <h2>Welcome Back!</h2>
                    <p>You have successfully logged in.</p>
                    <div style={{ textAlign: 'left', marginTop: '2rem', padding: '1.5rem', background: 'var(--light-gray)', borderRadius: '12px' }}>
                      {Object.entries(userDetails).map(([key, value]) => (
                        <div key={key} className="form-group" style={{ marginBottom: '1rem' }}>
                          <label style={{ display: 'block', color: 'var(--black)', fontWeight: 600, marginBottom: '0.5rem' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                          <div style={{ padding: '12px', background: 'var(--white)', border: '2px solid var(--light-gray)', borderRadius: '8px', fontSize: '15px', color: 'var(--black)' }}>
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="success-buttons" style={{ marginTop: '2rem' }}>
                      <Link to="/" className="btn btn-primary">Go to Home</Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="login-name">Name</label>
                      <input id="login-name" name="name" type="text" required value={loginValues.name} onChange={handleInputChange} placeholder="Enter your full name" />
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="login-email">Email</label>
                      <input id="login-email" name="email" type="email" required value={loginValues.email} onChange={handleInputChange} placeholder="Enter your email" />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="login-password">Password</label>
                      <input id="login-password" name="password" type="password" required value={loginValues.password} onChange={handleInputChange} placeholder="Enter your password" />
                      {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="login-phone">Phone Number</label>
                      <input id="login-phone" name="phoneNumber" type="tel" required value={loginValues.phoneNumber} onChange={handleInputChange} placeholder="Enter 10-digit phone number" maxLength={10} />
                      {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="login-class">Class/Grade</label>
                      <select id="login-class" name="class" required value={loginValues.class} onChange={handleInputChange}>
                        <option value="11th">11th</option>
                        <option value="12th">12th</option>
                        <option value="Dropper">Dropper</option>
                      </select>
                    </div>

                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Login'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AlreadyEnrolledLogin;