export const getWord = async():Promise<String>=>{
    const api  = await fetch('https://api.dicionario-aberto.net/random',{
        cache:'no-cache'
    });
    const data  =await api.json();
    return data.word
}