export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-heading">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AI Chatbot Solutions ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and protect your information when you use our website and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              As a BotPenguin partner, we work closely with BotPenguin to provide AI chatbot solutions. This policy covers 
              our own data practices, and you should also review BotPenguin's privacy policy for their data handling practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Contact information (name, email, phone number, company)</li>
              <li>Billing information (collected securely through Stripe)</li>
              <li>Account preferences and settings</li>
              <li>Communications with our support team</li>
              <li>Custom fields during checkout (company size, industry)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Automatically Collected</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Website usage data and analytics</li>
              <li>IP address and browser information</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Page views, clicks, and navigation patterns</li>
              <li>Device and operating system information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Provide and improve our AI chatbot services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Communicate with you about our services</li>
              <li>Provide customer support</li>
              <li>Send service updates and marketing communications (with consent)</li>
              <li>Analyze website usage to improve user experience</li>
              <li>Comply with legal obligations</li>
              <li>Facilitate BotPenguin account setup and management</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>BotPenguin:</strong> To set up and manage your chatbot account</li>
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>SendGrid:</strong> For email communications</li>
              <li><strong>Google Analytics:</strong> For website analytics (anonymized data)</li>
              <li><strong>Service providers:</strong> Who help us operate our business</li>
              <li><strong>Legal authorities:</strong> When required by law</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We never sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>SSL encryption for all data transmissions</li>
              <li>Secure payment processing through Stripe</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Data backup and recovery procedures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve website performance and user experience</li>
              <li>Enable chatbot functionality</li>
              <li>Track marketing campaign effectiveness</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookie settings through our consent banner and your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your data (subject to legal requirements)</li>
              <li>Restrict data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Object to certain data processing activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your data only as long as necessary to provide our services and comply with legal obligations. 
              Account data is typically retained for the duration of your subscription plus a reasonable period thereafter. 
              Analytics data may be retained longer in anonymized form.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data may be transferred to and processed in countries other than your own, including the United States. 
              We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for children under 16. We do not knowingly collect personal information from 
              children under 16. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting 
              the new policy on our website and updating the "Last updated" date. Your continued use of our services 
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@aichatbotsolutions.io</p>
              <p className="text-gray-700 mb-2"><strong>General Contact:</strong> hello@aichatbotsolutions.io</p>
              <p className="text-gray-700"><strong>Address:</strong> AI Chatbot Solutions, Privacy Officer, [Your Business Address]</p>
            </div>
          </section>

          <div className="bg-brand-blue/10 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-brand-blue mb-2">BotPenguin Integration</h3>
            <p className="text-gray-700 text-sm">
              As a BotPenguin partner, we facilitate the setup of your BotPenguin account. Please also review 
              BotPenguin's privacy policy at <a href="https://botpenguin.com/privacy-policy" className="text-brand-blue underline" target="_blank" rel="noopener noreferrer">botpenguin.com/privacy-policy</a> 
              for information about how they handle your data within their platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}