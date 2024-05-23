import Sidebar from '@/components/sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/supabase-provider'
import UserProvider from '@/providers/user-provider'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spootify',
  description: 'Music for some people.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
