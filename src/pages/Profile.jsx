import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../components/Tabs/Tabs.jsx";
import UserInfo from "../components/UserInfo/UserInfo.jsx";
import {
  getUserById,
  getUserList,
  getUserReviews,
  updateUser,
  removeGameFromList,
  deleteReview,
} from "../services/api";
import styles from "./Profile.module.css";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState("");

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

  if (!profile) return <p className={styles.profilePageLoading}>Cargando...</p>;

  const handleSaveBio = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      const data = await updateUser(id, formData);
      setProfile((prev) => ({ ...prev, bio: data.bio }));
      setEditingBio(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={styles.profilePage}>
      <UserInfo
        profile={profile}
        uploading={uploading}
        editingBio={editingBio}
        bio={bio}
        setBio={setBio}
        setEditingBio={setEditingBio}
        handleAvatarUpload={handleAvatarUpload}
        handleSaveBio={handleSaveBio}
      />
      <Tabs
        gameList={gameList}
        reviews={reviews}
        onRemoveGame={(game) => {
          removeGameFromList(game.rawgId).then(() =>
            setGameList((prev) =>
              prev.filter((g) => g.rawgId !== game.rawgId),
            ),
          );
        }}
        onDeleteReview={(review) => {
          deleteReview(review.id).then(() =>
            setReviews((prev) => prev.filter((r) => r.id !== review.id)),
          );
        }}
      />
    </main>
  );
}

export default Profile;
