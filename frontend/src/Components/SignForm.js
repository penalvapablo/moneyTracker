import { Formik, Form, } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { object, string } from 'yup';
import { TextInput } from './TextInput';
import { useContext } from 'react';
import { UIContext } from './Context/UIContext';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from './AxiosClient';
import { LoaderView } from './Loader/Loader';

const schema = object().shape({
  email: string().email('must be a valid email').required('Please enter your email'),
  password: string().required('Please enter your password'),
});

export const SignForm = () => {
  const { loading, setLoading } = useContext(UIContext);

  const register = useMutation((values) => postRequest('user/register', values));
  if (register.isSuccess) {

    localStorage.setItem('TOKEN', register.data.data.body.token);
    window.location.reload();
  }
  if (register.error && register.error.response.status === 400) {
    console.log(register.error)
    Swal.fire({
      title: 'Error',
      text: register.error.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    },
      () => {
        window.location.reload();
      }
    )
  }
  if (register.error && register.error.response.status === 409) {
    console.log(register.error)
    Swal.fire({
      title: 'Error',
      text: register.error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    }
    ).then(() => {
      window.location.reload()
    })
  }

  if (localStorage.getItem('TOKEN')) {
    return <Navigate to="/home" />
  }

  return (
    <>
      {loading ? <LoaderView /> : null}
      <div className='bg-violet-200 h-screen container mx-auto flex flex-col justify-center'>
        <div className=''>
          <h1 className='text-center text-2xl text-white'>Sign In</h1>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }
            }
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              setLoading(true)
              register.mutate(values)
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className='flex flex-col mt-4 justify-around items-center'>
                <TextInput name='firstName' placeholder='name' />
                <TextInput name='lastName' placeholder='last name' />
                <TextInput name='email' placeholder='email' />
                <TextInput name='password' type='password' placeholder='password' />

                <button className='px-4 py-1 mt-5 text-sm bg-white  font-semibold rounded-full border' type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/'>
            <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Login</button>
          </Link>
        </div>
      </div>
    </>
  )

}
