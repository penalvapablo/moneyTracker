import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteRequest, getRequest, postRequest, putRequest } from "../AxiosClient"


// GET CATEGORIES
export const useCategoriesData = () => {
  const navigate = useNavigate();
  return useQuery(['categories'], () => getRequest('category'),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: false,
      // refetchOnReconnect:
      onError: (error) => {
        console.log(error)
        if (error.response.status === 401) {
          navigate('/login')
        } else {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          },
            () => {
              navigate(-1)
            }
          )
        }
      }
    }
  )
}


// ADD CATEGORY
const addCategory = (category) => {
  return postRequest('category', category)
}


export const useAddCategories = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  return useMutation(addCategory, {
    onSuccess: () => {
      queryClient.refetchQueries(['categories'])
      navigate(-1)
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      },
        () => {
          window.location.reload();
        }
      )
    }
  })

}

// UPDATE CATEGORY
const updateCategory = (category) => {
  return putRequest(`category/${category.id}`, category)
}

export const useUpdateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.refetchQueries(['categories'])
      navigate(-1)
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      },
        () => {
          window.location.reload();
        }
      )
    }
  })
}


// DELETE CATEGORY

const deleteCategory = (id) => {
  return deleteRequest(`category/${id}`)
}

export const useDeleteCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.refetchQueries(['categories'])
      navigate('/categories')
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      },
        () => {
          window.location.reload();
        }
      )
    }
  })
}