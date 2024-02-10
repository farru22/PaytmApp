import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { Heading } from '../components/Heading';
import { InputFeild } from '../components/InputFeild';
import { SubHeading } from '../components/SubHeading';

export function SignUp() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='w-screen h-screen bg-slate-100 flex justify-center items-center'>
            <div className='bg-white p-3 h-3/4 w-1/4 rounded-md shadow-md'>
               <Heading text='Sign Up'></Heading>
                <SubHeading text = 'Enter your info to create an account' ></SubHeading>
                <InputFeild label = 'First Name' placeholder= 'Ghazali' onChange={(e)=>{setFirstName(e.target.value)}}></InputFeild>
                <InputFeild label = 'Last Name' placeholder= 'Hussain' onChange={(e)=>{setLastName(e.target.value)}}></InputFeild>
                <InputFeild label = 'Email' placeholder= 'ghz@yahoo.com' onChange={(e)=>{setUsername(e.target.value)}} ></InputFeild>
                <InputFeild type = 'password' label = 'Password' onChange={(e)=>{setPassword(e.target.value)}}></InputFeild>
                <div className='w-full p-2 text-center'>
                    <button className='bg-black text-white w-full p-2 pt-2 pb-2 rounded mt-2' onClick={async () => {
                    const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
                        username,
                        password,
                        firstName,
                        lastName
                    });
                    if (res.data.error) {
                        alert(res.data.error)
                        return
                    }
                    sessionStorage.setItem('token', res.data.token);
                    navigate('/dashboard')
                }}>Sign Up</button></div>
                <div>
                    <Alert text = 'Already Have an Account?' buttonText='Sign In' to={'/signin'}></Alert>
                </div>
            </div>
        </div>

    );
}
{/* <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => {
                        setFirstName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => {
                        setLastName(e.target.value);
                    }} />
                </div> */}