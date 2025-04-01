
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: June 1, 2023</p>
          
          <div className="prose prose-gray max-w-none">
            <p>
              At SmartGig, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create an account or user profile</li>
              <li>Complete forms or surveys</li>
              <li>Participate in our interactive features</li>
              <li>Contact customer support</li>
              <li>Make purchases through our platform</li>
            </ul>
            <p>
              The types of information we may collect include your name, email address, postal address, phone number, payment information, and any other information you choose to provide.
            </p>
            
            <h3 className="text-lg font-bold mt-6 mb-3">Automatically Collected Information</h3>
            <p>
              When you access or use our platform, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Log information (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Location information</li>
              <li>Cookie data</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve our platform</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages and notifications</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your experience</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Information Sharing</h2>
            <p>
              We may share your information as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>With service providers who perform services on our behalf</li>
              <li>With educators or learners to facilitate transactions</li>
              <li>In response to legal process or when required by law</li>
              <li>In connection with a merger, sale, or acquisition of all or part of our company</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Your Choices</h2>
            <p>
              You can access and update certain information about your account through your account settings. You may also opt out of receiving promotional communications from us by following the instructions in those communications.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of your information.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our platform is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will promptly take steps to delete such information.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@smartgig.com<br />
              <strong>Address:</strong> SmartGig, 123 Education Lane, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
