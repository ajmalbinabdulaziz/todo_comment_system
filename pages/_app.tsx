import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'


function MyApp({ Component, pageProps: {session, ...pageProps} }: any) {
  return (
    <SessionProvider session={session}  >
      <div className='h-screen overflow-y-scroll bg-slate-200'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>  
  )
}

export default MyApp
