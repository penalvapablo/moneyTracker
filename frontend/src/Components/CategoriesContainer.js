import { LoaderView } from './Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CategoriesTable } from './CategoriesTable'
import { useCategoriesData } from './Utils/useCategoriesData'



export const CategoriesContainer = () => {
  const [type, setType] = useState("expenses")
  const navigate = useNavigate()
  const { isLoading, isError, data, isSuccess } = useCategoriesData()

  if (isLoading) {
    return <LoaderView />
  }
  if (isError) {
    console.log(isError)
  }
  if (isError && !localStorage.getItem('TOKEN')) {
    navigate('/')
  }
  if (isSuccess) {


    return (
      <div className='bg-orange-200 min-h-screen container mx-auto flex flex-col'>
        <h1 className='text-center text-2xl text-white my-4'>Categories</h1>
        <Link to='/movements'>
          <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Movements</button>
        </Link>
        <Link to='/addCategory'>
          <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Add Category</button>
        </Link>
        <button className={`px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent ${(type === "income") && "bg-purple-600 text-white"}`} onClick={() => {
          setType('income')
        }}>Income </button>
        <button className={`px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent ${(type === "expenses") && "bg-purple-600 text-white"}`} onClick={() => {
          setType('expenses')
        }}>Expenses </button>
        <CategoriesTable data={data} type={type} />
      </div>

    )
  }
}
