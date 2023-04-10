import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'



const Header = () => {

    const { data: session } = useSession()
    return (
        <header className="flex justify-between p-5 max-w-5xl mx-auto">
            <div className="flex items-centre space-x-5">
                <Link href="/">
                    <img className="w-44 object-contain cursor-pointer" src=" https://links.papareact.com/yvf" alt="medium icon" />
                </Link>
                
                <div className="hidden md:inline-flex items-center space-x-5">
                    <Link href="/posts/SuperHeroes" >
                        <h3 className='cursor-pointer'>PostPage</h3>
                    </Link>
                    <Link href="/"><h3 className='cursor-pointer'>HomePage</h3></Link>
                    <h3 className="text-white bg-green bg-green-600 px-4 py-1 rounded-full">Follow</h3>
                </div>
            </div>

            <div className="flex items-center space-x-5 text-green-600">
                {session ? (
                    <div className='flex space-x-4 '>
                        <h3 className='text-blue-600 py-1'> Signed in as {session.user.name}</h3>
                        <div className="border rounded-full border-red-600 px-4 py-1 cursor-pointer" onClick={() => signOut()}>Sign out</div>
                    </div>
                ) : (
                    <div>
                        <div className="border rounded-full border-green-600 px-4 py-1 cursor-pointer" onClick={() => signIn()}>Sign in</div>
                    </div>
                )}
            </div>    
        </header>

        )
  
}

export default Header

