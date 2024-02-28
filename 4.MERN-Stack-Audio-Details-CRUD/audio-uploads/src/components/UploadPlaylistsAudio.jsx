import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import firebaseapp from "../firebaseLocalConfig";
import { useAudioUpload } from "./contexts/audioUpload.context";

const UploadPlaylistsAudio = () => {
  const { handleSetAddPlaylistURL } = useAudioUpload();
  const [uploading, setUploading] = useState(false);
  const storage = getStorage(firebaseapp);

  const handlePlaylistFileUpload = async (e) => {
    const files = e.target.files;
    setUploading(true);

    // Await the completion of the reset operation before proceeding.
    await handleReset();

    // Map each file to a promise that uploads it and gets the URL, with error handling.
    const uploadPromises = Array.from(files).map((file) => {
      const storageRef = ref(
        storage,
        `MusicPuzzleFolder/1.GanapathiMusic/playlist/${file.name}`
      );
      return uploadBytes(storageRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .catch((error) => {
          console.error("Error uploading file:", file.name, error);
          return null; // Return null or a specific error marker for this file.
        });
    });

    // Wait for all promises to settle, regardless of rejection.
    Promise.all(uploadPromises)
      .then((urls) => {
        // Filter out any nulls (failures) and update state with successful uploads.
        const successfulUrls = urls.filter((url) => url !== null);
        handleSetAddPlaylistURL(successfulUrls);
        successfulUrls.forEach((url) => console.log("File available at", url));
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleReset = async () => {
    setUploading(true);
    try {
      // Create a reference to the playlist path
      const playlistRef = ref(
        storage,
        "MusicPuzzleFolder/1.GanapathiMusic/playlist"
      );

      // List all items (files) under the playlist path
      const items = await listAll(playlistRef);

      // Iterate through each item and delete it
      await Promise.all(items.items.map((item) => deleteObject(item)));
      handleSetAddPlaylistURL([]); // Reset playlist URLs
      console.log("All files under playlist path deleted successfully");
    } catch (error) {
      console.error("Error deleting files:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="row" id="upload-playlists-audio-row">
      <div className="labelNames">
        <label>Upload Playlists Audios(Multiple File Upload)</label>
      </div>
      <div className="input-div">
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handlePlaylistFileUpload}
          disabled={uploading}
          id="playlist-file-input"
        />
      </div>
      <button
        className="submit-button"
        onClick={handleReset}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Reset"}
      </button>
    </div>
  );
};

export default UploadPlaylistsAudio;
