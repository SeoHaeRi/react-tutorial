import React from "react";
import { Col } from "antd";

function GridCards(props) {
  if (props.landingPage) {
    return (
      //large(4개 표시) midium(3개표시) xsmall(1개표시)
      // <Col lg={6} md={8} xs={24}>
      <Col lg={6} md={8} sm={12} xs={24}>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "300px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            style={{ width: "300px", height: "420px" }}
            src={props.image}
            alt={props.characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
