import { CodeBlock } from "@/components/docs/code-block"

export const metadata = {
  title: "API Reference - NexusAI Documentation",
  description: "Complete API documentation for NexusAI",
}

const endpoints = [
  {
    method: "POST",
    path: "/v1/chat/completions",
    description: "Create a chat completion",
  },
  {
    method: "POST",
    path: "/v1/completions",
    description: "Create a text completion",
  },
  {
    method: "GET",
    path: "/v1/models",
    description: "List available models",
  },
]

const parameters = [
  { name: "model", type: "string", required: true, description: "The model to use (e.g., claude-3-opus, gpt-4o)" },
  { name: "messages", type: "array", required: true, description: "Array of message objects with role and content" },
  { name: "temperature", type: "number", required: false, description: "Sampling temperature (0-2). Default: 1" },
  { name: "max_tokens", type: "integer", required: false, description: "Maximum tokens to generate" },
  { name: "stream", type: "boolean", required: false, description: "Enable streaming responses. Default: false" },
]

export default function ApiReferencePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        API Reference
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        Complete reference for the NexusAI API endpoints and parameters.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Base URL
        </h2>
        <CodeBlock
          code="https://api.nexusai.dev/v1"
          language="text"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Authentication
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          All API requests require an API key in the Authorization header:
        </p>
        <CodeBlock
          code="Authorization: Bearer YOUR_API_KEY"
          language="text"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Endpoints
        </h2>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-50">Method</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-50">Endpoint</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-50">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {endpoints.map((endpoint) => (
                <tr key={endpoint.path}>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-600 dark:text-zinc-400">{endpoint.path}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{endpoint.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Chat Completions
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Create a chat completion with the specified model and messages.
        </p>

        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-3">
          Parameters
        </h3>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-50">Name</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-50">Type</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-50">Required</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-900 dark:text-zinc-50">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {parameters.map((param) => (
                <tr key={param.name}>
                  <td className="px-4 py-3 font-mono text-zinc-900 dark:text-zinc-50">{param.name}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{param.type}</td>
                  <td className="px-4 py-3">
                    {param.required ? (
                      <span className="text-red-600 dark:text-red-400">Yes</span>
                    ) : (
                      <span className="text-zinc-500">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-3">
          Request Example
        </h3>
        <CodeBlock
          code={`curl https://api.nexusai.dev/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-opus",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.7
  }'`}
          language="bash"
          filename="Request"
        />

        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-3 mt-6">
          Response Example
        </h3>
        <CodeBlock
          code={`{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1699000000,
  "model": "claude-3-opus",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 10,
    "total_tokens": 30
  }
}`}
          language="json"
          filename="Response"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Error Codes
        </h2>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <code className="text-sm font-mono text-red-600 dark:text-red-400">401</code>
            <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-3">Invalid or missing API key</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <code className="text-sm font-mono text-red-600 dark:text-red-400">429</code>
            <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-3">Rate limit exceeded</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <code className="text-sm font-mono text-red-600 dark:text-red-400">500</code>
            <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-3">Internal server error</span>
          </div>
        </div>
      </section>
    </div>
  )
}
