import type { Metadata } from "next"
import { Inter, Instrument_Serif, Manrope, Rubik, Cabin } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "600",
})

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: "700",
})

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: "600",
})

export const metadata: Metadata = {
  title: "NexusAI - Professional AI API Gateway",
  description: "Seamless access to AI models with enterprise-grade reliability. Access Claude, GPT, Gemini and more through a single, unified API.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${manrope.variable} ${rubik.variable} ${cabin.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
