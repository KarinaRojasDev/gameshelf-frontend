import { useEffect, useState } from 'react'
import { getRandomGames } from '../services/api'

function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    getRandomGames()
      .then(data => {
        console.log(data)
        setGames(data)
      })
      .catch(err => console.error(err))
  }, [])

  return 
  <div>
    <h1>Home</h1>
    <p>Juegos cargados: {games.length}</p>
  </div>
  
}

export default Home;