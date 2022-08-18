import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteRequest, getRequest, postRequest, putRequest } from "../AxiosClient"


// GET MOVEMENTS
export const useMovementsData = () => {
  const navigate = useNavigate();
  return useQuery(['movements'], () => getRequest('movement'),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: false,
      onError: (error) => {
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

// ADD MOVEMENT
const addMovement = (movement) => {
  return postRequest('movement', movement)
}


export const useAddMovement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  return useMutation(addMovement, {
    onSuccess: () => {
      queryClient.refetchQueries(['movements'])
      navigate('/movements')
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

// UPDATE MOVEMENT

const updateMovement = (movement) => {
  return putRequest(`movement/${movement.id}`, movement)
}

export const useUpdateMovement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  return useMutation(updateMovement, {
    onSuccess: () => {
      queryClient.refetchQueries(['movements'])
      navigate(-1)
    },
    onError: (error) => {
      console.log(error)
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

// DELETE MOVEMENT

const deleteMovement = (id) => {
  return deleteRequest(`movement/${id}`)
}

export const useDeleteMovement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  return useMutation(deleteMovement, {
    onSuccess: () => {
      queryClient.refetchQueries(['movements'])
      navigate('/movements')
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