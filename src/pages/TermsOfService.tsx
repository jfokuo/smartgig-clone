
import Layout from "@/components/layout/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: June 1, 2023</p>
          
          <div className="prose prose-gray max-w-none">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the SmartGig platform, including our website, services, and mobile applications (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our Platform, you represent that you are at least 18 years old and agree to be bound by these Terms. If you are accessing or using our Platform on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time in our sole discretion. If we do so, we'll notify you by posting the modified Terms on the Platform and updating the "Last Updated" date. Your continued use of the Platform after we have posted the modified Terms constitutes your agreement to the modified Terms.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. Account Registration</h2>
            <p>
              To access certain features of our Platform, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. User Content</h2>
            <p>
              Our Platform allows you to create, upload, store, share, and otherwise make available certain content, including but not limited to text, images, videos, and educational materials ("User Content").
            </p>
            <p>
              You retain all rights in and to your User Content, subject to the limited license granted to us below. By making any User Content available through the Platform, you grant SmartGig a non-exclusive, transferable, sublicensable, worldwide, royalty-free license to use, copy, modify, create derivative works based upon, distribute, publicly display, and publicly perform your User Content.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. Prohibited Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the rights of others, including intellectual property rights</li>
              <li>Post User Content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
              <li>Interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
              <li>Attempt to gain unauthorized access to any part of the Platform</li>
              <li>Use the Platform for any commercial purpose without our prior written consent</li>
              <li>Engage in data mining, scraping, or similar data gathering activities</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. Payment Terms</h2>
            <p>
              If you purchase any services or products through our Platform, you agree to pay all applicable fees and taxes. All payments are non-refundable unless otherwise expressly stated.
            </p>
            <p>
              For educators, SmartGig charges a platform fee on sales as specified in your educator agreement. Payment processing fees may also apply.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              The Platform and its contents, features, and functionality are owned by SmartGig, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              These Terms do not grant you any right, title, or interest in the Platform or any content on the Platform, other than your own User Content.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">8. Termination</h2>
            <p>
              We may terminate or suspend your access to all or part of the Platform, with or without notice, for any conduct that we, in our sole discretion, believe violates these Terms or is harmful to other users of the Platform, us, or third parties, or for any other reason.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">9. Disclaimer of Warranties</h2>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, SMARTGIG DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">10. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SMARTGIG BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR ACCESS TO OR USE OF THE PLATFORM.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">11. Governing Law</h2>
            <p>
              These Terms and any action related thereto will be governed by the laws of the State of New York without regard to its conflict of laws provisions.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">12. Dispute Resolution</h2>
            <p>
              Any dispute arising from or relating to these Terms or your use of the Platform shall be resolved by arbitration in accordance with the rules of the American Arbitration Association.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> legal@smartgig.com<br />
              <strong>Address:</strong> SmartGig, 123 Education Lane, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
