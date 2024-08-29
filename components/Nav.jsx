"use client";

import Link from 'next/link';  // used for routing
import Image from 'next/image'; // optimizes images
import { useState, useEffect } from 'react';  // import react hooks
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';  // import from next-auth for authentication

const Nav = () => {

  // we can use the nextauth hook - "useSession" to get the current user data
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  // state for menu dropdown in mobile view
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect( () => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  }, [] ) // only runs once when the component is rendered


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt="Promptly logo" width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptly</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {/* check if user is logged in */}
        { session?.user ? (

          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Prompt
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile'/>
            </Link>

          </div>
        ) : (
          <>

            {/* check if we have access to providers */}
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                Sign In
              </button>
            ))}

          </>
        )}
      </div>


      {/* Mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (

          <div className='flex'>
            <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile'
            onClick={() => {
              setToggleDropdown( (prev) => !prev);
            }}/>

            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>

                <button type='button' onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className='mt-5 w-full black_btn'>
                  Sign Out
                </button>
              </div>
            )}
          </div>

        ) : (
          <>
            {/* check if we have access to providers */}
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                Sign In
              </button>
            ))}
          </>
        )}
      </div>


    </nav>
  )
}

export default Nav;