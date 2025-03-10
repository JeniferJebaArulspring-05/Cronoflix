'use client';

import Header from '@/components/Header';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Page = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get ID from URL params

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return; // Avoid unnecessary API calls if ID is not available

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://imdb236.p.rapidapi.com/imdb/${id}`,
          {
            headers: {
              "x-rapidapi-key": "c1b4e57747msh5e6b54b382d31e5p1740cdjsn7177b2c8a432",
              "x-rapidapi-host": "imdb236.p.rapidapi.com",
            },
          }
        );

        console.log("API Response:", response.data);
        setData(response.data.results || response.data);
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]); // Use ID as the dependency

  return (
    <>
      <Header />
      <div className="lg:p-10 p-5  text-white ">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className=' flex lg:flex-row flex-col  gap-5 p-5 justify-center items-center'>
            <div className='flex  bg-red-400 justify-center w-[50%] items-center'>
                <Image
                src={data?.primaryImage}
                width={200}
                height={200}
                alt={data?.title}
                className='w-full h-full'
                quality={100}
                />
            </div>

            {/* detals */}
            <div className='flex flex-col gap-4 lg:gap-10 p-5   '>
                <h1 className='text-center text-3xl lg:text-7xl font-semibold'>{data?.primaryTitle}<span className='text-xs'></span></h1>
               
                <p className='lg:text-3xl'>Rating: <span className='text-red-600'>{data?.averageRating}</span></p>
                
                
                <div className='flex justify-between items-center'>
                    <p className='lg:text-3xl'>Votes: {data?.numVotes}</p>
                    <p className='lg:text-3xl'>Duration: {data?.runtimeMinutes}min</p>

                </div>
                <p className='lg:text-3xl'>
                    Description : {data?.description}
                </p>
                
                <div className='flex flex-wrap lg:gap-10 gap-2'>
                    {
                        data?.genres?.map((name,index)=>(
                            <div key={index} className='p-2 bg-red-500 text-white rounded-md'>{name}</div>
                        ))
                    }

                </div>

            </div>
            


            

        </div>

        {/* end */}
    
      </div>
    </>
  );
};

export default Page;
