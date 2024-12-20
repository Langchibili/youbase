import React from 'react';
import Link from 'next/link';

const AccountDeletion = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Account Deletion</h1>
      <p>We value your privacy and take account deletion requests seriously. Follow the steps below to request the deletion of your YouBase account:</p>

      <h2>Steps to Delete Your Account</h2>
      <ol>
        <li>
          Visit our publicly available <Link href="/support">Support Page</Link>.
        </li>
        <li>
          Submit a request with the issue specified as: <strong>"I want to delete my account"</strong>.
        </li>
        <li>
          Provide either your registered phone number or email address for verification purposes.
        </li>
        <li>
          Our support team will verify your identity and confirm the deletion request. This step ensures that unauthorized parties cannot fraudulently delete your account.
        </li>
      </ol>
      <p>
        Once verified, we will proceed with the deletion of your account and associated data in accordance with our <Link href="/privacy_policy">Privacy Policy</Link>.
      </p>

      <h2>Important Notes</h2>
      <ul>
        <li>
          Account deletion requests are typically processed within 5 business days.
        </li>
        <li>
          Certain information may be retained to comply with legal obligations, resolve disputes, or enforce our agreements as outlined in our <Link href="/privacy_policy">Privacy Policy</Link>.
        </li>
      </ul>

      <p>If you have any questions about deleting your account, please don’t hesitate to <Link href="/support">contact us</Link>.</p>
    </div>
  );
}
export default AccountDeletion
