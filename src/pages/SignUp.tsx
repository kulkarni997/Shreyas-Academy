import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SignupFormPayload } from '../services/signupService';
import { submitSignupForm } from '../services/signupService';
import caduceusLogo from '../assets/caduceus-logo.svg';

const initialSignupState: SignupFormPayload = {
  name: '',
  class: 'Class 11',
  email: '',
  contactNumber: '',
  guardianNumber: '',
};

const SignUp = () => {
  const [signupValues, setSignupValues] = useState<SignupFormPayload>(initialSignupState);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);

  const handleSignupInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSignupValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSignupSubmitting(true);
    try {
      await submitSignupForm(signupValues);
      alert("Thank you for signing up! We'll contact you soon to complete your enrollment.");
      setSignupValues(initialSignupState);
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
            <img src={caduceusLogo} alt="Shreyas Academy Logo" className="logo-image" />
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
                <form onSubmit={handleSignupSubmit}>
                  <div className="form-group">
                    <label htmlFor="signup-name">Name of the Student</label>
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      required
                      value={signupValues.name}
                      onChange={handleSignupInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-class">Class</label>
                    <select
                      id="signup-class"
                      name="class"
                      required
                      value={signupValues.class}
                      onChange={handleSignupInputChange}
                    >
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="Dropper">Dropper</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-email">Email Address</label>
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      required
                      value={signupValues.email}
                      onChange={handleSignupInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-contact">Contact Number</label>
                    <input
                      id="signup-contact"
                      name="contactNumber"
                      type="tel"
                      required
                      value={signupValues.contactNumber}
                      onChange={handleSignupInputChange}
                      placeholder="Enter your contact number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-guardian">Guardian&apos;s Number</label>
                    <input
                      id="signup-guardian"
                      name="guardianNumber"
                      type="tel"
                      required
                      value={signupValues.guardianNumber}
                      onChange={handleSignupInputChange}
                      placeholder="Enter guardian&apos;s contact number"
                    />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={isSignupSubmitting}>
                    {isSignupSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUp;

