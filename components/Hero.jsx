import { useEffect, useState } from "react";
import axios from "axios";
import { movieBox, native } from "@/constants";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("most-popular-movies");

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://imdb236.p.rapidapi.com/imdb/${title}`, // Ensure correct URL
          {
            headers: {
              "x-rapidapi-key":
                "c1b4e57747msh5e6b54b382d31e5p1740cdjsn7177b2c8a432",
              "x-rapidapi-host": "imdb236.p.rapidapi.com",
            },
          }
        );

        console.log("API Response:", response.data); // Debugging
        setData(response.data.results || response.data); // Adjust based on response structure
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [title, setTitle]);
  return (
    <div className="w-full h-full">
      <div className="w-full h-[200px] lg:h-[400px] bg-custom flex justify-center items-center ">
        <h1 className=" text-3xl lg:text-7xl text-white font-black text-center capitalize ">
          WATCH YOUR FAVORITE MOVIES
        </h1>
      </div>
      <div className="p-5 overflow-hidden">
        <h1 className="text-center text-yellow-400 capitalize text-3xl font-black">
          IMDB CHOICE
        </h1>
        <div className="flex items-center justify-between  gap-2  overflow-y-scroll no-scrollbar  mt-5">
          {movieBox.map((movie) => (
            <div
              className="rounded border    text-white cursor-pointer text-center text-nowrap hover:bg-red-500 px-4 py-1 "
              onClick={() => setTitle(movie.title)}
              key={movie.id}
            >
              <p>{movie.name}</p>
            </div>
          ))}
          {native.map((l) => (
            <div
              key={l.id}
              className="rounded border  text-white flex cursor-pointer items-center justify-center text-nowrap hover:bg-red-500 px-4 py-1 "
            >
              <p>{l.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7  gap-5">
          {data.map((data, index) => (
            <Link
              href={`/detail/${data.id}`}
              key={index}
              className="  border  rounded-sm"
            >
              <div className="w-full h-[250px]">
                <Image
                  src={data?.primaryImage}
                  className="w-full h-full rounded-sm"
                  width={300}
                  height={300}
                  priority
                  alt="image"
                  quality={100}
                />
              </div>

              <p className="font-bold mt-3 pb-3 text-center">
                {data?.primaryTitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
