
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'

import {Container, SSRProvider} from '@/components/bootstrap'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next App Router Tutorial',
  description: 'News Gallery Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <NavBar/>
          <main>
            <Container className='py-4'>
              {children}
            </Container>
          </main>
        </SSRProvider>
        
        </body>
    </html>
  )
}
