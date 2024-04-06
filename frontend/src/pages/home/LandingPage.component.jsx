import React from 'react'
import "./LandingPage.style.scss"
const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
          <h1>Welcome to Uski Drive</h1>
          <p>Your secure cloud storage solution.</p>
      </header>
      <main className="landing-main">
          <section className="about-section">
              <h2>Easy file access from anywhere</h2>
              <p>Keep your files safe, synced, and accessible across all your devices. Uski Drive offers you secure cloud storage for all your needs.</p>
          </section>
          <section className="feature-section">
              <div className="feature">
                  <h3>Secure Storage</h3>
                  <p>We prioritize your privacy and security, offering encrypted storage solutions.</p>
              </div>
              <div className="feature">
                  <h3>Fast Sharing</h3>
                  <p>Share files and folders easily with anyone with just a link.</p>
              </div>
              <div className="feature">
                  <h3>Easy Organization</h3>
                  <p>Sort, manage, and organize your data with simple yet powerful tools.</p>
              </div>
          </section>
      </main>
    </div>
  )
}

export default LandingPage