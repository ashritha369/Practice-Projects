// audioUpload.context.jsx
import React, { createContext, useState, useContext } from "react";

const AudioUploadContext = createContext();

export const useAudioUpload = () => useContext(AudioUploadContext);

export const AudioUploadProvider = ({ children }) => {
  const [referenceMusicURL, setReferenceMusicURL] = useState([]);
  const [playlistURLs, setPlaylistURLs] = useState([]);

  const handleSetReferenceMusicURL = (url) => {
    setReferenceMusicURL([url]);
  };

  const handleSetAddPlaylistURL = (newURLS) => {
    setPlaylistURLs(newURLS);
  };

  return (
    <AudioUploadContext.Provider
      value={{
        referenceMusicURL,
        playlistURLs,
        handleSetReferenceMusicURL,
        handleSetAddPlaylistURL,
      }}
    >
      {children}
    </AudioUploadContext.Provider>
  );
};
