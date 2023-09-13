import { ReactNode } from 'react'
import '../globals.css'

interface GameLayoutProps{
  children:ReactNode
}

export default function GameLayout({children}:GameLayoutProps){
  return(
    <div>
      {children}
    </div>
  )
}