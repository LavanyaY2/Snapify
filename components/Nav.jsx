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
        <svg class="h-8 w-8 text-fuchsia-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="13" r="3" />  <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />  <line x1="15" y1="6" x2="21" y2="6" />  <line x1="18" y1="3" x2="18" y2="9" /></svg>
        <p className='logo_text'>Snapify</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {/* check if user is logged in */}
        { session?.user ? (

          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
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
                  Create Post
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