import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { useRef } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

const List = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);

    const distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === "left" && slideNumber > 0 && isMoved) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${distance - 230}px)`;
    }
  };

  return (
    <div className="list">
      <div className="listTitle">Continue Watching</div>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="slider left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        )
        <div ref={listRef} className="container">
          <ListItem index={0} />
          <ListItem index={1} />
          <ListItem index={2} />
          <ListItem index={3} />
          <ListItem index={4} />
          <ListItem index={5} />
          <ListItem index={6} />
          <ListItem index={7} />
          <ListItem index={8} />
          <ListItem index={9} />
          <ListItem index={10} />
        </div>
        <ArrowForwardIosOutlined
          onClick={() => handleClick("right")}
          className="slider right"
        />
      </div>
    </div>
  );
};

export default List;
