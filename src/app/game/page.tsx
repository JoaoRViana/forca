'use client'

import { useEffect, useState } from "react";
import { getWord } from "./helpers";

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
        const input = document.getElementById('forcaInput')
        input?.focus()
    },[])

    const playAgain = () =>{
        document.location.reload()
    }

    const focusInInput=()=>{
        const input = document.getElementById('forcaInput')
        input?.focus()
    }

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
        <div className=" flex flex-col items-center justify-center self-center h-2/3"  onMouseOver={focusInInput}>
            <div className="flex flex-wrap text-2xl text-center my-2 text-black font-bold">
                <h2 className="">
                    Tentivas Restantes:
                </h2>
                <h2 className="text-red-800 mx-2">{attempts}</h2>
            </div>
           
            <div>
            {victory?<div>
                <div className="flex flex-wrap justify-center my-2 text-black font-bold">
                    <button className="text-2xl  text-black font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 bg-yellow-500 hover:bg-yellow-400  rounded" onClick={playAgain}>
                        Jogar Novamente
                    </button>
                </div>
                <h2 className="text-2xl text-center text-green-400 ">Parabéns você ganhou!!</h2>
            </div>:''}
        </div>
            {loose?<div>
                <div className="flex flex-wrap justify-center my-2">
                    <button className="text-2xl  text-black font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 bg-yellow-500 hover:bg-yellow-400  rounded" onClick={playAgain}>
                        Jogar Novamente
                    </button>
                </div>
               
                <div className="text-2xl text-center my-2 text-black font-bold">
                    <h2 className="text-red-600">Você perdeu a palavra era:</h2>
                    <h3 className="text-red-800">{word}</h3>
                </div>
            </div>:  <div>
            <input className="w-0" id="forcaInput" maxLength={1} onChange={(e)=>{
                verifyLetter(e.target.value)
                const input = document.getElementById('forcaInput')
                if(input){
                    //@ts-ignore
                    input.value =''
                }
            }}></input>
            </div>}
            <div className="flex flex-wrap text-black font-bold">
                {word.map((e,i)=>(
                    <h2 key={i} id={`letter${i}`} className="text-2xl mx-2">_</h2>
                ))}
            </div>
            <div className="flex flex-wrap my-2 items-center text-black font-bold">
            <h2>Voltar o foco para as letras {'->'}</h2>
            <button className="w-5 h-5 rounded-full bg-cyan-200 mx-2" onClick={focusInInput}></button>
            </div>
        </div>
    )
}