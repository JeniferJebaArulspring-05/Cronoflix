import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMovieDetails, getMovies, getMoviesByGenre } from "@/lib/movieService";
import Link from "next/link";
import Image from "next/image";

const GENRES = ["Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance"]; // Add more genres

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [orderBy, setOrderBy] = useState("Popularity"); // Default order
  const [selectedGenre, setSelectedGenre] = useState(null); // Track selected genre


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let movieList = [];

        if (selectedGenre) {
          movieList = await getMoviesByGenre(selectedGenre); // Fetch movies by genre
        } else {
          movieList = await getMovies(orderBy); // Fetch by order (default: popularity)
        }

        const movieDetails = await Promise.all(
          movieList.map(async (movie) => {
            const details = await getMovieDetails(movie.imdb_id);
            return details;
          })
        );

        setMovies(movieDetails);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [orderBy, selectedGenre]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[200px] lg:h-[400px] bg-custom flex justify-center items-center ">
      </div>
      {/* Genre Selection */}
    
      <div className="flex gap-3 justify-between  p-5 mt-5 overflow-x-scroll no-scrollbar">
        <button onClick={()=>setOrderBy("Popularity")}
          className="px-4  bg-red-500  rounded-sm">Movies</button>
        <button onClick={()=>setOrderBy("Rating")}
          className="px-5 py-1 bg-red-500 rounded-sm">Shows</button>
        {GENRES.map((genre) => (
          <button
            key={genre}
            className="px-4 py-1 bg-red-500 rounded-sm"
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="p-5 overflow-hidden">
        <h1 className="text-center text-yellow-400 capitalize text-3xl font-black">
          IMDB CHOICE
        </h1>

        {/* Movie Cards */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {movies.map((data, index) => (
            <Link
              href={`/detail/${data.imdb_id}`}
              key={index}
              className="border border-gray-800 bg-[#1d1d1d9e] rounded-sm"
            >
              <div className="w-full h-[250px]">
                <Image
                  src={data?.banner}
                  className="w-full h-full rounded-sm"
                  width={300}
                  height={300}
                  priority
                  alt="Movie Poster"
                  quality={100}
                />
              </div>
              <p className="font-bold mt-3 pb-3 text-center">{data?.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
