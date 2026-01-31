export async function register() {
  // 只在服务端运行
  if (typeof window === 'undefined') {
    const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY
    if (proxyUrl) {
      try {
        // 动态导入 undici 避免 Turbopack 兼容性问题
        const { ProxyAgent, setGlobalDispatcher } = await import('undici')
        console.log(`[Instrumentation] Setting global proxy: ${proxyUrl}`)
        const dispatcher = new ProxyAgent({
          uri: proxyUrl,
          connectTimeout: 30000,
        })
        setGlobalDispatcher(dispatcher)
      } catch (error) {
        console.error('[Instrumentation] Failed to set proxy:', error)
      }
    }
  }
}
