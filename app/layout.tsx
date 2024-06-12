import Sidebar from '@/components/sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import SupabaseProvider from '@/providers/supabase-provider'
import UserProvider from '@/providers/user-provider'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/player'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spootify',
  description: 'Music for some people.',
}

// Don't cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
