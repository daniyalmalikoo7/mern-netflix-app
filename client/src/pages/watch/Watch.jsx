import { KeyboardBackspaceOutlined } from "@material-ui/icons";
import "./watch.scss";

const Watch = () => {
  return (
    <div className="watch">
      <div className="back">
        <KeyboardBackspaceOutlined />
        Home
      </div>
      <div className="video">
        <video
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
          autoPlay
          progress="true"
          controls
        />
      </div>
    </div>
  );
};

export default Watch;
