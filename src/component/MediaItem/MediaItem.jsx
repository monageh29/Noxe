
import React from 'react'
import { Link } from 'react-router-dom'


export default function MediaItem({item}) {
  return <>
<Link  to={`/MovieDetails/${item.id}/${item.media_type}`} className='text-decoration-none text-white'>
      
        <div className=" movie position-relative">
        <img src={'https://image.tmdb.org/t/p/w500/'+item.poster_path} className='w-100' alt="" />
        <img src={'https://image.tmdb.org/t/p/w500/'+item.profile_path} className='w-100' alt="" />
        <p>{item.title}{item.name}  </p>
        {item.vote_average?<div className='bg-info p-1 text-white position-absolute end-0 top-0   '>{item.vote_average.toFixed(1)}</div>:''}

        
      </div>
      </Link>
     </>
  
} 