import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [movies, setMovies] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODA3OGIyZWYzYzRiMWU2ODlmMmFhNGEzYjliZjQ1NSIsIm5iZiI6MTc1MjQ0NTI3MS4xNTYsInN1YiI6IjY4NzQzMTU3NGNiMTU4ZDdiZGVkODU0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I6_QU-FgUawC8r-ul2Gk0j50RlYE5Qs_KK0S1Unkvv0",
    },
  };

  const getMovies = async () => {
    const fetchMovies = await fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
        console.log(res.results);
      })
      .catch((err) => console.error(err));

    return fetchMovies;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    getMovies();
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {movies.map((movie) => {
          return (
            <Link to={`/player/${movie.id}`} className="card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
                alt={movie.original_title}
              />
              <p>{movie.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
