import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  useEffect(()=> {
    fetch("https://yts.mx/api/v2/list_movies.json?limit=30")
    .then(response => response.json())
    .then(json => {
      setLoading(false); //영화 로딩이 끝나면 텍스트를 숨긴다.
      setMovies(json.data.movies); //영화정보 30건을 출력한다.
      console.log(json.data.movies)
    });
  }, []); //빈 배열
  return (
    <div className="App">
      <h1>영화정보 앱({movies.length})</h1>
      <div>{loading ? <p>데이터 수신중입니다..</p> : null}</div>
      <ul className="d-flex flex-wrap gap-1">
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href="{movie.url}">
              <img src={movie.medium_cover_image} alt={movie.title_english} />
              <p className="year">제목 : {movie.year}</p>
              <p className="title">제목 : {movie.title}</p>
              <p className="genres">장르 : {movie.genres.map((genre) => (<strong className="genre">{genre}</strong>))}</p>
              <p>언어 : {movie.language === "en" ? "영어" : null}</p>
              <p>평점 : {movie.ratings} / 10</p>
              <p>상영시간 : {movie.runtime} 분</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
