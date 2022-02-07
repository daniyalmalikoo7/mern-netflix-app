import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./listItem.scss";

const ListItem = ({ listItem, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/movies/find/${listItem}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjkxM2NkOGFjNDQ2YWQzZWY3ODFkYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDIzMzM0NCwiZXhwIjoxNjQ0NjY1MzQ0fQ.k4UbNRp4YJxgwNPsFZocx8jezMdQIGao7C4ttMNll6M",
            },
          },
          { CancelToken: source.token }
        );
        setMovie(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.log(error.message);
          throw error;
        }
      }
    };
    getMovie();
    return () => {
      source.cancel();
    };
  }, [listItem]);

  // console.log("movie", movie);

  return (
    <Link to={{ pathname: `/watch/${movie?.video}`, movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="https://www.hollywoodreporter.com/wp-content/uploads/2021/10/Man-of-Steel-Everett-H-2021.jpg"
          alt=""
          style={{ display: isHovered && "none" }}
        />
        {isHovered && (
          <>
            <video src={movie?.video} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+16</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
