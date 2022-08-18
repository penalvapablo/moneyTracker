import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoaderView } from './Loader/Loader';
import { useCategoriesData, useDeleteCategory } from './Utils/useCategoriesData';

export const CategoriesDetail = () => {
  const navigate = useNavigate()
  let { id } = useParams();
  id = parseInt(id);

  const { mutate } = useDeleteCategory()

  const { isLoading, data, isSuccess } = useCategoriesData()
  if (isLoading) {
    return <LoaderView />
  }

  if (!localStorage.getItem('TOKEN')) {
    navigate('/')
  }
  if (isSuccess) {
    const category = data.data.body.categories.filter(category => category.id === id)[0]


    return (

      <div className='bg-violet-200 min-h-screen container mx-auto flex flex-col mt-4 items-center'>
        <h1 className='text-center text-2xl text-white my-4'>{category.name}</h1>

        <Link to={`/editCategory/${id}`}>
          <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Edit</button>
        </Link>

        <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" onClick={() => mutate(id)}>Delete</button>

        <Link to='/categories'>
          <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Back</button>
        </Link>
      </div>
    )
  }
}