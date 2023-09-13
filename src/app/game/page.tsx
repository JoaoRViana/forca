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
        console.log(word,correctLetters)
        const normalizedWord = word.map(letter =>
            letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          );
         console.log(normalizedWord)
         console.log(normalizedWord.join('').includes(e))
        if(normalizedWord.join('').includes(e)){
            normalizedWord.forEach((l,i)=>{
                if(l===e){
                    const letter = document.getElementById(`letter${i}`)
                    const newLetters=  correctLetters
                    newLetters[i] = word[i]
                    setCorrectLetters(newLetters)
                    if(letter){
                        letter.innerHTML = word[i]
                    }
                }
            })
            if(word.join('') === correctLetters.join('')){
                setVictory(true)
            }
        }
        
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