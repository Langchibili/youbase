import React from 'react';
import Link from 'next/link';

const DataDeletion = () => {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Data Deletion</h1>
        <p>YouBase allows you to delete specific data associated with your profile, including videos, images, or textual posts. Here’s how you can manage your content:</p>
  
        <h2>Deleting Specific Content</h2>
        <ul>
          <li>Log in to your YouBase account.</li>
          <li>Navigate to the content you want to delete.</li>
          <li>Click the delete option provided in the content management interface.</li>
        </ul>
  
        <h2>Requesting Deletion of Personal Data</h2>
        <p>If you wish to request the deletion of specific personal data that cannot be managed directly from your profile, follow these steps:</p>
        <ol>
          <li>
            Visit our publicly available <Link href="/support">Support Page</Link>.
          </li>
          <li>
            Submit a request with the issue specified as: <strong>"I want to delete my data"</strong>.
          </li>
          <li>
            Provide either your registered phone number or email address for verification purposes.
          </li>
          <li>
            Our support team will verify your identity and confirm the deletion request. This step ensures the security of your data.
          </li>
        </ol>
  
        <h2>Important Notes</h2>
        <ul>
          <li>
            Data deletion requests may take up to 5 business days to process.
          </li>
          <li>
            Certain information may be retained to comply with legal obligations, resolve disputes, or enforce our agreements as detailed in our <Link href="/privacy-policy">Privacy Policy</Link>.
          </li>
        </ul>
  
        <p>If you have further questions about data deletion, please <Link href="/support">contact us</Link>.</p>
      </div>
    );
  };
  export default DataDeletion;
  