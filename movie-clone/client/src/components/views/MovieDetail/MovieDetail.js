import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../LandingPage/MainImage";
import Favorite from "./Sections/Favorite";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  //const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        setLoadingForMovie(false);
      });

    fetch(endpointCast)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast);
      });
  }, []);
  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>loading...</div>
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>

        {/* Movie Info */}
        {Movie && <MovieInfo movie={Movie} />}
        <br />
        {/* Actors Grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={() => setActorToggle(!ActorToggle)}>
            {" "}
            Toggle Actor View{" "}
          </button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
