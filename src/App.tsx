import { useEffect, useState } from 'react';
import {
  contactDetails,
  faqs,
  mentors,
  navLinks,
  pricingPlans,
  supportHours,
} from './data/siteContent';
import type { ContactFormPayload } from './services/contactService';
import { submitContactForm } from './services/contactService';

const initialFormState: ContactFormPayload = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarElevated, setNavbarElevated] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<ContactFormPayload>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm(formValues);
      alert("Thank you for contacting us! We'll get back to you within 24 hours.");
      setFormValues(initialFormState);
    } catch (error) {
      console.error(error);
      alert('There was an issue sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarElevated(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div>
      <nav className={`navbar ${navbarElevated ? 'elevated' : ''}`}>
        <div className="nav-container">
          <div className="logo-section">
            <div className="logo-placeholder">S</div>
            <span className="logo-text">Shreyas Academy</span>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={(event) => handleNavClick(event, link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-container">
            <div className="hero-content">
              <div className="tagline">Fuel your potential from toppers - for toppers</div>
              <h1 className="hero-title">
                India&apos;s Most Elite NEET Mentorship Program Guided by MBBS Toppers
              </h1>
              <p className="hero-subtitle">
                Learn directly from NEET toppers with AIR 17, 80, 159, 214, 256 and many more top ranks
                across Karnataka, Andhra Pradesh &amp; Tamil Nadu.
              </p>
              <div className="hero-features">
                📚 Personal Guidance + Topper Strategy + Daily Study Plan 
              </div>
              <div className="cta-buttons">
                <a href="#enroll" className="btn btn-primary" onClick={(event) => handleNavClick(event, 'enroll')}>
                  Enroll Now
                </a>
                <div className="auth-buttons">
                  <a
                    href="#login-student"
                    className="btn btn-auth-signin"
                    onClick={(event) => handleNavClick(event, 'login-student')}
                  >
                    Not signed in? Sign in
                  </a>
                  <a
                    href="#login-student"
                    className="btn btn-auth-login"
                    onClick={(event) => handleNavClick(event, 'login-student')}
                  >
                    Already an user? Log in
                  </a>
                  <a
                    href="#login-mentor"
                    className="btn btn-auth-mentor"
                    onClick={(event) => handleNavClick(event, 'login-mentor')}
                  >
                    Login for Mentors
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="problems" id="problems">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Major Challenges for NEET Aspirants – And How Shreyas Academy Transforms Their Journey</h2>
            </div>
            <div className="problems-content">
              <div className="problems-intro reveal-on-scroll">
                <p className="problems-lead">
                  Every year, lakhs of students enroll in coaching classes that claim to prepare them for NEET. 
                  But are they really getting what matters most for success?
                </p>
                <div className="problems-questions">
                  <div className="question-item">
                    <span className="question-icon">❌</span>
                    <div className="question-content">
                      <strong>Students are taught academics, but do they get proper, personalized guidance?</strong>
                    </div>
                    <div className="question-answer">
                      <p>No — This is what Shreyas Academy is for.</p>
                    </div>
                  </div>
                  <div className="question-item">
                    <span className="question-icon">❌</span>
                    <div className="question-content">
                      <strong>Are they shown how to build and follow an effective plan till the exam?</strong>
                    </div>
                    <div className="question-answer">
                      <p>No — This is what Shreyas Academy is for.</p>
                    </div>
                  </div>
                  <div className="question-item">
                    <span className="question-icon">❌</span>
                    <div className="question-content">
                      <strong>Do they receive consistent motivation to help them believe in their dream and push through tough times?</strong>
                    </div>
                    <div className="question-answer">
                      <p>No — This is what Shreyas Academy is for.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="problems-miss reveal-on-scroll">
                <h3 className="problems-subtitle">What Coaching Classes Miss</h3>
                <p className="problems-description">
                  Regular coaching just covers the syllabus. Very few address:
                </p>
                <div className="missed-points">
                  <div className="missed-point">
                    <div className="point-icon">🎯</div>
                    <div>
                      <h4>Personalized Discovery</h4>
                      <p>Helping students discover what works for them as unique individuals.</p>
                    </div>
                  </div>
                  <div className="missed-point">
                    <div className="point-icon">📊</div>
                    <div>
                      <h4>Personal Monitoring</h4>
                      <p>Monitoring every student&apos;s progress personally, guiding them at every step.</p>
                    </div>
                  </div>
                  <div className="missed-point">
                    <div className="point-icon">💡</div>
                    <div>
                      <h4>Real Experiences</h4>
                      <p>Bringing in real, relatable experiences from toppers to solve doubts beyond textbooks.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="problems-solution reveal-on-scroll">
                <h3 className="solution-title">Shreyas Academy: India&apos;s First Genuine NEET Mentorship Revolution</h3>
                <p className="solution-intro">
                  That&apos;s where Shreyas Academy stands apart:
                </p>
                <div className="solution-points">
                  <div className="solution-point">
                    <div className="solution-icon">🏆</div>
                    <div>
                      <h4>Elite Mentors from Top Medical Colleges</h4>
                      <p>
                        Students are mentored personally by experts from the best medical colleges in India — 
                        not just teachers, but top NEET rank holders who have been in your shoes and cracked the code themselves.
                      </p>
                    </div>
                  </div>
                  <div className="solution-point">
                    <div className="solution-icon">🚀</div>
                    <div>
                      <h4>Beyond Academics: Complete Guidance</h4>
                      <p>
                        Our mentors don&apos;t just answer academic questions. They show you how to manage time, 
                        overcome setbacks, and stay consistently motivated throughout the journey.
                      </p>
                    </div>
                  </div>
                  <div className="solution-point">
                    <div className="solution-icon">⭐</div>
                    <div>
                      <h4>Personal Attention for Every Student</h4>
                      <p>
                        Each student is monitored and supported at every stage — no one is left behind, 
                        and everyone is treated as a future topper.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mentor-panel" id="mentor-panel">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Our Elite Mentor Panel</h2>
              <p className="section-subtitle">
                Learn from India&apos;s brightest MBBS students who&apos;ve cracked NEET with exceptional ranks
              </p>
            </div>
            <div className="mentor-grid">
              {mentors.map((mentor) => (
                <div className="mentor-card reveal-on-scroll" key={mentor.name}>
                  <div className="mentor-rank">{mentor.rank}</div>
                  <div className="mentor-info">
                    <h3>{mentor.name}</h3>
                    <p className="mentor-state">{mentor.state}</p>
                    <span className="mentor-speciality">{mentor.speciality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Unlock Exciting Rewards with Every Achievement!</h2>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p className="rewards-intro">
                  At Shreyas Academy, your dedication and hard work are truly valued. Here&apos;s how your performance can open doors to inspiring experiences and amazing prizes:
                </p>
                <div className="rewards-list">
                  <div className="reward-item reveal-on-scroll">
                    <div className="reward-icon">🏆</div>
                    <div className="reward-content">
                      <h3>Monthly Special Test Achievers</h3>
                      <p>
                        Score the target marks in our exclusive monthly tests, and you&apos;ll earn a sponsored campus tour of <strong>AIIMS Delhi</strong> or <strong>JIPMER</strong> — a once-in-a-lifetime chance to experience India&apos;s top medical colleges up close.
                      </p>
                    </div>
                  </div>
                  <div className="reward-item reveal-on-scroll">
                    <div className="reward-icon">⭐</div>
                    <div className="reward-content">
                      <h3>Weekly Test Stars</h3>
                      <p>
                        Consistently perform well in weekly tests? You&apos;ll win exciting prizes to keep your motivation high all year long.
                      </p>
                    </div>
                  </div>
                  <div className="reward-item reveal-on-scroll">
                    <div className="reward-icon">🎖️</div>
                    <div className="reward-content">
                      <h3>All India Rank Holders</h3>
                      <p>
                        For the champions who secure national ranks and stick with us in their journey, we&apos;re offering grand rewards and recognition packages that celebrate your extraordinary achievement on a national scale.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="rewards-closing">
                  No effort goes unnoticed at Shreyas Academy — every milestone unlocks real opportunities and unforgettable experiences that fuel your dreams and inspire you to reach new heights. Start your journey to greatness today, and discover just how far your hard work can take you!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="enroll" id="enroll">
          <div className="section-container">
            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <div
                  className={`pricing-card reveal-on-scroll ${plan.featured ? 'featured' : ''}`}
                  key={plan.name}
                >
                  {plan.badge && <div className="badge">{plan.badge}</div>}
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">{plan.price}</div>
                  <p className="plan-duration">{plan.duration}</p>
                  <ul className="plan-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className="check-icon">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary" type="button">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faqs" id="faqs">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Everything you need to know about Shreyas Academy</p>
            </div>
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={faq.question}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <span className="faq-icon">{activeFaq === index ? '✕' : '+'}</span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-container">
            <div className="contact-content">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>
                  Have questions? We&apos;re here to help you succeed. Reach out to our support team for any
                  queries about admissions, courses, or mentorship programs.
                </p>
                <div className="contact-details">
                  {contactDetails.map((detail) => (
                    <div className="contact-item" key={detail.label}>
                      <div className="contact-icon">{detail.icon}</div>
                      <div>
                        <strong>{detail.label}</strong>
                        <br />
                        {detail.value}
                      </div>
                    </div>
                  ))}
                  <div className="contact-item">
                    <div className="contact-icon">⏰</div>
                    <div>
                      <strong>Support Hours</strong>
                      <br />
                      {supportHours}
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formValues.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formValues.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Shreyas Academy</h3>
            <p>
              India&apos;s premier NEET mentorship platform connecting aspirants with MBBS toppers for personalized
              guidance and proven success strategies.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#home" onClick={(event) => handleNavClick(event, 'home')}>
              Home
            </a>
            <a href="#mentor-panel" onClick={(event) => handleNavClick(event, 'mentor-panel')}>
              Mentor Panel
            </a>
            <a href="#about" onClick={(event) => handleNavClick(event, 'about')}>
              About Us
            </a>
            <a href="#enroll" onClick={(event) => handleNavClick(event, 'enroll')}>
              Enrollment Plans
            </a>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <a href="#faqs" onClick={(event) => handleNavClick(event, 'faqs')}>
              FAQs
            </a>
            <a href="#contact" onClick={(event) => handleNavClick(event, 'contact')}>
              Contact Support
            </a>
            <a href="#login-student" onClick={(event) => handleNavClick(event, 'login-student')}>
              Student Login
            </a>
            <a href="#login-mentor" onClick={(event) => handleNavClick(event, 'login-mentor')}>
              Mentor Login
            </a>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
            <a href="#">Academic Integrity</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Shreyas Academy. All rights reserved. | Empowering NEET Aspirants Nationwide</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
