const DisplayRAudio = ({ src }) => {
  return (
    <div className="row" id="single-audio-display-ref-row">
      <div className="audio-div">
        <audio controls>
          <source src={src} type="audio/mpeg"></source>
        </audio>
      </div>
    </div>
  );
};

export default DisplayRAudio;
