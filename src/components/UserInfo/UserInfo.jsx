import { useRef } from "react";
import Button from "../Button/Button.jsx";
import styles from "./UserInfo.module.css";

function UserInfo({
  profile,
  uploading,
  editingBio,
  bio,
  setBio,
  setEditingBio,
  handleAvatarUpload,
  handleSaveBio,
}) {
  const fileInputRef = useRef(null);

  return (
    <div className={styles.userInfo}>
      <h1 className={styles.userInfoUsername}>{profile.username}</h1>
      {profile.avatar && (
        <img
          className={styles.userInfoAvatar}
          src={profile.avatar}
          alt={profile.username}
          width="100"
        />
      )}
      <label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          disabled={uploading}
          style={{ display: "none" }}
        />
        <Button
          className={styles.userInfoAvatarButton}
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          {uploading
            ? "Subiendo..."
            : profile.avatar
              ? "Cambiar foto"
              : "Subir foto"}
        </Button>
      </label>
      {editingBio ? (
        <div>
          <textarea
            className={styles.userInfoBioTextarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Escribe tu bio..."
          />
          <Button
            className={styles.userInfoBioSaveButton}
            onClick={handleSaveBio}
          >
            Guardar
          </Button>
          <Button
            className={styles.userInfoBioCancelButton}
            variant="secondary"
            onClick={() => setEditingBio(false)}
          >
            Cancelar
          </Button>
        </div>
      ) : (
        <div>
          <p className={styles.userInfoBio}>{profile.bio || "Sin bio"}</p>
          <Button
            className={styles.userInfoBioEditButton}
            onClick={() => {
              setBio(profile.bio || "");
              setEditingBio(true);
            }}
          >
            Editar bio
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;