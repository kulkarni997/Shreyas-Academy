import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import academyLogo from './assets/logo.jpg';

// {mentors.map((mentor, idx) => (
//   <div key={idx} >
//     <div
//   className="mentor-card"
//   style={{
//     display: 'flex',
//     background: 'linear-gradient(90deg, #f0f9ff 50%, #e0f2fe 100%)',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
//     borderRadius: '16px',
//     overflow: 'hidden',
//     width: '100%',
//     maxWidth: '700px',
//     margin: '0 auto 32px auto',
//     minHeight: '260px'
//   }}
// >
//   {/* Left side: details */}
//   <div style={{
//     flex: 2,
//     padding: '32px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center'
//   }}>
//     <h2 style={{ marginBottom: '8px', color: '#0ea5e9' }}>{mentor.name}</h2>
//     <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>{mentor.rank}</div>
//     <div style={{ marginBottom: '8px', color: '#555' }}>{mentor.state}</div>
//     <div style={{ marginBottom: '8px', color: '#2c7a7b' }}>{mentor.college}</div>
//     <div style={{ marginBottom: '8px' }}>
//       {mentors.achievements.map((a, idx) => (
//         <div key={idx} style={{ fontSize: '15px', color: '#2563eb' }}>{a}</div>
//       ))}
//     </div>
//     <div style={{ fontStyle: 'italic', color: '#0284c7' }}>{mentor.speciality}</div>
//   </div>
//   {/* Right side: image */}
//   <div style={{ flex: 1, minWidth: '220px', height: '100%' }}>
//     <img
//       src={mentor.imageUrl}
//       alt={mentor.name}
//       style={{
//         width: '100%',
//         height: '100%',
//         objectFit: 'cover',
//         display: 'block'
//       }}
//     />
//   </div>
// </div>


//   </div>
// ))}



