import { useLocation } from 'react-router'

export function useQuery () {
  // const query = useQuery()
  // query.get('PATH') || 'default')
  // ?search=[your PATH]
  return new URLSearchParams(useLocation().search)
}
