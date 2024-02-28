import { useState } from "react";
import AllUploads from "../components/AllUploads";
import { useAudioUpload } from "../components/contexts/audioUpload.context";
const AddMusicScreen = () => {
  const { referenceMusicURL, playlistURLs } = useAudioUpload();
  const [formData, setFormData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get values from input fields
    const puzzleName = event.target.elements.puzzleName.value;
    const ragam = event.target.elements.ragam.value;
    const artist = event.target.elements.artist.value;
    const instrument = event.target.elements.instrument.value;
    const songPart = event.target.elements.songPart.value;

    // Construct playlist based on uploaded playlist
    const playlist = playlistURLs.map((fileURL, index) => ({
      id: index + 1,
      playlistOrder: index + 1,
      submusic: fileURL,
    }));

    // Generate unique string
    const generateUniqueString = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let uniqueString = "";
      for (let i = 0; i < 10; i++) {
        uniqueString += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return uniqueString;
    };
    const uniqueString = generateUniqueString();

    // Update formData state with new values
    setFormData((prevFormData) => [
      ...prevFormData,
      {
        id: prevFormData.length + 1,
        uniqueString: uniqueString,
        puzzleName: puzzleName,
        ragam: ragam,
        referenceMusicURL: referenceMusicURL[0],
        playlist: playlist,
        puzzleMetadata: {
          artist: artist,
          instrument: instrument,
          songPart: songPart,
        },
      },
    ]);

    // Reset form fields
    event.target.reset();
  };

  console.log("formData", formData);

  return (
    <div>
      {/* <h1>Welcome to admin dashboard</h1> */}
      <div className="singleMusicData-Container">
        <p className="add-music-heading-text">
          <b>ADD MUSIC</b>
        </p>
        <form onSubmit={handleSubmit}>
          {/* PUZZLE NAME */}
          <div className="labelNames">
            <label htmlFor="puzzleName">PUZZLENAME</label>
          </div>
          <div className="input-div">
            <input type="text" id="puzzleName" name="puzzleName" />
          </div>
          {/* RAGAM/TITLE */}
          <div className="labelNames">
            <label htmlFor="ragam">RAGAM</label>
          </div>
          <div className="input-div">
            <input type="text" id="ragam" name="ragam" />
          </div>
          {/* UPLOADS */}
          <AllUploads />
          {/* ENTER META DETA DETAILS */}
          <div className="metadata-div">
            <b>ENTER META DETAILS</b>
          </div>
          <div className="labelNames">
            <label htmlFor="artist">ARTIST</label>
          </div>
          <div className="input-div">
            <input type="text" id="artist" name="artist" />
          </div>
          <div className="labelNames">
            <label htmlFor="instrument">INSTRUMENT</label>
          </div>
          <div className="input-div">
            <input type="text" id="instrument" name="instrument" />
          </div>
          <div className="labelNames">
            <label htmlFor="songPart">SONG PART</label>
          </div>
          <div className="input-div">
            <input type="text" id="songPart" name="songPart" />
          </div>
          <button type="submit" className="submit-button">
            SUBMIT/ADD MUSIC DATA
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMusicScreen;
