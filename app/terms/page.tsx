import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | MoRiverGuide',
  description: 'Terms of service for MoRiverGuide.com. Read our terms and conditions for using our website and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Terms of Service</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using MoRiverGuide.com, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>

          <h2>Use of Website</h2>
          <p>
            This website provides information about float trips in Missouri. The information is for
            general guidance only. River conditions change frequently, and users must verify all
            information before embarking on any float trip.
          </p>

          <h2>Disclaimer of Liability</h2>
          <p>
            <strong>IMPORTANT:</strong> Float trips involve inherent risks. MoRiverGuide.com is not
            responsible for any injuries, damages, or losses that may occur during float trips planned
            using our information. Users assume all risks associated with water activities.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            While we strive to provide accurate information, river conditions, access points, and
            regulations can change. Always verify current conditions and regulations with local
            authorities before your trip.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            content or practices of these external sites.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website is the property of MoRiverGuide.com unless otherwise
            noted. You may not reproduce, distribute, or create derivative works without permission.
          </p>

          <h2>Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the website
            after changes constitutes acceptance of the new terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, contact us at:
            <br />
            Email: legal@moriverguide.com
          </p>
        </div>
      </div>
    </div>
  );
}