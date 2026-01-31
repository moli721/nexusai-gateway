import { LegalLayout } from "@/components/legal/legal-layout"

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 31, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          1. Information We Collect
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          We collect information you provide directly to us, such as when you create an account,
          use our services, or contact us for support. This may include:
        </p>
        <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
          <li>Account information (name, email address, username)</li>
          <li>Usage data and API call logs</li>
          <li>Payment information (processed securely by our payment providers)</li>
          <li>Communications you send to us</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze trends, usage, and activities</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          3. Information Sharing
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          We do not sell, trade, or otherwise transfer your personal information to third parties
          without your consent, except as described in this policy or as required by law. We may
          share information with service providers who assist us in operating our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          4. Data Security
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction. However,
          no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          5. Your Rights
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
          <li>Access and receive a copy of your personal data</li>
          <li>Rectify inaccurate personal data</li>
          <li>Request deletion of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Data portability</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          6. Contact Us
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@nexusai.dev" className="text-blue-600 dark:text-blue-400 hover:underline">
            privacy@nexusai.dev
          </a>
        </p>
      </section>
    </LegalLayout>
  )
}
