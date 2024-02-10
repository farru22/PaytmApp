import { NavBar } from "../components/NavBar";
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react";
import axios from "axios";
import { useState } from 'react'
import { Popup } from 'reactjs-popup'
import { Heading } from '../components/Heading'



export function DashBoard() {
    const token = sessionStorage.getItem('token');
    const id = jwtDecode(token)
    const [amount, setAmount] = useState('200')
    const [users, setUsers] = useState([{}])
    const [filter, setFilter] = useState('');
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        async function fetch() {

            const res = await axios.get('http://localhost:3000/api/v1/user/bulk', {
                params: {
                    filter: filter
                }
            })
            setUsers(res.data.user)
            if (res.data.err) {
                alert('Some error bro!!')
                return
            }

        }
        fetch()
    }, [filter])
    useEffect(()=>{
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        async function fetch()
        {
            const res = await axios.get('http://localhost:3000/api/v1/user/details',{
                headers
            })
            if(res.data.error)
            {
                alert(res.data.error)
                return
            }
            setUserName(res.data.user.firstName)
        }
        async function balance()
        {
            const res = await axios.get('http://localhost:3000/api/v1/accounts/balance',{
                headers
            })
            const amt = parseInt(res.data.balance);
            setAmount(amt.toString())
        }
        fetch()
        balance()
    },[])
    return <div className="w-screen h-screen">
        <NavBar username={userName}></NavBar>
        <div className="flex p-3 mt-3">
            <h1 className="text-xl font-bold">Your Balance :</h1>
            <h1 className="text-xl font-bold ml-3">₹{amount}</h1>
        </div>
        <div className="p-3">
            <h1 className="text-xl font-bold">Users</h1>
        </div>
        <div className="p-3 w-screen">
            <input className="border-2 p-2 w-full rounded" onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." />
        </div>
        <div className="p-3 w-screen">
            {
                users.map((user) => {
                    return <UserList userId={user._id} user={user} token = {token}></UserList>
                })
            }
        </div>
    </div>
}

function UserList({ user, userId,token }) {
    const [amount,setAmount] = useState('');
    return <div className="flex w-full justify-between p-2">
        <div className="flex">
            <div className="text-center bg-gray-200   rounded-full w-8 h-8">
                <h1 className=" text-lg font-medium ">U</h1>
            </div>
            <h1 className="ml-2 text-lg font-medium">{user.firstName}</h1>
        </div>
        <div>
            <Popup trigger={
                <button className='bg-black text-white w-full p-2 pt-2 pb-2 rounded mt-2'>Send Money</button>
            } position="center center"
                modal nested>
                {
                    close => (
                        <div className='w-screen h-screen flex flex-col justify-center items-center'>
                            <div className="w-1/4  p-3 rounded shadow-md">
                                <div>
                                    <Heading text='Send Money'></Heading>
                                </div>
                                <div className="flex p-2 mt-4">
                                    <div className="w-8 h-8 rounded-full flex justify-center bg-green-500"><p className="mt-1 font-bold text-white">A</p></div>
                                    <h1 className="ml-3  font-bold text-xl">Friends Name</h1>
                                </div>
                                <div>Amount (in Rs)</div>
                                <div className="mt-5 w-full">
                                    <input onChange={(e)=>{
                                        setAmount(e.target.value)
                                    }} className="p-2 w-full border rounded" placeholder="Enter Amount" type="text" />
                                </div>
                                <div className="mt-3 w-full">
                                    <button className="w-full p-2 bg-green-500 rounded text-white font-medium" onClick=
                                        {async () => {
                                            const headers = {
                                                'Authorization': 'Bearer ' + token
                                            };
                                            const res = await axios.post('http://localhost:3000/api/v1/accounts/transfer', {
                                                to: userId,
                                                amount: amount
                                            }, {
                                                headers
                                            })
                                            if (res.data.error) {
                                                alert(res.data.error)
                                                return
                                            }
                                            console.log(res.data.msg)
                                            window.location.reload(false)
                                            close()
                                        }}>
                                        Initiate Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* <div>Hello this is Popup Modal</div> */}
            </Popup>


        </div>
    </div>
}