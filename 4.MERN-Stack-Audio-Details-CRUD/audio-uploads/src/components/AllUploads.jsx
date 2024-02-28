import { useState } from "react";
import DisplayRAudio from "./DisplayRAudio";
import DisplayPAudio from "./DisplayPAudio";
import UploadReferenceAudio from "./UploadReferenceAudio";
import UploadPlaylistsAudio from "./UploadPlaylistsAudio";
import { useAudioUpload } from "./contexts/audioUpload.context";
const AllUploads = () => {
  const [toggleRefDiv, setToggleRefDiv] = useState(false);
  const [togglePlaylistDiv, setTogglePlaylistDiv] = useState(false);

  const { referenceMusicURL, playlistURLs } = useAudioUpload();

  // console.log(`referenceMusicURL`, referenceMusicURL);
  // console.log(`playlistURLS`, playlistURLs);

  const handleToggle = (str) => {
    if (str === "ref") {
      // alert("ref ");
      setToggleRefDiv(!toggleRefDiv);
    }
    if (str === "playlist") {
      // alert("playlist ");
      setTogglePlaylistDiv(!togglePlaylistDiv);
    }
  };
  return (
    <div className="audio-uploads-container">
      {/* UPLOAD REFERENCE MUSIC */}
      <div className="reference-music">
        {/*  ROW 1*/}
        <UploadReferenceAudio />

        <div
          className="view-upload-toggle-div"
          onClick={() => {
            handleToggle("ref");
          }}
        >
          VIEW UPLOAD
        </div>
        {/* ROW 2 */}
        <div className={`display-ref-uploaded ${toggleRefDiv ? "show" : ""}`}>
          <DisplayRAudio src={referenceMusicURL[0]} />
        </div>
      </div>

      {/* UPLOAD PLAYLIST  OPTIONS */}
      <div className="playlist-musics">
        {/*  ROW 1*/}
        <UploadPlaylistsAudio />

        <div
          className="view-upload-toggle-div"
          onClick={() => {
            handleToggle("playlist");
          }}
        >
          VIEW UPLOAD
        </div>
        {/* ROW 2 */}
        <div
          className={`display-playlist-uploaded ${
            togglePlaylistDiv ? "show" : ""
          }`}
        >
          {playlistURLs.map((singlePlaylistURL, index) => (
            <DisplayPAudio key={index} src={singlePlaylistURL} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUploads;
