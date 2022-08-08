import { Formik, Form, } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { TextInput } from './TextInput';
import { useContext } from 'react';
import { UIContext } from './Context/UIContext';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from './AxiosClient';
import { LoaderView } from './Loader/Loader';

const schema = object().shape({
  name: string().required('Please enter your category name'),
  type: string().required(),
});

export const CategoriesAddForm = () => {
  const { loading, setLoading } = useContext(UIContext);
  const navigate = useNavigate();

  const category = useMutation((values) => postRequest('category', values));
  if (category.isError) {
    Swal.fire({
      title: 'Error',
      text: category.error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    },
      () => {
        window.location.reload();
      }
    )
  }
  if (category.error && category.error.response.status === 400) {
    Swal.fire({
      title: 'Error',
      text: category.error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    },
      () => {
        window.location.reload();
      }
    )
  }
  if (category.error && category.error.response.status === 409) {
    Swal.fire({
      title: 'Error',
      text: category.error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    },
      () => {
        window.location.reload();
      }
    )
  }


  return (
    <div className='bg-orange-200 min-h-screen container mx-auto flex flex-col'>
      <h1 className='text-center text-2xl text-white my-4'>Categories</h1>
      {loading ? <LoaderView /> : null}
      <Formik
        initialValues={{ name: '', type: 'expenses' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setLoading(true);
          category.mutate(values);
          setLoading(false);
          setSubmitting(false);
          navigate(-1)
        }
        }
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col mt-4 justify-around items-center'>
            <TextInput name='name' label='name' />
            <select className='text-input max-w-lg mt-5 rounded-lg px-1 py-0.5'>
              <option value='expenses'>Expenses</option>
              <option value='income'>Income</option>
            </select>

            <button type='submit' className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full my-4' disabled={isSubmitting}>Add</button>
          </Form>
        )}
      </Formik>
      <Link to='/categories'>
        <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Cancel</button>
      </Link>
    </div>
  )
}
