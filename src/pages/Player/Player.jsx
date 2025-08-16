import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieTrailer, setMovieTrailer] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.TMDb_AUTHORIZATION,
    },
  };

  const getMovieTrailer = async () => {
    const fetchMovieTrailer = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setMovieTrailer(res.results[0]);
        console.log(res.results[0]);
      })
      .catch((err) => console.error(err));

    return fetchMovieTrailer;
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="arrow"
        onClick={() => {
          navigate(-1);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${movieTrailer.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{movieTrailer.published_at.slice(0, 10)}</p>
        <p>{movieTrailer.name}</p>
        <p>{movieTrailer.type}</p>
      </div>
    </div>
  );
};

export default Player;
