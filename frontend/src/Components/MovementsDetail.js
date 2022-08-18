import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoaderView } from './Loader/Loader';
import { useDeleteMovement, useMovementsData } from './Utils/useMovementsData';

export const MovementsDetail = () => {
  const navigate = useNavigate()
  let { id } = useParams();
  id = parseInt(id);

  const { mutate } = useDeleteMovement()

  const { isLoading, data } = useMovementsData()
  if (isLoading) {
    return <LoaderView />
  }

  if (!localStorage.getItem('TOKEN')) {
    navigate('/')
  }

  const movement = data.data.body.movements.filter(movement => movement.id === id)[0]
  movement.date = movement.date.split('T')[0].split('-').reverse().join('/')
  return (

    <div className='bg-violet-200 min-h-screen container mx-auto flex flex-col mt-4 items-center'>
      <h1 className='text-center text-2xl text-white my-4'>{movement.concept}</h1>
      <p>{movement.amount}</p>
      <p>{movement.Category.name}</p>
      <p>{movement.date}</p>
      <Link to={`/editMovement/${id}`}>
        <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Edit</button>
      </Link>

      <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" onClick={() => mutate(id)}>Delete</button>

      <Link to='/movements'>
        <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Back</button>
      </Link>
    </div>
  )
}
