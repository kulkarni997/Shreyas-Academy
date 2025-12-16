import { useState } from 'react';
import { Link } from 'react-router-dom';
import caduceusLogo from '../assets/caduceus-logo.svg';
import { submitMentorLogin, type MentorLoginPayload } from '../services/mentorLoginService';

const MentorLoginPage = () => {
  const [loginValues, setLoginValues] = useState({
    mentorId: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginValues(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!loginValues.mentorId.trim()) newErrors.mentorId = 'Mentor ID is required';
    if (!loginValues.password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const loginPayload: MentorLoginPayload = {
        mentorId: loginValues.mentorId,
        password: loginValues.password,
      };

      const response = await submitMentorLogin(loginPayload);

      if (response.success) {
        alert('Login successful!');
        // TODO: redirect to dashboard
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
        <section className="signup" id="login-mentor">
          <div className="section-container">
            <div className="signup-content">
              <div className="signup-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="mentor-id">Mentor ID</label>
                    <input
                      id="mentor-id"
                      name="mentorId"
                      type="text"
                      value={loginValues.mentorId}
                      onChange={handleInputChange}
                      placeholder="Enter your Mentor ID"
                    />
                    {errors.mentorId && <span className="error-message">{errors.mentorId}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="mentor-password">Password</label>
                    <input
                      id="mentor-password"
                      name="password"
                      type="password"
                      value={loginValues.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
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

export default MentorLoginPage;