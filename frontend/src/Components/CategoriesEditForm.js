import { Formik, Form, } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { TextInput } from './TextInput';
import { useCategoriesData, useUpdateCategory } from './Utils/useCategoriesData';

const schema = object().shape({
  name: string().required('Please enter your category name'),
});

export const CategoriesEditForm = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  id = parseInt(id);

  const { mutate } = useUpdateCategory();

  const { data } = useCategoriesData()
  const category = data.data.body.categories.filter(category => category.id === id)[0]


  if (!localStorage.getItem('TOKEN')) {
    navigate('/login')
  }

  return (
    <div className='bg-orange-200 min-h-screen container mx-auto flex flex-col'>
      <h1 className='text-center text-2xl text-white my-4'>Categories</h1>
      <Formik
        initialValues={{ name: category.name }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          values.type = category.Type.name
          values.id = id
          mutate(values);
          setSubmitting(false);
        }
        }
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col mt-4 justify-around items-center'>
            <TextInput name='name' label='name' />

            <button type='submit' className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full my-4' disabled={isSubmitting}>Update</button>
          </Form>
        )}
      </Formik>
      <Link to='/categories'>
        <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Cancel</button>
      </Link>
    </div>
  )

}
