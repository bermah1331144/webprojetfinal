import React from 'react';


export default function BottomSection() {
  return (
    <section className="bottom-content py-4">
      <div className="container">
        <div className="row">
          {/* Left Section with Title 2 */}
          <div className="col-md-6 mb-4 mb-md-0 left-section">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="col-md-2 mb-3 mb-md-0 ">
                <img src="/monDescription/OIP.jpg" alt="Image titre 2" />
                </div>
              </div>
              <div className="col-md-8">
                <h3 className="section-title mb-2">Title 2</h3>
                <p className="section-text">
                  Some default text to fill some space, and something more so there is more text
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Section with Title 3 */}
          <div className="col-md-6 right-section">
            <div className="info-card card">
              <div className="info-header card-header">
                <h3 className="section-title mb-0">Title 3</h3>
              </div>
              <ul className="info-list list-group list-group-flush">
                <li className="info-item list-group-item">
                  Some default text to fill some space, and something more so there is more text
                </li>
                <li className="info-item list-group-item">
                  Some default text to fill some space, and something more so there is more text
                </li>
                <li className="info-item list-group-item">
                  Some default text to fill some space, and something more so there is more text
                </li>
                <li className="info-item list-group-item">
                  Some default text to fill some space, and something more so there is more text
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}