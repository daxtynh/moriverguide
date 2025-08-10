import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | MoRiverGuide',
  description: 'Privacy policy for MoRiverGuide.com. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you sign up for our newsletter,
            contact us, or use our trip planning tools. This may include your name, email address, and
            trip preferences.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Send you trip planning resources and updates</li>
            <li>Respond to your questions and requests</li>
            <li>Analyze usage patterns to improve user experience</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            aggregate, non-personally identifiable information with partners and advertisers.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies to enhance your experience, gather general visitor information, and track
            visits to our website. You can choose to disable cookies through your browser settings.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However,
            no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@moriverguide.com
          </p>
        </div>
      </div>
    </div>
  );
}