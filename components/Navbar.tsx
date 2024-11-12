import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import LoginButton from './ui/login-button'

const Navbar = async () => {

    const session = await auth()

    return (
        <header className='px-5 py-3 bg-white shadown-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/">
                    <Image src="/logo.png" alt='logo' height={30} width={144} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type='submit'>Logout</button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <Link href="/login">
                            <LoginButton>
                                <span>Login</span>
                            </LoginButton>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar

