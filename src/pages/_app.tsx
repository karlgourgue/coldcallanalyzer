import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#2d2d3a',
            color: '#fff',
            borderRadius: '0.5rem',
          },
        }}
      />
    </>
  )
} 