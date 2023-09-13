import { getWord } from "./helpers";

export default async function Game(){

    const getAndSetWord = async():Promise<String>=>{
        const string = await getWord()
        return string
    }
    const word = await getAndSetWord()
    return(
        <div className="bg-slate-400 min-h-screen">
            <h2>{word}</h2>
        </div>
    )
}