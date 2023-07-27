import React, { useContext } from 'react'
import MediaItem from '../MediaItem/MediaItem'
import { Mediacontext } from '../../Context/Mediacontext'
import styles from './Tv.module.scss'

export default function Tvshow() {
  let{Trendingtv}=useContext(Mediacontext);
  return (

    <>
      <div className='row my-5 '>
  <div className='col-md-4'>
    <div className={`${styles.brdr} w-25 mb-d`}></div>
    <h3>Trending</h3>
    <h3>Tv</h3>
    <h3>to watch now</h3>
    <span className='text-muted'> most watched movies by now</span>
    <div className={`${styles.brdr} w-100 mt-4`}></div>
  </div>
 
  {Trendingtv?.map((item ,index)=>{
return <div className="col-md-2" key={index}>
<MediaItem  item={item}/>
</div>
} )}
  </div>
    </>
  )
}
