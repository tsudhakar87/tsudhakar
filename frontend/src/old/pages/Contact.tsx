import PageLayout from "../components/PageLayout";
import "../contact-styles.css";

const Contact: React.FC = () => {
  return (
    <div>
      <PageLayout pageName="Contact">
        <div className="content-container">
          <div className="content-card">
            <h2 className="card-title">get in touch</h2>
            <p className="intro-text">
              interested in collaborating or have questions about my work? i'd
              love to hear from you.
            </p>

            <div className="contact-grid">
              <div className="contact-item">
                <h3 className="contact-method">email</h3>
                <a
                  href="mailto:thillainayaki.sudhakar@gmail.com"
                  className="contact-link"
                >
                  thillainayaki.sudhakar@gmail.com
                </a>
                <a
                  href="mailto:sudhakar.th@northeastern.edu"
                  className="contact-link"
                >
                  sudhakar.th@northeastern.edu
                </a>
              </div>

              <div className="contact-item">
                <h3 className="contact-method">phone</h3>
                <a href="tel:+17204165927" className="contact-link">
                  (720) 416-5927
                </a>
              </div>

              <div className="contact-item">
                <h3 className="contact-method">location</h3>
                <p className="contact-info">lexington & boston, ma</p>
              </div>

              <div className="contact-item">
                <h3 className="contact-method">availability</h3>
                <p className="contact-info highlight">
                  may 2026 - december 2026
                </p>
                <p className="contact-info">for co-ops & internships!</p>
              </div>
            </div>

            <div className="social-links">
              <h3 className="card-subtitle">connect with me</h3>
              <div className="links-grid">
                <a
                  href="https://github.com/tsudhakar87"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/tsudhakar87
                </a>
                <a
                  href="https://linkedin.com/in/thillai-sudhakar/"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/thillai-sudhakar
                </a>
                <a
                  href="https://www.credly.com/users/thillai/badges#credly"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  credly.com/users/thillai-sudhakar
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Contact;
