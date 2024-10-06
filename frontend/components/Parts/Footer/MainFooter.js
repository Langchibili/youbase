'use client'

import { clientUrl } from '@/Constants';
import React, { useEffect } from 'react'

export default function MainFooter() {
  useEffect(() => {
    const scripts = [
      clientUrl+'/theme/js/jquery-3.3.1.min.js',
      clientUrl+'/theme/js/vertical-responsive-menu.min.js',
      clientUrl+'/theme/vendor/bootstrap/js/bootstrap.bundle.min.js',
      clientUrl+'/theme/vendor/OwlCarousel/owl.carousel.js',
      clientUrl+'/theme/vendor/semantic/semantic.min.js',
      clientUrl+'/theme/js/custom.js',
      clientUrl+'/theme/js/night-mode.js',
    ];

    // Check if the script is already loaded
    const isScriptLoaded = (src) => !!document.querySelector(`script[src="${src}"]`);

    // Add and execute scripts if they are not already loaded
    scripts.forEach((src,index) => {
      if (!isScriptLoaded(src)) {
        const script = document.createElement('script');
        script.src = src;
        if (index > 3) {
          script.async = true; // ther
        }
        script.async = false; // Ensures correct execution order
        script.onload = () => {
          console.log(`${src} has been loaded and executed.`);
          // You can execute further JavaScript here if needed
          // For example: If you need to initialize something after the script is loaded
          if (src === '/theme/js/custom.js') {
            console.log('Custom JS initialized');
          }
        };
        document.body.appendChild(script); // Append to bottom of the body
      }
    });

    return () => {
      // Clean up script elements when the component unmounts
      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, [window.location.pathname]);

  return (
    <footer className="footer mt-30">
      <div className="container">
        <div className="row">
          {/* <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f1">
              <a href="about_us.html">About</a>
              <a href="our_blog.html">Blog</a>
              <a href="career.html">Careers</a>
              <a href="press.html">Press</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f1">
              <a href="help.html">Help</a>
              <a href="coming_soon.html">Advertise</a>
              <a href="coming_soon.html">Developers</a>
              <a href="contact_us.html">Contact Us</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f1">
              <a href="terms_of_use.html">Copyright Policy</a>
              <a href="terms_of_use.html">Terms</a>
              <a href="terms_of_use.html">Privacy Policy</a>
              <a href="sitemap.html">Sitemap</a>
            </div>
          </div> */}
          {/* <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="item_f3">
              <a href="#" className="btn1542">Teach on Cursus</a>
              <div className="lng_btn">
                <div className="ui language bottom right pointing dropdown floating" id="languages" data-content="Select Language" tabIndex={0}>
                  <a href="#">
                    <i className="uil uil-globe lft" /> Language <i className="uil uil-angle-down rgt" />
                  </a>
                  <div className="menu" tabIndex={-1}>
                    <div className="scrolling menu">
                      <div className="item" data-value="en">English</div>
                      <div className="item" data-value="da">Danish</div>
                      <div className="item" data-value="es">Spanish</div>
                      <div className="item" data-value="zh">Chinese</div>
                      <div className="item" data-value="ru">Russian</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="col-lg-12">
            <div className="footer_bottm">
              <div className="row">
                <div className="col-md-6">
                  <ul className="fotb_left">
                    <li><a href="index.html"><div className="footer_logo"><img src="/theme/images/logo1.svg" alt="" /></div></a></li>
                    <li><p>© 2024~ <strong>Youbase</strong>. All Rights Reserved.</p></li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="edu_social_links">
                    <a href="#"><i className="fab fa-facebook-f" /></a>
                    <a href="#"><i className="fab fa-twitter" /></a>
                    <a href="#"><i className="fab fa-google-plus-g" /></a>
                    <a href="#"><i className="fab fa-linkedin-in" /></a>
                    <a href="#"><i className="fab fa-instagram" /></a>
                    <a href="#"><i className="fab fa-youtube" /></a>
                    <a href="#"><i className="fab fa-pinterest-p" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
