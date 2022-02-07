import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { useRef } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

const List = ({ list, movie }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();

  console.log(list);
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
      <div className="listTitle">{list.title}</div>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="slider left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        )
        <div ref={listRef} className="container">
          {list.content.map((item, index) => (
            <ListItem key={index} index={index} listItem={item} />
          ))}
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
