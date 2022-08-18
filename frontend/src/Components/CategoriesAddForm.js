import { Formik, Form, } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { TextInput } from './TextInput';
import { useRef } from 'react';
import { useAddCategories } from './Utils/useCategoriesData';

const schema = object().shape({
  name: string().required('Please enter your category name'),
  type: string().required(),
});

export const CategoriesAddForm = () => {
  const navigate = useNavigate();
  const typeSelected = useRef(null)

  const { mutate } = useAddCategories();

  if (!localStorage.getItem('TOKEN')) {
    navigate('/login')
  }

  return (
    <div className='bg-orange-200 min-h-screen container mx-auto flex flex-col'>
      <h1 className='text-center text-2xl text-white my-4'>Categories</h1>
      <Formik
        initialValues={{ name: '', type: 'expenses' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          values.type = typeSelected.current.value
          mutate(values);
          setSubmitting(false);
        }
        }
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col mt-4 justify-around items-center'>
            <TextInput name='name' label='name' />
            <select ref={typeSelected} className='text-input max-w-lg mt-5 rounded-lg px-1 py-0.5'>
              <option value='expenses'>Expenses</option>
              <option value='income'>Income</option>
            </select>

            <button type='submit' className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full my-4' disabled={isSubmitting}>Add</button>
          </Form>
        )}
      </Formik>
      {/* <Link to='/categories'> */}
      <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" onClick={() => navigate(-1)}>Cancel</button>
      {/* </Link> */}
    </div>
  )
}
