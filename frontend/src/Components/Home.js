import { LoaderView } from './Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { MovementsTable } from './MovementsTable'
import { useState } from 'react'
import { useMovementsData } from './Utils/useMovementsData'
import { getBalance } from './Utils/getBalance'
import { MovementsHomeTable } from './MovementsHomeTable'

export const Home = () => {

  const navigate = useNavigate()

  let balance = 0


  const { isLoading, data, isSuccess } = useMovementsData()

  if (isLoading) {
    return <LoaderView />
  }

  if (!localStorage.getItem('TOKEN')) {
    navigate('/')
  }
  if (isSuccess) {
    balance = getBalance(data)
    return (
      <div className='bg-violet-200 min-h-screen container mx-auto flex flex-col'>
        <h1 className='text-center text-2xl text-white my-4'>Welcome</h1>
        <Link to='/movements'>
          <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Movements</button>
        </Link>
        <Link to='/categories'>
          <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Categories</button>
        </Link>
        {/* <div className='flex h-12 align-middle'>
          <button className={`capitalize px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent ${(filter === "all") && "bg-purple-600 text-white"}`} onClick={setMovementFilterFn}>all</button>
          <button className={`capitalize px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent ${(filter === "income") && "bg-purple-600 text-white"}`} onClick={setMovementFilterFn}>income</button>
          <button className={`capitalize px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent ${(filter === "expenses") && "bg-purple-600 text-white"}`} onClick={setMovementFilterFn}>expenses</button>
        </div> */}
        <p className='text-center mt-4'>balance: {balance}</p>
        <MovementsHomeTable data={data} />
      </div>
    )
  }

}

