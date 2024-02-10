import { useCounter } from "../context/TimerContext";

function Home() {
  const{ 
    count,
    step,
    addCountByOne,
    decreaseCountByOne,
    restCount,
    decreaseCountByValue,
    addCountByValue,
    decreaseStepByOne,
    addStepByOne
  
  } = useCounter();

  return (
    <div className=' text-white flex-col flex gap-3  bg-black h-screen w-full justify-center items-center'>
      <div className=" flex flex-row justify-center gap-4 items-center">
        <span>
        <button className=" p-4 text-black bg-white  h-fit text-2xl font-bold" onClick={addCountByOne}>+</button>
        </span>
        <span  className="  ">{count}</span>
        <span>
        <button className=" p-4 text-black bg-white  h-fit text-2xl font-bold" onClick={decreaseCountByOne}>-</button>
        </span>
      </div>

      <div className=" flex flex-row justify-center gap-2 items-center">
        <span>
        <button className=" p-4 text-black bg-white  h-fit text-2xl font-bold" onClick={()=>addCountByValue(step)}>+</button>
        </span>
     
        <span>
        <button className=" p-4 text-black bg-white  h-fit text-2xl font-bold" onClick={()=>decreaseCountByValue(step)}>-</button>
        </span>
      </div>
      <div className=" flex flex-row justify-center gap-4 items-center">
        <span>
        <button className=" p-4 text-black bg-white  h-fit text-2xl font-bold" onClick={addStepByOne}>+</button>
        </span>
        <span  className="  ">{step}</span>
        <span>
        <button className=" p-4 text-black bg-white  h-fit text-2xl font-bold" onClick={decreaseStepByOne}>-</button>
        </span>
      </div>
      <span>
        <button className=" p-4 text-black bg-white  h-fit text-2xl font-bold" onClick={restCount}>Rest</button>
        </span>   
    </div>
  )
}

export default Home
