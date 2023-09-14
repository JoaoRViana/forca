import './globals.css'
import { ReactNode } from 'react';
import Link from "next/link";

export const metadata = {
  title: 'Forca',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className=' min-h-screen bg-black-400'>
        <div>
          <div className='w-full flex flex-wrap justify-center'>
          <div className='mb-[10%] p-6 mx-2 my-2 w-1/2 flex flex-wrap max-[400px]:justify-center justify-between text-center items-center'>
          <p className='text-[30px] text-white font-bold'>Forca</p>
            <Link href={'/'}><button className='text-xl  bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-2 border-b-4 border-green-700 hover:border-green-500 rounded'>
              Home</button></Link>
          </div>
          </div>
          {children}
        </div></body>
    </html>
  )
}
