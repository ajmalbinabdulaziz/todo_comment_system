import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import { QueryClientProvider, QueryClient } from 'react-query'
import AppStore from '../contexts/TodoContext'


const queryClient = new QueryClient()


function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <AppStore>
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}  >
          <Header />

        <div className='h-screen overflow-y-scroll bg-slate-200'>
          <Component {...pageProps} />
        </div>
        
      </SessionProvider>  
    </QueryClientProvider>
    </AppStore>
  )
}

export default MyApp
