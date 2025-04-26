import Head from 'next/head'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'MindScape' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="MindScape - AI Powered Journaling" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Use system fonts instead of trying to load Inter variable font */}
        <style jsx global>{`
          :root {
            --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
                         Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          }
          html {
            font-family: var(--font-sans);
          }
        `}</style>
      </Head>
      {/* ... existing code ... */}
      {children}
      {/* ... existing code ... */}
    </>
  )
} 