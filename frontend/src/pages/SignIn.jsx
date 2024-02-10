import { useState } from "react"
import { Heading } from "../components/Heading";
import { InputFeild } from "../components/InputFeild";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Alert} from '../components/Alert'




export function SignIn()
{
    const navigate = useNavigate()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    return <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
        <div className="bg-white w-1/4 rounded shadow-md p-3">
            <Heading text='Sign In'></Heading>
            <SubHeading text='Enter your credidential to access'></SubHeading>
            <InputFeild placeholder={'ghazali@gmail.com'} label='Email' onChange={(e)=>{
                setEmail(e.target.value)
            }}></InputFeild>
            <InputFeild type = 'password' label='Password' onChange={(e)=>{
                setPassword(e.target.value)
            }}></InputFeild>
            <div className='w-full p-2 text-center'>
                    <button className='bg-black text-white w-full p-2 pt-2 pb-2 rounded mt-2' onClick={async () => {
                    const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
                        username : email,
                        password,
                    });
                    if (res.data.error) {
                        alert(res.data.error)
                        return
                    }
                    sessionStorage.setItem('token', res.data.token);
                    navigate('/dashboard')
                }}>Sign In</button></div>
                <div>
                    <Alert text = "Don't Have an Account?" buttonText='Sign Up' to={'/signup'}></Alert>
                </div>
        </div>
        
    </div>
}