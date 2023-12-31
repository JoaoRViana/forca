'use client'

import { useEffect, useState } from "react";
import { getWord } from "./helpers";
import {  useAppSelector } from "../redux/store"

export default function Game(){
    const [word,setWord] = useState<Array<string>>([])
    const [correctLetters,setCorrectLetters] = useState<Array<string>>([])
    const [wrongLetters,setWrongLetters] = useState<Array<String>>([])
    const [victory,setVictory] = useState<boolean>(false)
    const [loose,setLoose] = useState<boolean>(false)
    const [attempts,setAttempts] = useState<number>(7)
    const theme = useAppSelector((state)=> state.changeReducer.value)
    const getAndSetWord = async():Promise<void>=>{
        const string =(await getWord()).split('')
        setWord(string)
        string.forEach((_e)=>{
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
            if(!wrongLetters.join('').includes(e)){
                const currentWrongs = wrongLetters
                currentWrongs.push(e)
                setWrongLetters(currentWrongs)
                const currentAttempts = attempts-1
                if(currentAttempts<1){
                    console.log('a')
                    setLoose(true)
                }
                setAttempts((attempts-1))
            }
        }

    }
    return(
        <div className={`flex flex-col items-center justify-center self-center h-2/3 min-h-screen ${theme.background}  z-1`} onMouseOver={focusInInput}>
            <div className={`flex flex-wrap text-2xl text-center my-2 ${theme.textGame} font-bold`}>
                <h2 className="">
                    Tentivas Restantes:
                </h2>
                <h2 className={`text-${theme.attemptText}-800 mx-2`}>{attempts}</h2>
            </div>
           
            <div>
            {victory?<div>
                <div className={`flex flex-wrap justify-center my-2 ${theme.textGame} font-bold`}>
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
               
                <div className={`text-2xl text-center my-2 ${theme.textGame} font-bold`}>
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
            <div className={`flex flex-wrap ${theme.textGame} font-bold`}>
                {word.map((e,i)=>(
                    <h2 key={i} id={`letter${i}`} className="text-2xl mx-2">_</h2>
                ))}
            </div>
            <div className={`flex flex-wrap my2 items-center text-red-600 font-bold text-xl`}>
                <h2 className="mx-2">Letras Erradas:</h2>
                {wrongLetters.map((e,i)=>(
                    <h2 key={`wrong${i}`}>{e}</h2>
                ))}
            </div>
            <div className={`flex flex-wrap my-2 items-center ${theme.textGame} font-bold`}>
            <h2>Voltar o foco para as letras {'->'}</h2>
            <button className={`w-5 h-5 rounded-full ${theme.circle} mx-2`} onClick={focusInInput}></button>
            </div>
        </div>
    )
}