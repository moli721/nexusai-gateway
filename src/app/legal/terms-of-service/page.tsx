import { LegalLayout } from "@/components/legal/legal-layout"

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="January 31, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          By accessing or using NexusAI services, you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          2. Description of Service
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          NexusAI provides an API gateway service that enables access to various AI models through
          a unified interface. We reserve the right to modify, suspend, or discontinue any aspect
          of the service at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          3. User Accounts
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          To use our services, you must:
        </p>
        <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
          <li>Create an account with accurate information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>Be responsible for all activities under your account</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          4. Acceptable Use
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          You agree not to use our services to:
        </p>
        <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights</li>
          <li>Transmit harmful, offensive, or illegal content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          5. API Usage and Rate Limits
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Your use of the API is subject to rate limits and usage quotas based on your subscription
          plan. Exceeding these limits may result in temporary suspension or additional charges.
          We reserve the right to modify rate limits at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          6. Payment Terms
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Paid services are billed in advance on a monthly or annual basis. All fees are
          non-refundable except as required by law. We reserve the right to change pricing
          with 30 days notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          To the maximum extent permitted by law, NexusAI shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages resulting from your use of
          or inability to use the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          8. Termination
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          We may terminate or suspend your account at any time for violations of these terms.
          You may terminate your account at any time by contacting support. Upon termination,
          your right to use the service will immediately cease.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          9. Contact
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          For questions about these Terms of Service, please contact us at{" "}
          <a href="mailto:legal@nexusai.dev" className="text-blue-600 dark:text-blue-400 hover:underline">
            legal@nexusai.dev
          </a>
        </p>
      </section>
    </LegalLayout>
  )
}
