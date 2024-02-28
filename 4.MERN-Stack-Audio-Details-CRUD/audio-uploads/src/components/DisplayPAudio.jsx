const DisplayPAudio = ({ src }) => {
  console.log(`URL from DisplayPAudio,Type of src:`, typeof src);
  return (
    <div className="row" id="single-audio-display-playlist-row">
      <div className="audio-div">
        <audio controls>
          <source src={src} type="audio/mpeg"></source>
        </audio>
      </div>
    </div>
  );
};

export default DisplayPAudio;
