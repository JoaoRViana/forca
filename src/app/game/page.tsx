'use client'

import { useEffect, useState } from "react";
import { getWord } from "./helpers";
import Link from "next/link";

export default function Game(){
    const [word,setWord] = useState<Array<string>>([])
    const [correctLetters,setCorrectLetters] = useState<Array<string>>([])
    const [victory,setVictory] = useState<boolean>(false)
    const [loose,setLoose] = useState<boolean>(false)
    const [attempts,setAttempts] = useState<number>(7)
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
        }else{
            const currentAttempts = attempts-1
            if(currentAttempts<1){
                console.log('a')
                setLoose(true)
            }
            setAttempts((attempts-1))
        }

    }
    return(
        <div className="bg-slate-400 min-h-screen" onMouseOver={(e)=>{
            const input = document.getElementById('forcaInput')
            input?.focus()
        }}>
            <h2>
                Tentivas Restantes:{attempts}
            </h2>
            <div>
            {victory?<div>
                <Link href={'/'}>Home</Link>
                <h2>Parabéns você ganhou!!</h2>
            </div>:''}
        </div>
            {loose?<div>
                <Link href={'/'}>Home</Link>
                <div>
                    <h2>Você perdeu a palavra era {word}</h2>
                </div>
            </div>:  <div>
            <input className="text-black w-0" id="forcaInput" maxLength={1} onChange={(e)=>{
                verifyLetter(e.target.value)
                const input = document.getElementById('forcaInput')
                if(input){
                    input.value =''
                }
            }}></input>
            </div>}
            <div className="flex flex-wrap">
                {word.map((e,i)=>(
                    <h2 key={i} id={`letter${i}`} className="text-2xl mx-2">_</h2>
                ))}
            </div>
        </div>
    )
}