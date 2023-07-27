import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  let {id,mediatype}= useParams();

  let[movieDEtails, setmovieDEtails]=useState({});

 let getSingleMovie=async()=>{
  let{data}= await axios.get(`https://api.themoviedb.org/3/${mediatype}/${id}?api_key=f94ac0221b4d11e006fa67587a1fb58c`)
setmovieDEtails(data)
console.log(data)

 }
 useEffect(()=>{
getSingleMovie()
 },[])
  return (
<>
<div className='row'>
  <div className='col-md-4'>
  <img src={'https://image.tmdb.org/t/p/w500/'+movieDEtails.poster_path} className='w-100' alt="" />
  <img src={'https://image.tmdb.org/t/p/w500/'+movieDEtails.profile_path} className='w-100' alt="" />
  </div>
  <div className='col-md-8'>
     <h2>{movieDEtails.belongs_to_collection?.name}</h2> 
     <h2>{movieDEtails?.name}</h2>
    <p className='text-muted mb-3'>{movieDEtails.biography}</p>
    
   
    <h3 className=' mb-3'>{movieDEtails.original_title}</h3>
  
{movieDEtails.genres?.map((e,index)=>{
return <span key={index}className='bg-info p-1 text-light m-2 '>{e.name}</span>

})}
{mediatype==='person'?<> <p className=' mb-3  mb-3'>birthday : {movieDEtails.birthday}</p>
    <p className=' mb-3  mb-3'>place_of_birth  :  {movieDEtails.place_of_birth}</p></>: <><p className='mt-3 p-2 text-white '>vote_average  :   {movieDEtails.vote_average}</p>
 <p className='mt-3 p-2 text-white '>vote_count   :   {movieDEtails.vote_count}</p></>}
 
   <h5 className='text-muted mb-3'>{movieDEtails.overview}</h5> 
  </div>
</div>
</>
  )
}
