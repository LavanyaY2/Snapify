"use client";

// All the providers go in the layout component - will be used everywhere in the app that way
// so essentially wrap everything in the layout body with the provider

// for authentication
import { SessionProvider } from 'next-auth/react';

// the "session provider" is a higher-order component and thus, other components will be wrapped in this

const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider