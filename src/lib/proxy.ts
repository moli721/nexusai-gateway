import { ProxyAgent, fetch as undiciFetch, type RequestInit as UndiciRequestInit } from 'undici'

const proxyUrl = process.env.HTTP_PROXY || 'http://127.0.0.1:7890'
const agent = new ProxyAgent(proxyUrl)

export const proxiedFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
  const undiciInit: UndiciRequestInit = {
    ...init,
    dispatcher: agent,
    body: init?.body as UndiciRequestInit['body'],
  }
  return undiciFetch(url, undiciInit) as unknown as Promise<Response>
}
