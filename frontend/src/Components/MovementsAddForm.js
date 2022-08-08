import { Formik, Form, } from 'formik';
import { Link, useHref, useNavigate } from 'react-router-dom';
import { date, number, object, string } from 'yup';
import { TextInput } from './TextInput';
import { useContext, useRef, useState } from 'react';
import { UIContext } from './Context/UIContext';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from './AxiosClient';
import { LoaderView } from './Loader/Loader';
import { useCategoriesData } from './Utils/useCategoriesData';

const schema = object().shape({
  concept: string().required('Please enter the concept'),
  amount: string().required('Please enter the amount'),
  // category: string().required('Please enter the category'),
  date: date().required('Please enter the date'),
  type: string().required(),
});


export const MovementsAddForm = () => {
  const { loading, setLoading } = useContext(UIContext);
  const [type, setType] = useState('expenses');
  const navigate = useNavigate();
  let categories
  const select = useRef(null)
  const movement = useMutation((values) => postRequest('movement', values));
  const { isLoading, isError, data, isSuccess } = useCategoriesData()
  if (movement.isSuccess) {

  }
  if (movement.error && (movement.error.response.status === 400 || movement.error.response.status === 409)) {
    Swal.fire({
      title: 'Error',
      text: movement.error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    },
      () => {
        window.location.reload();
      }
    )
  }
  if (isLoading) {
    return <LoaderView />
  }
  if (isError) {
    console.log(isError)
  }
  if (isError && !localStorage.getItem('TOKEN')) {
    navigate('/login')
  }
  if (isSuccess) {
    categories = data.data.body.categories
  }
  const typeOfCategory = categories.filter(movement => {
    if (type === 'income') {
      return movement.Type.name === 'income'
    }
    if (type === 'expenses') {
      return movement.Type.name === 'expenses'
    }
    return true
  })

  return (
    <div className='bg-violet-200 min-h-screen container mx-auto flex flex-col'>
      <h1 className='text-center text-2xl text-white my-4'>Movements</h1>
      {loading ? <LoaderView /> : null}
      <button className={`px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent ${(type === "expenses") && "bg-purple-600 text-white"}`} onClick={() => {
        setType('expenses')
      }}>Expenses </button>
      <button className={`px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent ${(type === "income") && "bg-purple-600 text-white"}`} onClick={() => {
        setType('income')
      }}>Income </button>
      <Formik
        initialValues={{ concept: '', amount: '', category: '', date: '', type: type }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          values.category = select.current.value
          console.log(values)
          setLoading(true);
          movement.mutate(values);
          setSubmitting(false);
          setLoading(false)
          navigate(-1)
        }
        }
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col mt-4 justify-around items-center'>
            <TextInput name='concept' placeholder='Concept' />
            <TextInput name='amount' type='number' placeholder='Amount' />
            <select ref={select} className='text-input max-w-lg mt-5 rounded-lg px-1 py-0.5' name="select" placeholder='select'>
              {typeOfCategory.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}

            </select>
            <Link to='/addCategory'>
              <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Add Category</button>
            </Link>
            <TextInput name='date' type='date' placeholder='Date' />

            <button type='submit' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full my-4' disabled={isSubmitting}>Add</button>
          </Form>
        )}
      </Formik>
      <Link to='/movements'>
        <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Cancel</button>
      </Link>
    </div>

  )
}