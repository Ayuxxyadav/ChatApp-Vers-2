import React, { useState } from 'react'
import axios from "axios"

const Signup = () => {

const [email , setEmail] = useState("");
const [username , setUsername] = useState("");
const [password , setPassword] = useState("");

const[loading , setLoading] = useState(false);
const[error , setError] = useState("");
const[success, setSuccess] = useState("");


async function handleSignup(){
 setLoading(true);
 setError("");
 if(!email || !username || !password){
    return setError("all field necessary")
 }
 try {
    const res = await  axios.post("http://localhost:12000/api/v1/auth/signup",{
        email,
        username,
        password
    })

    setSuccess( res.data);
 } catch (error) {
    console.error(error);
    console.log( "error occur in signup");
 }finally{
    setLoading(false);
 }
 
}

  return (
    <>
    <div>
    <input value={email}   onChange={(e)=>setEmail(e.target.value)} placeholder='enter the email'/>
    <input value={username}   onChange={(e)=>setUsername(e.target.value)} placeholder='enter the username'/>
    <input value={password}   onChange={(e)=>setPassword(e.target.value)} placeholder='enter the Password'/>
    </div>
    <div>
        <button onClick={handleSignup} disabled={loading}>
            {loading ? "signin up ..":"signup"}
        </button>
    </div>
    {error && <p className='text-red-500'>{error}</p>}
    {success && (
        <div>
            <p>welcome !</p>
        </div>
    )}
    </>
  )
}

export default Signup