import { CodeBlock } from "@/components/docs/code-block"

export const metadata = {
  title: "Quick Start - NexusAI Documentation",
  description: "Get started with NexusAI in minutes",
}

export default function QuickStartPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        Quick Start
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        Get up and running with NexusAI in just a few minutes.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          1. Get Your API Key
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Sign up for a NexusAI account and navigate to the Dashboard to create your API key.
        </p>
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-sm text-blue-800 dark:text-blue-200">
          Your API key will only be shown once. Make sure to save it securely.
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          2. Install the SDK
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Install the NexusAI SDK using your preferred package manager:
        </p>
        <CodeBlock
          code="npm install nexusai"
          language="bash"
          filename="Terminal"
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
          Or use yarn: <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">yarn add nexusai</code>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          3. Configure Environment
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Add your API key to your environment variables:
        </p>
        <CodeBlock
          code="NEXUSAI_KEY=your_api_key_here"
          language="env"
          filename=".env.local"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          4. Make Your First Request
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Create a simple chat completion request:
        </p>
        <CodeBlock
          code={`import { NexusAI } from 'nexusai';

const client = new NexusAI({
  apiKey: process.env.NEXUSAI_KEY
});

async function main() {
  const response = await client.chat({
    model: 'claude-3-opus',
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ]
  });

  console.log(response.content);
}

main();`}
          language="typescript"
          filename="index.ts"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          5. Switch Models Easily
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Change the model parameter to use different AI providers:
        </p>
        <CodeBlock
          code={`// Use Claude
const claudeResponse = await client.chat({
  model: 'claude-3-opus',
  messages: [{ role: 'user', content: 'Hello!' }]
});

// Use GPT-4
const gptResponse = await client.chat({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});

// Use Gemini
const geminiResponse = await client.chat({
  model: 'gemini-pro',
  messages: [{ role: 'user', content: 'Hello!' }]
});`}
          language="typescript"
          filename="models.ts"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Next Steps
        </h2>
        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 list-none">
          <li>• Explore the <a href="/docs/api-reference" className="text-blue-600 dark:text-blue-400 hover:underline">API Reference</a> for detailed documentation</li>
          <li>• Check out streaming responses for real-time output</li>
          <li>• Learn about error handling and rate limits</li>
        </ul>
      </section>
    </div>
  )
}
