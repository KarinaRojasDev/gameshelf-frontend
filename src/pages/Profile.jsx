import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, getUserList, getUserReviews } from "../services/api";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [gameList, setGameList] = useState([])  
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getUserById(id).then((data) => setProfile(data)).catch((err) => console.error(err));
    getUserList(id).then(data => setGameList(data)).catch(err => console.error(err));
    getUserReviews(id).then(data => setReviews(data)).catch(err => console.error(err));
    
  }, [id]);

  if (!profile) return <p>Cargando...</p>;
  console.log(gameList);
  return (
    <div>
      <h1>{profile.username}</h1>
      {profile.avatar && (
        <img src={profile.avatar} alt={profile.username} width="100" />
      )}
      <p>{profile.bio || "Sin bio"}</p>

      <h2>Lista de juegos ({gameList.length})</h2>
      {gameList.length === 0 ? (
        <p>No hay juegos en la lista</p>
      ) : (
        gameList.map((game) => (
          <div key={game.id}>
            <img src={game.image} alt={game.name} width="100" />
            <p>{game.name}</p>
            <p>{game.genres.join(", ")}</p>
          </div>
        ))
      )}

      <h2>Reseñas ({reviews.length})</h2>
      {reviews.length === 0 ? (
        <p>No hay reseñas</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id}>
            <p>Juego ID: {review.rawgId}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.content}</p>
            <p>{review.createdAt.slice(0, 10)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
