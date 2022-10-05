import { signIn, signOut, useSession } from 'next-auth/react'
import Header from '../components/Header'

const Home = () => {


  return(
      <div>
        <Header />
        HomePage
      </div>
  ) 
}

export default Home
