"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMovieDetails } from "@/lib/movieService";
import Image from "next/image";
import Link from "next/link";


export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="w-full  p-6">
      <div className="flex flex-col lg:flex-row gap-3 mx-auto">
        <Image
        src={movie.banner}
        
        alt="image"
        width={350}
        height={350}/>

        <div className="flex flex-col gap-4 p-6 items-center justify-center">
          <h1 className="text-3xl font-semibold text-center lg:text-7xl">{movie.title}</h1>
          <div className="flex gap-2 lg:gap-5">
          <p className="mt-2 lg:text-4xl"><strong>Release Year:</strong> {movie.year}</p>
          <p className="mt-2 lg:text-4xl"><strong>Rating:</strong> {movie.rating}</p>
          </div>
          <Link href={movie.trailer} className="bg-red-500 outline-none border-none  w-full lg:w-[80%] p-4 rounded-md text-center">Watch Trailer</Link>
          <p className="mt-2 text-gray-600 lg:text-2xl">{movie.description}</p>


        </div>

      </div>
      
    </div>
  );
}

{/* <img src={movie.poster} alt={movie.name} className="w-full rounded-lg shadow-lg" />
      <h1 className="text-3xl font-bold mt-4">{movie.name}</h1>
      
      <p className="mt-2"><strong>Genre:</strong> {movie.genre}</p>
      <p className="mt-2"><strong>Release Year:</strong> {movie.year}</p>
      <p className="mt-2"><strong>Rating:</strong> {movie.rating}</p>
      <Image src={movie.banner} alt="image" width={350} height={350}/> */}