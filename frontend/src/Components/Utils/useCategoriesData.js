import { useQuery } from "@tanstack/react-query"
import { getRequest } from "../AxiosClient"

export const useCategoriesData = () => {
  return useQuery(['categories'], () => getRequest('category'),
    {
      refetchOnWindowFocus: true,
      retry: false,
    }
  )
}