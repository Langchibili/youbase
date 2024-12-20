import React from 'react';
import Link from 'next/link';

  const TermsAndConditions = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Terms and Conditions</h1>
        <p>Welcome to YouBase! By using our platform, you agree to these terms:</p>
  
        <h2>1. Use of the Platform</h2>
        <ul>
          <li>
            You must be at least 18 years old or have parental consent to use the
            platform.
          </li>
          <li>
            You are responsible for the content you share and its compliance with
            our guidelines.
          </li>
        </ul>
  
        <h2>2. Content Ownership</h2>
        <ul>
          <li>
            You retain ownership of your content but grant YouBase a license to
            display and monetize it.
          </li>
          <li>
            Harmful or prohibited content may be removed without notice.
          </li>
        </ul>
  
        <h2>3. Monetization</h2>
        <ul>
          <li>
            Content creators must verify their identity to be eligible for
            monetization.
          </li>
          <li>
            Content must adhere to guidelines to qualify for monetization.
          </li>
        </ul>
  
        <h2>4. Liability</h2>
        <p>
          YouBase is not liable for user-generated content. Users are solely
          responsible for their uploads.
        </p>
  
        <h2>5. Termination</h2>
        <p>
          We reserve the right to terminate accounts for violations of these terms
          or harmful activity.
        </p>
  
        <h2>6. Updates</h2>
        <p>
          We may update these terms at any time. Continued use of the platform
          constitutes acceptance of updated terms.
        </p>
  
        <p>If you have questions, contact us via <Link href="/support">The support page</Link>.</p>
      </div>
    );
  };
  
  export default TermsAndConditions;
  