import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { SignupFormPayload } from '../services/signupService';
import { submitSignupForm } from '../services/signupService';
import academyLogo from '../assets/logo.jpg';

const initialSignupState: SignupFormPayload = {
  name: '',
  email: '',
  phoneNumber: '',
  fatherPhoneNumber: '',
  class: '11th',
  state: 'Karnataka',
};

const SignUp = () => {
  const [signupValues, setSignupValues] = useState<SignupFormPayload>(initialSignupState);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSignupInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    
    // For phone number fields, only allow digits
    if (name === 'phoneNumber' || name === 'fatherPhoneNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      setSignupValues((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setSignupValues((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove any non-digit characters and check if it's exactly 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };

  const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!signupValues.name.trim()) {
      newErrors.name = 'Full Name is required';
    }
    
    if (!signupValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupValues.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!signupValues.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!validatePhoneNumber(signupValues.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
    }
    
    if (!signupValues.fatherPhoneNumber.trim()) {
      newErrors.fatherPhoneNumber = 'Father Phone Number is required';
    } else if (!validatePhoneNumber(signupValues.fatherPhoneNumber)) {
      newErrors.fatherPhoneNumber = 'Father Phone Number must be exactly 10 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSignupSubmitting(true);
    try {
      await submitSignupForm(signupValues);
      setIsSignedUp(true);
      // Redirect to enrollment page after 3 seconds
      setTimeout(() => {
        window.location.href = '/#enroll';
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('There was an issue submitting your signup. Please try again.');
    } finally {
      setIsSignupSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo-section">
            <img src={academyLogo} alt="Shreyas Academy Logo" className="logo-image" />
            <span className="logo-text">Shreyas Academy</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ marginTop: '80px' }}>
        <section className="signup" id="signup">
          <div className="section-container">
            <div className="signup-content">
              <div className="signup-info">
                <h2>Join Shreyas Academy</h2>
                <p>
                  Start your journey to medical excellence. Fill out the form below to enroll in India&apos;s most elite NEET mentorship program.
                </p>
                <div className="signup-benefits">
                  <div className="benefit-item">
                    <div className="benefit-icon">🎓</div>
                    <div>
                      <strong>Personalized Mentorship</strong>
                      <p>Get guidance from NEET toppers</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">📚</div>
                    <div>
                      <strong>Daily Live Classes</strong>
                      <p>1.5 hours of expert guidance daily</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🏆</div>
                    <div>
                      <strong>Proven Strategies</strong>
                      <p>Learn from AIR 17, 80, 159 and more</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="signup-form">
                {isSignedUp ? (
                  <div className="signup-success">
                    <div className="success-icon">✓</div>
                    <h2>Registration Successful!</h2>
                    <p>Check your phone for next steps.</p>
                    <p className="success-subtext">
                      We&apos;ve sent you and your parent SMS messages with enrollment details.
                    </p>
                    <div className="success-buttons">
                      <Link to="/#enroll" className="btn btn-primary">
                        Enroll Now
                      </Link>
                      <Link to="/" className="btn btn-secondary">
                        Explore
                      </Link>
                    </div>
                    <p className="redirect-notice">Redirecting to enrollment page in 3 seconds...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSignupSubmit}>
                  <div className="form-group">
                    <label htmlFor="signup-name">Full Name *</label>
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      required
                      value={signupValues.name}
                      onChange={handleSignupInputChange}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signup-email">Email *</label>
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      required
                      value={signupValues.email}
                      onChange={handleSignupInputChange}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signup-phone">Phone Number *</label>
                    <input
                      id="signup-phone"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={signupValues.phoneNumber}
                      onChange={handleSignupInputChange}
                      placeholder="Enter 10-digit phone number"
                      maxLength={10}
                    />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signup-father-phone">Father Phone Number *</label>
                    <input
                      id="signup-father-phone"
                      name="fatherPhoneNumber"
                      type="tel"
                      required
                      value={signupValues.fatherPhoneNumber}
                      onChange={handleSignupInputChange}
                      placeholder="Enter 10-digit father phone number"
                      maxLength={10}
                    />
                    {errors.fatherPhoneNumber && <span className="error-message">{errors.fatherPhoneNumber}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signup-class">Class/Grade *</label>
                    <select
                      id="signup-class"
                      name="class"
                      required
                      value={signupValues.class}
                      onChange={handleSignupInputChange}
                    >
                      <option value="11th">11th</option>
                      <option value="12th">12th</option>
                      <option value="Dropper">Dropper</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signup-state">State *</label>
                    <select
                      id="signup-state"
                      name="state"
                      required
                      value={signupValues.state}
                      onChange={handleSignupInputChange}
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <button className="btn btn-primary" type="submit" disabled={isSignupSubmitting}>
                    {isSignupSubmitting ? 'Submitting...' : 'Sign Up'}
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

export default SignUp;
