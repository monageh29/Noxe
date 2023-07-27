
import React, { useState } from 'react'
// import axiosRequest from '../../config/axiosRequest'
import axios from 'axios'

import Joi from 'joi'
import { useNavigate } from 'react-router-dom'
export default function Login( { currentUser} ) {
  const [error, seteror   ] = useState('')
  const [errorList,seterrorList]=useState([])
  let navigate= useNavigate();
  const [isLoading,setisLoading]= useState(false)
  const [user , setuser ]=useState({
  
    email : '',
  
   password : ''
  })
  


  let getUserDate=(e)=>{
    let myUser={...user};
    // console.log(e.target.value)
    myUser[e.target.name]=e.target.value
    setuser(myUser)
    // console.log(myUser)
    
  }
  let SendLoginDataApi=async()=>{
 

     let {data} = await axios.post('https://movies-api.routemisr.com/signin',user);
     console.log(data)



    if(data.message ==='success'){
      setisLoading(false)
      localStorage.setItem('token',data.token)
      currentUser();
      navigate('/')    
      }else{

      seteror(data.message)
      setisLoading(true)
    }
  }
  let submitLoginForm=(e)=>{
    e.preventDefault()
   
   
    let validate=validateLogin()
    
    console.log(validate)
    if(validate.error){
      setisLoading(false)
      seterrorList(validate.error.details)
    }else{
      setisLoading(true)
      SendLoginDataApi()
    }
  }
let validateLogin=()=>{
  const scheme=Joi.object({
    
    email: Joi.string().email({tlds:['com','net']}).required(),
    password: Joi.string().pattern(new RegExp(/^[A-Z][a-z]{3,6}/)).required()
  
  })
  return scheme.validate(user,{abortEarly:false})
}
return (
  <div className='py-5 w-75 m-auto'>
    <h4 className='fw-bold  my-4'> Registration Form</h4>
    <form onSubmit={submitLoginForm} >
     {errorList.map((err,indix)=>{
return <div key={indix} className='alert alert-danger my-2'>{err.message}</div>
     })}
     
      <label htmlFor="email">email</label>
      <input onChange={getUserDate} type="email" className='form-control my-input my-3' name='email' id='email' />
   
      <label htmlFor="password">password</label>
      <input onChange={getUserDate} type="password" className='form-control my-input my-3' name='password' id='password' />
      {error.length>0?<div className='alert alert-danger my-2'>{error}</div>:''}
      <button className='btn btn-info'> {isLoading ===true?<i className='fas fa-spinner fa-spin'></i>:" Login "}</button>
    </form>
  </div>
)
}
