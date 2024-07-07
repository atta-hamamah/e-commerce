'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const url = `https://dummyjson.com/product/${''}?limit=10&skip=${''}`
  useEffect(() => {
    async function start() {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result)
      } catch (error) {
        console.error(error);
      }
    }
    start()
  }, [])

  console.log(data)
  return (
    <div className=' bg-white w-full h-full'>
      {data ?
        (
          <div>
            <h1>Amazon Phones</h1>
          </div>
        )
        :
        <p>Loading...</p>
      }
    </div >
  );
}
