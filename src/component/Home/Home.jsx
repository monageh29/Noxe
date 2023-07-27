
import React, { useContext } from 'react'
import styles from './Home.module.scss'
import MediaItem from '../MediaItem/MediaItem'
import { Mediacontext } from '../../Context/Mediacontext'

export default function Home() {
let{Trending ,Trendingtv,Trendingperson}=useContext(Mediacontext);
  return <>
  
<div className='row my-5 '>
  <div className='col-md-4'>
    <div className={`${styles.brdr} w-25 mb-d`}></div>
    <h3>Trending</h3>
    <h3>movie</h3>
    <h3>to watch now</h3>
    <span className='text-muted'> most watched movies by now</span>
    <div className={`${styles.brdr} w-100 mt-4`}></div>
  </div>
 
  {Trending?.slice(0,10).map((item ,index)=>{
return <div className="col-md-2" key={index}>
<MediaItem item={item}/>
</div>
} )}
  </div>

  
  <div className='row my-5 '>
  <div className='col-md-4'>
    <div className={`${styles.brdr} w-25 mb-d`}></div>
    <h3>Trending</h3>
    <h3>Tv</h3>
    <h3>to watch now</h3>
    <span className='text-muted'> most watched movies by now</span>
    <div className={`${styles.brdr} w-100 mt-4`}></div>
  </div>
 
  {Trendingtv?.slice(0,10).map((item ,index)=>{
return <div className="col-md-2" key={index}>
<MediaItem  item={item}/>
</div>
} )}
  </div>

  <div className='row my-5 '>
  <div className='col-md-4'>
    <div className={`${styles.brdr} w-25 mb-d`}></div>
    <h3>Trending</h3>
    <h3>Person</h3>
    <h3>to watch now</h3>
    <span className='text-muted'> most watched movies by now</span>
    <div className={`${styles.brdr} w-100 mt-4`}></div>
  </div>
 
  {Trendingperson?.filter((person)=>person.profile_path !==null).slice(0,10).map((item ,index)=>{
return <div className="col-md-2" key={index}>
<MediaItem  item={item}/>
</div>
} )}
  </div>




</>

}
 


