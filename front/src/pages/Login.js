import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './Login.css'  // ← Import the new CSS
import { useState } from 'react'
import { handelError, handelSuccess } from '../utils'

function Login() {
    
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    
    const handelChange = (e) => {
        const {name, value} = e.target;
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    console.log('login info -- > ', loginInfo)

    const handelLogin = async (e) => {
        e.preventDefault();
        const {email, password} = loginInfo;
        if(!email || !password) {
            return handelError('All fields are required!')
        }
        try{
            const url = "https://login-api-murex.vercel.app/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const {success, message, token, name} = result;
            
            if(success) {
                // Store token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', name);
                handelSuccess(message);
                setTimeout(() => {
                    navigate('/home') 
                }, 1000)
            } else {
                handelError(message);
            }
        } catch(err) {
            handelError(err.message);
        }
    }

  return (
    <div id="loginpage_container" className='login'>
        <div id="loginpage_card">
            <h1 id="loginpage_title">Login</h1>
            <form onSubmit={handelLogin}>
                
                <div id="loginpage_formGroup">
                    <label id="loginpage_label" htmlFor='email'>Email</label>
                    <input 
                        onChange={handelChange}
                        id="loginpage_input"
                        type='email' 
                        name='email' 
                        placeholder='Enter your Email'
                        value={loginInfo.email}
                    />
                </div>
                
                <div id="loginpage_formGroup">
                    <label id="loginpage_label" htmlFor='password'>Password</label>
                    <input 
                        onChange={handelChange}
                        id="loginpage_input"
                        type='password' 
                        name='password' 
                        placeholder='Enter your password'
                        value={loginInfo.password}
                    />
                </div>

                <button id="loginpage_button" type="submit">Login</button>
                
                <div id="loginpage_footer">
                    <span id="loginpage_spanText">
                        Don't have an account?
                        <Link id="loginpage_signupLink" to='/signup'>Signup</Link>
                    </span>
                </div>
            </form>
            <ToastContainer id="loginpage_toastContainer" />
        </div>
    </div>
  )
}

export default Login
