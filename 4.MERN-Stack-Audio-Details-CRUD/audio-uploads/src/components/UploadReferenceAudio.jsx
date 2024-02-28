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

const UploadReferenceAudio = () => {
  const { handleSetReferenceMusicURL } = useAudioUpload();
  const [uploading, setUploading] = useState(false);
  const storage = getStorage(firebaseapp);

  const handleReferenceFileUpload = async (e) => {
    // Reset previous files
    await handleReset();

    const files = e.target.files;
    if (files.length === 0) {
      return; // Exit if no file is selected
    }

    const singleFile = files[0]; // Get the first file, assuming single file upload

    setUploading(true);

    handleUploadRef(singleFile);
  };

  const handleUploadRef = (singleFile) => {
    const storageRef = ref(
      storage,
      `MusicPuzzleFolder/1.GanapathiMusic/referenceMusic/${singleFile.name}`
    );

    uploadBytes(storageRef, singleFile)
      .then((snapshot) => {
        alert("Uploaded a blob or file!");
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        // console.log("File available at", downloadURL);
        handleSetReferenceMusicURL(downloadURL); // Store as an array containing single URL
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleReset = async () => {
    setUploading(true);
    try {
      // Create a reference to the referenceMusic path
      const referenceMusicRef = ref(
        storage,
        "MusicPuzzleFolder/1.GanapathiMusic/referenceMusic"
      );

      // List all items (files) under the referenceMusic path
      const items = await listAll(referenceMusicRef);

      // Iterate through each item and delete it
      await Promise.all(items.items.map((item) => deleteObject(item)));
      handleSetReferenceMusicURL(null);
      console.log("All files under referenceMusic path deleted successfully");
    } catch (error) {
      console.error("Error deleting files:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="row" id="upload-reference-audio-row">
      <div className="labelNames">
        <label>Upload Reference Music</label>
      </div>
      <div className="input-div">
        <input
          type="file"
          accept="audio/*"
          onChange={handleReferenceFileUpload}
          disabled={uploading}
          id="reference-file-input"
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

export default UploadReferenceAudio;
