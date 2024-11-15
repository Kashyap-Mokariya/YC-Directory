import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import LoginButton from './ui/login-button'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='size-6 mt-0.5 sm:hidden' />
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type='submit'>
                                    <span className='max-sm:hidden text-red-500'>Logout</span>
                                    <LogOut className='size-6 mt-[8px] sm:hidden text-red-500' />
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                    <AvatarFallback>
                                        AV
                                    </AvatarFallback>
                                </Avatar>
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

