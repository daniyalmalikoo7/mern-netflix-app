import { KeyboardBackspaceOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./watch.scss";

const Watch = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  console.log(location, movieId);

  useEffect(() => {
    const getMovie = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/movies/find/${movieId}`,
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjkxM2NkOGFjNDQ2YWQzZWY3ODFkYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzcxMzU0MywiZXhwIjoxNjQ0MTQ1NTQzfQ.M6Sra-rtjUMfOBG3TMTz-mtuyTzXWM3eXY6ZThKtW84",
          },
        }
      );
      setMovie(res.data);
    };
    getMovie();
  }, [movieId]);

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <KeyboardBackspaceOutlined />
          Home
        </div>
      </Link>
      <div className="video">
        <video src={movie.video} autoPlay progress="true" controls />
      </div>
    </div>
  );
};

export default Watch;
