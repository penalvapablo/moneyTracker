import { Formik, Form } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useContext } from 'react';
import { TextInput } from './TextInput';
import { UIContext } from './Context/UIContext';
import { LoaderView } from './Loader/Loader';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from './axiosClient';

const schema = object().shape({
  email: string().email('must be a valid email').required('Please enter your email'),
  password: string().required('Please enter your password'),
});

export const LoginForm = () => {
  const { loading, setLoading } = useContext(UIContext);

  const login = useMutation((values) => postRequest('user/login', values));
  if (login.isSuccess) {
    localStorage.setItem('TOKEN', login.data.data.body.token);
    window.location.reload();
  }

  if (localStorage.getItem('TOKEN')) {
    return <Navigate to="/movements" />
  }

  return (
    <>
      {loading ? <LoaderView /> : null}
      <div className='bg-violet-200 h-screen container mx-auto flex flex-col justify-center'>
        <div className=''>
          <h1 className='text-center text-2xl text-white'>Login</h1>
          <Formik
            initialValues={{ email: '', password: '' }
            }
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setLoading(true)
              login.mutate(values)
              setSubmitting(false);
            }}
          >

            {({ isSubmitting }) => (
              <Form className='flex flex-col mt-4 justify-around items-center'>
                <TextInput name='email' placeholder='email' />
                <TextInput name='password' type='password' placeholder='password' />
                <button className='px-4 py-1 mt-5 text-sm bg-white  font-semibold rounded-full border' type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <Link to='register'>
            <button className="px-4 py-1 mt-4 text-sm bg-white block my-0 mx-auto font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent" >Sign in</button>
          </Link>

        </div>
      </div>
    </>

  )
}