// const mentors = [
//   {
//     name: 'Nikhil Sonad',
//     rank: 'NEET AIR 17',
//     state: 'Karnataka',
//     college: 'MBBS at AIIMS Delhi',
//     achievements: [
//       'Karnataka NEET Rank 1',
//       'JEE 99.47',
//       'NDA cleared',
//       'KCET Rank 8',
//     ],
//     speciality: 'NEET & JEE Strategy Mentor',
//     imageUrl: '/images/mentors/Pic1.png',
//   }]
//   {
//     name: 'Shreyas M',
//     rank: 'NEET AIR 214',
//     state: 'Karnataka',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Karnataka NEET Rank 14',
//       'JEE 98.66',
//     ],
//     speciality: 'NEET Physics & Chemistry Mentor',
//     imageUrl: '/images/mentors/shreyas-m.jpg',
//   },
//   {
//     name: 'Diganth',
//     rank: 'NEET AIR 80',
//     state: 'Karnataka',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Karnataka NEET Rank 6',
//       'JEE 99.32',
//       'KCET Rank 4',
//     ],
//     speciality: 'NEET & KCET Mentor',
//     imageUrl: '/images/mentors/diganth.jpg',
//   },
//   {
//     name: 'Saish Pandit',
//     rank: 'NEET AIR 17',
//     state: 'Karnataka',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Karnataka NEET Rank 10',
//       'JEE 99.76',
//       'IISER AIR 66',
//       'NDA cleared',
//       'KCET Rank 2',
//     ],
//     speciality: 'All-round NEET, JEE & IISER Mentor',
//     imageUrl: '/images/mentors/saish-pandit.jpg',
//   },
//   {
//     name: 'Harish Raj D V',
//     rank: 'NEET AIR 256',
//     state: 'Karnataka',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Karnataka NEET Rank 17',
//       'JEE 99.10',
//       'KCET (Top Rank)',
//     ],
//     speciality: 'NEET & KCET Mentor',
//     imageUrl: '/images/mentors/harish-raj-dv.jpg',
//   },
//   {
//     name: 'Siddharth',
//     rank: 'Karnataka NEET Rank 47',
//     state: 'Karnataka',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'KCET Rank 9',
//     ],
//     speciality: 'NEET Biology Mentor',
//     imageUrl: '/images/mentors/siddharth.jpg',
//   },
//   {
//     name: 'Srujan D',
//     rank: 'NEET AIR 985',
//     state: 'Karnataka',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Karnataka NEET Rank 71',
//       'JEE 98.52',
//     ],
//     speciality: 'NEET & JEE Mentor',
//     imageUrl: '/images/mentors/srujan-d.jpg',
//   },
//   {
//     name: 'Viswajitt R P',
//     rank: 'NEET AIR 768',
//     state: 'Tamil Nadu',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Tamil Nadu Rank 36',
//       'JEE 99',
//       'JEE Physics 100% (TWICE)',
//     ],
//     speciality: 'Physics Specialist Mentor',
//     imageUrl: '/images/mentors/viswajitt-rp.jpg',
//   },
//   {
//     name: 'Sai Charan',
//     rank: 'NEET AIR 562',
//     state: 'Andhra Pradesh',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Andhra Pradesh Rank 31',
//       'JEE 99.27',
//     ],
//     speciality: 'NEET & JEE Mentor',
//     imageUrl: 'public/Pic1.jpg'
// ',
//   },
//   {
//     name: 'Balaji Tejas',
//     rank: 'NEET AIR 2591',
//     state: 'Karnataka',
//     college: 'MBBS at JIPMER Pondicherry',
//     achievements: [
//       'Karnataka NEET Rank 185',
//       'JEE 98',
//       'IISER AIR 521',
//     ],
//     speciality: 'NEET & IISER Mentor',
//     imageUrl: '/images/mentors/balaji-tejas.jpg',
//   },
//   {
//     name: 'Shadjay',
//     rank: 'NEET AIR 2213',
//     state: 'Karnataka',
//     college: 'MBBS at BMC',
//     achievements: [
//       'Karnataka NEET Rank 160',
//       'JEE 97.2',
//     ],
//     speciality: 'NEET Mentor',
//     imageUrl: '/images/mentors/shadjay.jpg',
//   },
//   {
//     name: 'Preetam S Kori',
//     rank: 'NEET AIR 2877',
//     state: 'Karnataka',
//     college: 'MBBS at BMC',
//     achievements: [
//       'Karnataka NEET Rank 194',
//       'JEE 97.16',
//     ],
//     speciality: 'NEET Mentor',
//     imageUrl: '/images/mentors/preetam-kori.jpg',
//   },
//   {
//     name: 'Nuthan',
//     rank: 'NEET AIR 3359',
//     state: 'Karnataka',
//     college: 'MBBS at BMC',
//     achievements: [
//       'Karnataka NEET Rank 228',
//       'JEE 96',
//     ],
//     speciality: 'NEET Mentor',
//     imageUrl: '/images/mentors/nuthan.jpg',
//   },
//   {
//     name: 'Venkangouda V Patil',
//     rank: 'NEET AIR 47803',
//     state: 'Karnataka',
//     college: 'MBBS at BRIMS',
//     achievements: [
//       'Karnataka NEET Rank 2462',
//       'JEE 98.06',
//     ],
//     speciality: 'Motivation & Strategy Mentor',
//     imageUrl: '/images/mentors/venkangouda-v-patil.jpg',
//   },
//   {
//     name: 'Kishor V',
//     rank: 'Motivational Speaker',
//     state: 'Karnataka',
//     college: '',
//     achievements: [
//       'NEET Mentor',
//       'Student Performance Coach',
//     ],
//     speciality: 'Motivational Speaker & Coach',
//     imageUrl: '/images/mentors/kishor-v.jpg',
//   },
// ];


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
  const [showAllMentors, setShowAllMentors] = useState(false);

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
          <Link to="/" className="logo-section">
            <img src={academyLogo} alt="Shreyas Academy Logo" className="logo-image" />
            <span className="logo-text">Shreyas Academy</span>
          </Link>
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
                  <Link
                    to="/signup"
                    className="btn btn-auth-signin"
                  >
                    Sign in
                  </Link>
                  <a
                    href="#login-student"
                    className="btn btn-auth-login"
                    onClick={(event) => handleNavClick(event, 'login-student')}
                  >
                    Already enrolled? Log in
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

        <section className="mentor-panel" id="mentor-panel">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Our Elite Mentor Panel</h2>
              <p className="section-subtitle">
                Learn from India&apos;s brightest MBBS students who&apos;ve cracked NEET with exceptional ranks
              </p>
            </div>
            <div className="mentor-grid">
              {mentors.slice(0, 6).map((mentor) => (
                <div className="mentor-card reveal-on-scroll" key={mentor.name}>
                  <div className="mentor-image-placeholder">
                    <div className="mentor-image-icon">👤</div>
                  </div>
                  <div className="mentor-content">
                    <div className="mentor-rank">{mentor.rank}</div>
                    <div className="mentor-info">
                      <h3>{mentor.name}</h3>
                      <p className="mentor-state">{mentor.state}</p>
                      {mentor.college && <p className="mentor-college">{mentor.college}</p>}
                      {mentor.achievements && mentor.achievements.length > 0 && (
                        <div className="mentor-achievements">
                          {mentor.achievements.map((achievement, idx) => (
                            <span key={idx} className="achievement-badge">{achievement}</span>
                          ))}
                        </div>
                      )}
                      <span className="mentor-speciality">{mentor.speciality}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {mentors.length > 6 && (
              <div className="mentor-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAllMentors(!showAllMentors)}
                >
                  {showAllMentors ? 'Show Less' : 'See All Mentors'}
                </button>
              </div>
            )}
          </div>
        </section>

        {showAllMentors && (
          <section className="all-mentors" id="all-mentors">
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">All Our Mentors</h2>
                <p className="section-subtitle">
                  Meet all our exceptional mentors who are ready to guide you to success
                </p>
              </div>
              <div className="mentor-grid">
                {mentors.map((mentor) => (
                  <div className="mentor-card reveal-on-scroll" key={mentor.name}>
                    <div className="mentor-image-placeholder">
                      <div className="mentor-image-icon">👤</div>
                    </div>
                    <div className="mentor-content">
                      <div className="mentor-rank">{mentor.rank}</div>
                      <div className="mentor-info">
                        <h3>{mentor.name}</h3>
                        <p className="mentor-state">{mentor.state}</p>
                        {mentor.college && <p className="mentor-college">{mentor.college}</p>}
                        {mentor.achievements && mentor.achievements.length > 0 && (
                          <div className="mentor-achievements">
                            {mentor.achievements.map((achievement, idx) => (
                              <span key={idx} className="achievement-badge">{achievement}</span>
                            ))}
                          </div>
                        )}
                        <span className="mentor-speciality">{mentor.speciality}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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

        <section className="cta-section">
          <div className="section-container">
            <div className="cta-content reveal-on-scroll">
              <h2 className="cta-title">So What&apos;s Waiting You From Getting Guidance From India&apos;s Best Mentors and Grabbing Seat in Your Dream College.</h2>
              <a href="#enroll" className="btn btn-primary cta-button" onClick={(event) => handleNavClick(event, 'enroll')}>
                Enroll Now
              </a>
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
                  <div className="plan-price">
                    {plan.originalPrice && <span className="original-price">{plan.originalPrice}</span>}
                    <span className="current-price">{plan.price}</span>
                  </div>
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
