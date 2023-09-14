'use client'
import Link from "next/link";
import {  useAppSelector } from "./redux/store"

export default function Home() {
  const theme = useAppSelector((state)=> state.changeReducer.value)

  return (
    <div className={`flex flex-col items-center ${theme.background} min-h-screen  z-1`}>
      <div className='self-center my-36'>
        <Link href={'/game'}>
        <button className={`text-2xl  bg-blue-500 hover:bg-blue-400 ${theme.textGame} font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded`}>
            Jogar
          </button></Link>

      </div>
    </div>
  )
}
