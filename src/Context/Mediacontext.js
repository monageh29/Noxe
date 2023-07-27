
import { createContext, useEffect, useState } from "react";
import axiosRequest from "../config/axiosRequest";

export let Mediacontext= createContext(0)

export default function Mediacontextprovider(props){
    let [Trending , setTrending]=useState([])
    let [Trendingtv , setTrendingtv]=useState([])
   let [ Trendingperson , setTrendingperson]=useState([])
    let getTrending=async(mediatype,callback)=>{

      let{data}= await axiosRequest.get(`trending/${mediatype}/day`)
      console.log(data)
      callback(data.results)
    }
    useEffect(()=>{
      getTrending('all', setTrending)
      getTrending('person', setTrendingperson)
      getTrending('tv', setTrendingtv)
    },[])
    return <Mediacontext.Provider value={{Trending ,Trendingtv,Trendingperson}}>
        {props.children}
    </Mediacontext.Provider>
} 