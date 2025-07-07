export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-heading">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using AI Chatbot Solutions ("we," "us," or "our") website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These terms apply to your use of our website, subscription to the BotPenguin King Plan through our partnership, and any related services we provide.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AI Chatbot Solutions is an authorized partner of BotPenguin, providing AI chatbot solutions through the BotPenguin platform. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access to BotPenguin King Plan at discounted pricing</li>
              <li>Setup and implementation assistance</li>
              <li>Customer support and training</li>
              <li>Ongoing optimization guidance</li>
              <li>Integration support for your business systems</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              The actual chatbot platform and core technology are provided by BotPenguin under their terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration and Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Be at least 18 years old or the legal age in your jurisdiction</li>
              <li>Have the authority to enter into this agreement</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept BotPenguin's terms of service for platform usage</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Billing</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">King Plan Subscription</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Monthly subscription fee: $199/month (50% discount from regular price)</li>
              <li>14-day free trial available for new customers</li>
              <li>Automatic renewal unless cancelled</li>
              <li>Billing processed securely through Stripe</li>
              <li>No setup fees or hidden charges</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Terms</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Payment is due monthly in advance</li>
              <li>Failed payments may result in service suspension</li>
              <li>Refunds available within 30 days for unused service</li>
              <li>Price changes will be communicated 30 days in advance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Free Trial</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer a 14-day free trial of the King Plan:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>No credit card required to start the trial</li>
              <li>Full access to all King Plan features</li>
              <li>Cancel anytime during the trial period</li>
              <li>Automatic conversion to paid subscription after trial</li>
              <li>One trial per customer/business</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation and Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may cancel your subscription at any time:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Cancel through your account dashboard or by contacting support</li>
              <li>Service continues until the end of your current billing period</li>
              <li>No partial refunds for monthly subscriptions</li>
              <li>30-day money-back guarantee for new subscribers</li>
              <li>Refund processing takes 5-10 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use our services for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Illegal activities or content</li>
              <li>Harassment, abuse, or harmful communications</li>
              <li>Spam or unsolicited marketing</li>
              <li>Violating intellectual property rights</li>
              <li>Distributing malware or viruses</li>
              <li>Circumventing platform limitations</li>
              <li>Activities that harm our reputation or service</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You must also comply with BotPenguin's acceptable use policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Data handling is governed by our Privacy Policy and BotPenguin's data practices:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>You retain ownership of your data</li>
              <li>We facilitate secure data transfer to BotPenguin</li>
              <li>Regular backups and data protection measures</li>
              <li>GDPR and privacy law compliance</li>
              <li>Data portability upon request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to maintain high service availability:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Target uptime: 99.9% monthly</li>
              <li>Planned maintenance with advance notice</li>
              <li>Emergency maintenance as needed</li>
              <li>Service status updates during outages</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Some service interruptions may be beyond our control due to BotPenguin platform maintenance or third-party service issues.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Intellectual property rights are distributed as follows:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>AI Chatbot Solutions owns our branding and custom content</li>
              <li>BotPenguin owns the chatbot platform technology</li>
              <li>You retain rights to your business data and content</li>
              <li>Shared responsibility for custom integrations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are provided "as is" with the following disclaimers:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>No guarantee of specific business results</li>
              <li>Chatbot accuracy depends on training and setup</li>
              <li>Integration complexity varies by business needs</li>
              <li>Third-party service dependencies may affect performance</li>
              <li>AI technology limitations apply</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Our liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, 
              or consequential damages. Our total liability shall not exceed the amount paid by you in the 12 months 
              preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use 
              of our services, violation of these terms, or infringement of any rights of another party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved through binding 
              arbitration or the courts of [Your Jurisdiction].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these terms from time to time. Material changes will be communicated via email or website 
              notice at least 30 days before taking effect. Continued use of our services constitutes acceptance of updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these terms or our services:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@aichatbotsolutions.io</p>
              <p className="text-gray-700 mb-2"><strong>Support:</strong> hello@aichatbotsolutions.io</p>
              <p className="text-gray-700"><strong>Address:</strong> AI Chatbot Solutions, [Your Business Address]</p>
            </div>
          </section>

          <div className="bg-brand-blue/10 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-brand-blue mb-2">BotPenguin Partnership</h3>
            <p className="text-gray-700 text-sm">
              As a BotPenguin partner, your use of the chatbot platform is also subject to BotPenguin's Terms of Service. 
              Please review their terms at <a href="https://botpenguin.com/terms" className="text-brand-blue underline" target="_blank" rel="noopener noreferrer">botpenguin.com/terms</a> 
              for complete understanding of your rights and obligations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}