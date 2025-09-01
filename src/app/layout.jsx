import { Inter } from 'next/font/google'
import '../index.css'
import { Header } from '../components/Header.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'No Background - Remove Image Backgrounds',
  description: 'Remove backgrounds from images easily and quickly',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
