import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const [error,setError ] = useState('')
  const [errorList,seterrorList]=useState([])
  let navigate= useNavigate();
  const [isLoading,setisLoading]= useState(false)
  const [user , setuser ]=useState({
    first_name : '',
    last_name : '',
    email : '',
    age : '',
   password : ''
  })


  let getUserDate=(e)=>{
    let myUser={...user};
    myUser[e.target.name]=e.target.value
    setuser(myUser)
    
  }
   let SendRrgisterDataApi=async()=>{
 

     let {data} = await axios.post('https://movies-api.routemisr.com/signup',user);
     console.log(data)



    if(data.message ==='success'){
      setisLoading(false)
      localStorage.setItem('token',data.token)
      navigate('/login')    
      }else{

      setError(data.message)
      setisLoading(true)
    }
  }

  let submitRegisterForm=(e)=>{
    e.preventDefault()
   
   
    let validate=validateRegister()
    
    console.log(validate)
    if(validate.error){
      setisLoading(false)
      seterrorList(validate.error.details)
    }else{
      setisLoading(true)
      SendRrgisterDataApi()
    }
  }
let validateRegister=()=>{
  const scheme=Joi.object({
    first_name : Joi.string().pattern(/^[A-Z]/).min(3).max(16).required(),
   last_name : Joi.string().min(3).max(16).required(),
    email: Joi.string().email({tlds:['com','net']}).required(),
    password: Joi.string().pattern(new RegExp(/^[A-Z][a-z]{3,6}/)).required(),
    age: Joi.number().min(16).max(60).required()
  })
  return scheme.validate(user,{abortEarly:false})
}
  return (
    <div className='py-5 w-75 m-auto'>
      <h4 className='fw-bold  my-4'> Registration Form</h4>
      <form onSubmit={submitRegisterForm} >
       {errorList.map((err,indix)=>{
        if(err.context.label==='password') {
          return <div key={indix} className='alert alert-danger my-2'>password inviled</div>

        } else{
          return <div key={indix} className='alert alert-danger my-2'>{err.message}</div>

        }
       })}
        <label htmlFor="first_name">first Name</label>
        <input onChange={getUserDate} type="text" className='form-control my-input my-3' name='first_name' id='first_name' />
        <label  htmlFor="last_name">last Name</label>
        <input onChange={getUserDate} type="text" className='form-control my-input my-3' name='last_name' id='last_name' />
        <label htmlFor="email">email</label>
        <input onChange={getUserDate} type="email" className='form-control my-input my-3' name='email' id='email' />
        <label htmlFor="age">age</label>
        <input onChange={getUserDate} type="number" className='form-control my-input my-3' name='age' id='age' />
        <label htmlFor="password">password</label>
        <input onChange={getUserDate} type="password" className='form-control my-input my-3' name='password' id='password' />
        {error.length>0?<div className='alert alert-danger my-2'>{error}</div>:''}
        <button className='btn btn-info'> {isLoading ===true?<i className='fas fa-spinner fa-spin'></i>:"Register "}</button>
      </form>
    </div>
  )
}
