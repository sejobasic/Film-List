import { useState, useEffect } from 'react'


export const  useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  // Add new data 
  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setLoading(true)

      try {
        const resp = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if (!resp.ok) {
          throw new Error(resp.statusText)
        }
        const json = await resp.json()

        setLoading(false)  
        setData(json)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('the fetch was aborted')
        } else {
        setLoading(false)  
        setError('Could not fetch the data')
        console.log(err.message)
        }
      }
    }

    if (method === "GET") {
      fetchData()
    }
    if (method === "POST" && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }
  }, [url, options, method])


  return { data, loading, error, postData }
}

