import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className='self-center my-36'>
        <Link href={'/game'}>
        <button className='text-2xl  bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
            Jogar
          </button></Link>

      </div>
    </div>
  )
}
