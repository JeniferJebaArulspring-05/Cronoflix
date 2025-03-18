
// const BASE_URL = "https://moviesminidatabase.p.rapidapi.com";
// const HEADERS = {
//   "x-rapidapi-key": "729d6009d3msh2cb2839b0a4d619p1c649djsn0ed699253dd5", // Replace with your actual API key
//   "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
// };


import axios from "axios";

const BASE_URL = "https://moviesminidatabase.p.rapidapi.com";
const HEADERS = {
  "x-rapidapi-key": "729d6009d3msh2cb2839b0a4d619p1c649djsn0ed699253dd5", // Replace with your actual API key
  "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
};

// Fetch movies by genre
export const getMoviesByGenre = async (genre) => {
  const url = `${BASE_URL}/movie/byGen/${genre}/`;
  const response = await axios.get(url, { headers: HEADERS });
  return response.data.results;
};


export const getMovies = async (orderBy) => {
  const url = `${BASE_URL}/movie/order/by${orderBy}/`;
  const response = await axios.get(url, { headers: HEADERS });
  return response.data.results;
};


export const getMovieDetails = async (id) => {
  const url = `${BASE_URL}/movie/id/${id}/`;
  const response = await axios.get(url, { headers: HEADERS });
  return response.data.results;
};
