'use client'

import { useEffect, useState } from "react";
import { getWord } from "./helpers";
import Link from "next/link";

export default function Game(){
    const [word,setWord] = useState<Array<string>>([])
    const [correctLetters,setCorrectLetters] = useState<Array<string>>([])
    const [victory,setVictory] = useState<boolean>(false)
    const getAndSetWord = async():Promise<void>=>{
        const string =(await getWord()).split('')
        setWord(string)
        string.forEach((e)=>{
            correctLetters.push('_')
        })
    }
    useEffect(()=>{
        getAndSetWord()
    },[])

    const verifyLetter = (e:string) =>{
        if(word.join('').includes(e)){
            word.forEach((l,i)=>{
                if(l===e){
                    const letter = document.getElementById(`letter${i}`)
                    const newLetters=  correctLetters
                    newLetters[i] = e
                    setCorrectLetters(newLetters)
                    if(letter){
                        letter.innerHTML = e
                    }
                }

            })
            if(word.join('') === correctLetters.join('')){
                setVictory(true)
            }
        }
        console.log(word,correctLetters)
    }
    return(
        <div className="bg-slate-400 min-h-screen" onMouseOver={(e)=>{
            const input = document.getElementById('forcaInput')
            input?.focus()
        }}><div>
            {victory?<Link href={'/'}>Home</Link>:''}
        </div>
            <div>
            <input className="text-black" id="forcaInput" maxLength={1} onChange={(e)=>{
                verifyLetter(e.target.value)
                console.log(victory)
                const input = document.getElementById('forcaInput')
                if(input){
                    input.value =''
                }
            }}></input>
            </div>

            <div className="flex flex-wrap">
                {word.map((e,i)=>(
                    <h2 key={i} id={`letter${i}`} className="text-2xl mx-2">_</h2>
                ))}
            </div>
        </div>
    )
}