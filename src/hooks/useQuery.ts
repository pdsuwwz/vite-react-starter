import { useLocation } from 'react-router-dom'

export default function useQuery<T>() {
  const { search } = useLocation<T>()
  const queryIterator = new URLSearchParams(search)

  const obj: any = {}

  for (const key of queryIterator.keys()) {
    const values = queryIterator.getAll(key)
    if (values.length > 1) {
      obj[key] = values
    } else {
      obj[key] = queryIterator.get(key)
    }
  }

  return obj
}
