'use client'

import { useEffect, useState } from "react";
import { getWord } from "./helpers";

export default function Game(){
    const [word,setWord] = useState<Array<string>>([])
    const getAndSetWord = async():Promise<void>=>{
        const string =(await getWord()).split('')
        setWord(string)
    }
    useEffect(()=>{
        getAndSetWord()
    },[])
    const verifyLetter = (e:string) =>{
        console.log(e)
        console.log(word)
        if(word.join('').includes(e)){
            const index = word.indexOf(e);
            const letter = document.getElementById(`letter${index}`)
            if(letter){
                letter.innerHTML = e
            }
        }
    }
    return(
        <div className="bg-slate-400 min-h-screen" onMouseOver={(e)=>{
            const input = document.getElementById('forcaInput')
            input?.focus()
        }}>
            <div>
            <input className="text-black" id="forcaInput" maxLength={1} onChange={(e)=>{
                verifyLetter(e.target.value)
                console.log(e.target.value)
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