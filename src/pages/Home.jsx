import { useEffect, useState } from 'react'
import api from '../services/api'

function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL)
    api.get('/games')
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }, [])

  return <h1>Home</h1>
}

export default Home;