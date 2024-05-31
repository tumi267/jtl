import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import UserProvider from './context/context'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        <Nav/>   
        {children}
        {/* <Footer/> */}
        </UserProvider>
        </body>
        
    </html>
  )
}
