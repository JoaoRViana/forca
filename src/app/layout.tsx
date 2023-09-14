import './globals.css'
import { ReactNode } from 'react';
import { Providers } from './redux/provider';
import Header from './header';

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
      <body>
        <Providers>
          <Header/>
          {children}
        </Providers>
       </body>
    </html>
  )
}
