'use client'

import Link from "next/link"
import { change } from "./redux/features/changeTheme"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./redux/store"
import {  useAppSelector } from "./redux/store"


export default function Header(){
    const dispatch = useDispatch<AppDispatch>();
    const theme = useAppSelector((state)=> state.changeReducer.value)

    return(
        <div className={`w-full flex flex-wrap justify-center ${theme.background} absolute z-2`}>
        <div className='p-6 w-1/2 flex flex-wrap max-[400px]:justify-center justify-between text-center items-center'>
        <button className={`text-[30px] ${theme.textButton} font-bold`} onClick={()=>{
            dispatch(change())
        }}>Forca</button>
          <Link href={'/'}><button className={`text-xl  bg-green-500 hover:bg-green-400 ${theme.textButton} font-bold py-1 px-2 border-b-4 border-green-700 hover:border-green-500 rounded`}>
            Home</button></Link>
        </div>
        </div>
    )
}