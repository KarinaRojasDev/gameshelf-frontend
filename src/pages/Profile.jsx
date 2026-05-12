import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserList,
  getUserReviews,
  updateUser,
} from "../services/api";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  

  useEffect(() => {
    getUserById(id)
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
    getUserList(id)
      .then((data) => setGameList(data))
      .catch((err) => console.error(err));
    getUserReviews(id)
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const data = await updateUser(id, formData);
      setProfile((prev) => ({ ...prev, avatar: data.avatar }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!profile) return <p>Cargando...</p>;
  console.log(gameList);
  

  return (
    <div>
      <h1>{profile.username}</h1>
      {profile.avatar && (
        <img src={profile.avatar} alt={profile.username} width="100" />
      )}
      <label>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          disabled={uploading}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          {uploading
            ? "Subiendo..."
            : profile.avatar
              ? "Cambiar foto"
              : "Subir foto"}
        </button>
      </label>
      <p>{profile.bio || "Sin bio"}</p>

      <h2>Lista de juegos ({gameList.length})</h2>
      {gameList.length === 0 ? (
        <p>No hay juegos en la lista</p>
      ) : (
        gameList.map((game) => (
          <div key={game.id}>
            <img src={game.image} alt={game.name} width="100" />
            <p>{game.name}</p>
            <p>{game.genres ? game.genres.join(", ") : "Sin géneros"}</p>
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
