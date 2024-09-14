

// import React from 'react';
// import "./Home.css";
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// const Home = () => {
//   const { t } = useTranslation();
//   return (
//     <div className="d-flex justify-content-center min-vh-100">
//       <div className="container-fluid text-center ">
//         <div className="row py-5" style={{ background: '#eff6ff' }}>
//           <div className="col-md-8 offset-md-2 py-5">
//             <h1 className="display-4 text-black mb-4 welcomemsg">
//               {t('Welcome to Railmadad')}
//             </h1>
//             <p className="lead mb-4 welcomepara">
//              {t(' Your voice matters. Our AI-powered complaint management system ensures your concerns are heard and addressed efficiently.')}
//             </p>
//             <div>
//                <Link to='/complain'> 
//               <button
//                 className="btn btn-lg text-white bg-black shadow-sm me-2"
//                 style={{ border: 'none', padding: '10px 20px' }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'black'}
//               >
//                File a Complaint
//               </button>
//               </Link>
//               <Link to='complainstatus'>
//               <button
//                 className="btn btn-lg text-black bg-white shadow-sm"
//                 style={{ border: 'none', padding: '10px 20px' }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 Track Complaint
//               </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Key Features Section */}
//         <div className="row py-5 justify-content-around">
//           <h1 className="mb-5 heading">Key Features</h1>
//           <div className="col-md-3 text-center feature-box mb-4">
//             <h1><i className="bi bi-lightning-charge text-primary"></i></h1>
//             <h2>AI-Powered Categorization</h2>
//             <p>Our system automatically categorizes your complaints using advanced AI, ensuring faster routing and resolution.</p>
//           </div>
//           <div className="col-md-3 text-center feature-box mb-4">
//             <h1><i className="bi bi-phone text-primary"></i></h1>
//             <h2>Real-time Updates</h2>
//             <p>Receive instant updates on your complaint status via SMS and our mobile app, keeping you informed at every step.</p>
//           </div>
//           <div className="col-md-3 text-center feature-box mb-4">
//             <h1><i className="bi bi-chat-right text-primary"></i></h1>
//             <h2>Multilingual Support</h2>
//             <p>File complaints and receive support in multiple Indian languages, making the process accessible to all.</p>
//           </div>
//         </div>



//         {/*How it work section */}
//         <div className="row py-5" style={{background:'#eff6ff'}}>
//           <h1 className="mb-5 heading">How It Works</h1>
//           <div className="col-md-3 text-center">
//             <div className="step-circle mx-auto mb-3">1</div>
//             <h2>File Complaint</h2>
//             <p className='para'>Submit your complaint through our user-friendly interface or mobile app.</p>
//           </div>
//           <div className="col-md-3 text-center">
//             <div className="step-circle mx-auto mb-3">2</div>
//             <h2>AI Processing</h2>
//             <p className='para'>Our AI system categorizes and prioritizes your complaint for efficient handling.</p>
//           </div>
//           <div className="col-md-3 text-center">
//             <div className="step-circle mx-auto mb-3">3</div>
//             <h2>Staff Assignment</h2>
//             <p className='para'>The complaint is automatically assigned to the relevant department or staff member.</p>
//           </div>
//           <div className="col-md-3 text-center">
//             <div className="step-circle mx-auto mb-3">4</div>
//             <h2>Resolution & Feedback</h2>
//             <p className='para'>Receive updates on resolution progress and provide feedback on the service.</p>
//           </div>
//         </div>


//         {/*contact us */}
//         <div className="container py-5 mb-4">
//             <h1 className="text-center mb-4 heading pb-3">Contact Us</h1>
//             <div className="row justify-content-around py-5">
//               <div className="col-md-5 contact-box ">
//                 <div className=" emergency-box text-center p-4">
//                   <h3 className="mb-3">Emergency Helpline</h3>
//                   <h4 className="helpline-number text-primary ">1800-111-139</h4>
//                   <p className='para'>Available 24/7 for urgent assistance</p>
//                 </div>
//               </div>
//               <div className="col-md-5 contact-box">
//                 <div className=" general-box text-center p-4">
//                   <h3 className="mb-3">General Enquiries</h3>
//                   <h4 className="general-email text-primary ">support@railmadad.in</h4>
//                   <p className='para'>For non-urgent queries and feedback</p>
//                 </div>
//               </div>
//             </div>
//         </div>
//         <hr />
//         <div className="container d-flex justify-content-end my-3">
//         <div className="footer-links">
//           <a href="#terms" className="text-secondary me-3 footer-links ">Terms of Service</a>
//           <a href="#privacy" className="text-secondary me-3 footer-links">Privacy Policy</a>
//           <a href="#accessibility" className="text-secondary footer-links">Accessibility</a>
//         </div>
//       </div>

