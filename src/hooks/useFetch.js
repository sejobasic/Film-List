import { useState, useEffect } from 'react'


export const  useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
  
  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)

      try {
        const resp = await fetch(url, { signal: controller.signal })
        if (!resp.ok) {
          throw new Error(resp.statusText)
        }
        const json = await resp.json()

        setLoading(false)  
        setData(json)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log('the fetch was aborted')
        } else {
        setLoading(false)  
        setError('Could not fetch the data')
        console.log(err.message)
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])


  return { data, loading, error }
}

