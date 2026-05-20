import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './Signup.css' 
import { useState } from 'react'
import { handelError, handelSuccess } from '../utils'

function Signup() {
    
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handelChange = (e) => {
        const {name, value} = e.target;
        // console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log('signup info  -- > ', signupInfo)

    const handelSignup = async (e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password) {
            return handelError('All fields are required!')
        }
        try{
            const url = "https://login-api-murex.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message, error} = result;
            if(success) {
                handelSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }else if (error) {
                const det = error?.details[0].message;
                handelError(det);
            }else if(!success) {
                handelError(message);
            }
        }catch(err) {
            handelError(err);
        }
    }

  return (
    <div id="signuppage_container" className='signup'>
        <div id="signuppage_card">
            <h1 id="signuppage_title">Signup</h1>
            <form onSubmit={handelSignup}>
                <div id="signuppage_formGroup">
                    <label id="signuppage_label" htmlFor='name'>Name</label>
                    <input 
                        onChange={handelChange}
                        id="signuppage_input"
                        type='text' 
                        name='name' 
                        autoFocus 
                        placeholder='Enter your Name'
                        value={signupInfo.name}
                    />
                </div>
                
                <div id="signuppage_formGroup">
                    <label id="signuppage_label" htmlFor='email'>Email</label>
                    <input 
                        onChange={handelChange}
                        id="signuppage_input"
                        type='email' 
                        name='email' 
                        placeholder='Enter your Email'
                        value={signupInfo.email}
                    />
                </div>
                
                <div id="signuppage_formGroup">
                    <label id="signuppage_label" htmlFor='password'>Password</label>
                    <input 
                        onChange={handelChange}
                        id="signuppage_input"
                        type='password' 
                        name='password' 
                        placeholder='Enter your password'
                        value={signupInfo.password}
                    />
                </div>

                <button id="signuppage_button" type="submit">Signup</button>
                
                <div id="signuppage_footer">
                    <span id="signuppage_spanText">
                        Already have an account?
                        <Link id="signuppage_loginLink" to='/login'>Login</Link>
                    </span>
                </div>
            </form>
            <ToastContainer id="signuppage_toastContainer" />
        </div>
    </div>
  )
}

export default Signup