//       </div>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center min-vh-100">
      <div className="container-fluid text-center">
        <div className="row py-5" style={{ background: '#eff6ff' }}>
          <div className="col-md-8 offset-md-2 py-5">
            <h1 className="display-4 text-black mb-4 welcomemsg">
              {t('Welcome to Railmadad')}
            </h1>
            <p className="lead mb-4 welcomepara">
              {t('Your voice matters. Our AI-powered complaint management system ensures your concerns are heard and addressed efficiently.')}
            </p>
            <div>
              <Link to='/complain'>
                <button
                  className="btn btn-lg text-white bg-black shadow-sm me-2"
                  style={{ border: 'none', padding: '10px 20px' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'black'}
                >
                  {t('File a Complaint')}
                </button>
              </Link>
              <Link to='/complainstatus'>
                <button
                  className="btn btn-lg text-black bg-white shadow-sm"
                  style={{ border: 'none', padding: '10px 20px' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {t('Track Complaint')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="row py-5 justify-content-around">
          <h1 className="mb-5 heading">{t('Key Features')}</h1>
          <div className="col-md-3 text-center feature-box mb-4">
            <h1><i className="bi bi-lightning-charge text-primary"></i></h1>
            <h2>{t('AI-Powered Categorization')}</h2>
            <p>{t('Our system automatically categorizes your complaints using advanced AI, ensuring faster routing and resolution.')}</p>
          </div>
          <div className="col-md-3 text-center feature-box mb-4">
            <h1><i className="bi bi-phone text-primary"></i></h1>
            <h2>{t('Real-time Updates')}</h2>
            <p>{t('Receive instant updates on your complaint status via SMS and our mobile app, keeping you informed at every step.')}</p>
          </div>
          <div className="col-md-3 text-center feature-box mb-4">
            <h1><i className="bi bi-chat-right text-primary"></i></h1>
            <h2>{t('Multilingual Support')}</h2>
            <p>{t('File complaints and receive support in multiple Indian languages, making the process accessible to all.')}</p>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="row py-5" style={{ background: '#eff6ff' }}>
          <h1 className="mb-5 heading">{t('How It Works')}</h1>
          <div className="col-md-3 text-center">
            <div className="step-circle mx-auto mb-3">1</div>
            <h2>{t('File Complaint')}</h2>
            <p className='para'>{t('Submit your complaint through our user-friendly interface or mobile app.')}</p>
          </div>
          <div className="col-md-3 text-center">
            <div className="step-circle mx-auto mb-3">2</div>
            <h2>{t('AI Processing')}</h2>
            <p className='para'>{t('Our AI system categorizes and prioritizes your complaint for efficient handling.')}</p>
          </div>
          <div className="col-md-3 text-center">
            <div className="step-circle mx-auto mb-3">3</div>
            <h2>{t('Staff Assignment')}</h2>
            <p className='para'>{t('The complaint is automatically assigned to the relevant department or staff member.')}</p>
          </div>
          <div className="col-md-3 text-center">
            <div className="step-circle mx-auto mb-3">4</div>
            <h2>{t('Resolution & Feedback')}</h2>
            <p className='para'>{t('Receive updates on resolution progress and provide feedback on the service.')}</p>
          </div>
        </div>

        {/* Contact Us */}
        <div className="container py-5 mb-4">
          <h1 className="text-center mb-4 heading pb-3">{t('Contact Us')}</h1>
          <div className="row justify-content-around py-5">
            <div className="col-md-5 contact-box">
              <div className="emergency-box text-center p-4">
                <h3 className="mb-3">{t('Emergency Helpline')}</h3>
                <h4 className="helpline-number text-primary">1800-111-139</h4>
                <p className='para'>{t('Available 24/7 for urgent assistance')}</p>
              </div>
            </div>
            <div className="col-md-5 contact-box">
              <div className="general-box text-center p-4">
                <h3 className="mb-3">{t('General Enquiries')}</h3>
                <h4 className="general-email text-primary">support@railmadad.in</h4>
                <p className='para'>{t('For non-urgent queries and feedback')}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container d-flex justify-content-end my-3">
          <div className="footer-links">
            <a href="#terms" className="text-secondary me-3 footer-links">{t('Terms of Service')}</a>
            <a href="#privacy" className="text-secondary me-3 footer-links">{t('Privacy Policy')}</a>
            <a href="#accessibility" className="text-secondary footer-links">{t('Accessibility')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
