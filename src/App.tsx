import { useEffect, useState } from 'react';
import {
  contactDetails,
  faqs,
  mentors,
  navLinks,
  pricingPlans,
  stats,
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
                📚 Daily 1.5-Hour Online Classes + Topper Strategy + Personal Guidance
              </div>
              <div className="cta-buttons">
                <a href="#enroll" className="btn btn-primary" onClick={(event) => handleNavClick(event, 'enroll')}>
                  Enroll Now
                </a>
                <a
                  href="#mentor-panel"
                  className="btn btn-secondary"
                  onClick={(event) => handleNavClick(event, 'mentor-panel')}
                >
                  Meet Our Mentors
                </a>
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
              <h2 className="section-title">Why Choose Shreyas Academy?</h2>
            </div>
            <div className="about-content">
              <div className="about-text">
                <h2>Transform Your NEET Journey</h2>
                <p>
                  At Shreyas Academy, we believe in learning from those who&apos;ve walked the path successfully.
                  Our mentors are not just high scorers – they&apos;re current MBBS students who understand the
                  challenges you face and have proven strategies to overcome them.
                </p>
                <p>
                  With daily interactive sessions, personalized guidance, and topper-tested techniques, we provide
                  everything you need to excel in NEET. Our approach combines rigorous academics with mental
                  conditioning, time management, and exam strategies that have helped hundreds of students achieve
                  their medical dreams.
                </p>
                <p>
                  Join thousands of aspirants who trust Shreyas Academy for their NEET preparation and experience
                  the difference that personalized mentorship makes.
                </p>
              </div>
              <div className="stats-grid">
                {stats.map((stat) => (
                  <div className="stat-card reveal-on-scroll" key={stat.label}>
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="enroll" id="enroll">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Choose Your Path to Success</h2>
              <p className="section-subtitle">
                Flexible plans designed for NEET aspirants at different stages of preparation
              </p>
            </div>
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
