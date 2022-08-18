import { Formik, Form, } from 'formik';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { date, object, string } from 'yup';
import { TextInput } from './TextInput';
import { orderCategoriesForUpdate } from './Utils/orderCategories';
import { useCategoriesData } from './Utils/useCategoriesData';
import { useMovementsData, useUpdateMovement } from './Utils/useMovementsData';

const schema = object().shape({
  concept: string().required('Please enter the concept'),
  amount: string().required('Please enter the amount'),
  category: string(),
  date: date().required('Please enter the date'),
});

export const MovementsEditForm = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem('TOKEN')) {
    navigate('/login')
  }
  const select = useRef(null)

  let { id } = useParams();
  id = parseInt(id);


  const { mutate } = useUpdateMovement();

  let { data: movement, isSuccess } = useMovementsData()
  let { data: categories, isSuccess: isSuccess2 } = useCategoriesData()

  if (isSuccess) {
    movement = movement.data.body.movements.find(movement => movement.id === id)
    // cuando se carga el componenente, el date ya viene modificado de antes. Pero si hacés refresh, el date viene en el formato de la base de datos.
    if (movement.date.includes('T')) {
      movement.date = movement.date.split('T')[0]
    }
    movement.date = movement.date.split('/').reverse().join('-')


    let categoriesFiltered
    if (isSuccess2) {
      categories = categories.data.body.categories
      categoriesFiltered = categories.filter(category => {
        if (movement.Type.name === category.Type.name) {
          return category
        }
        return false
      }
      )

      categoriesFiltered = orderCategoriesForUpdate(categoriesFiltered, movement)

      return (
        <div className='bg-violet-200 min-h-screen container mx-auto flex flex-col'>
          {/* <h1 className='text-center text-2xl text-white my-4'>{movement}</h1> */}

          <Formik
            initialValues={{ concept: movement.concept, amount: movement.amount, category: movement.category, date: movement.date }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {

              values.category = select.current.value
              values.date = new Date(values.date).toISOString().split('T')[0]
              values.type = movement.Type.name
              values.id = id

              mutate(values);
              setSubmitting(false);
            }
            }
          >
            {({ isSubmitting }) => (
              <Form className='flex flex-col mt-4 justify-around items-center'>
                <select ref={select} className='text-input max-w-lg mt-5 rounded-lg px-1 py-0.5' name="select" defaultValue={movement.category}>
                  {categoriesFiltered.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}

                </select>
                <Link to='/addCategory'>
                  <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Add Category</button>
                </Link>
                <TextInput name='concept' placeholder='Concept' />
                <TextInput name='amount' type='number' placeholder='Amount' />


                <TextInput name='date' type='date' placeholder='Date' />

                <button type='submit' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full my-4' disabled={isSubmitting}>Update</button>
              </Form>
            )}
          </Formik>
          <Link to='/movements'>
            <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Cancel</button>
          </Link>
        </div>
      )
    }
  }
}