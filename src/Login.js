import { useState } from "react"
import './Signup.css'
import { Link, useNavigate } from "react-router-dom"



function Login(){

    const history = useNavigate()
    const [password,setpassword] = useState('')
    const [email,setemail] = useState('')
    const [show, setshow] = useState(false)
    const[redirect, setredirect] = useState(false)
    const [username, setusername] = useState("")

    function changeshow(){
        setshow(!show)
    }

    async function login(ev){
        const data = new FormData()
        data.set('email', email)
        data.set('password', password)
        ev.preventDefault()
       const response =  await fetch(`${process.env.REACT_APP_API_URL}/login`,{
            method : 'POST',
            body : data
        })
        
        if (response.ok) {
            const user = await response.json();
            if(user !== "notexist"){
            console.log("Login successful:", user.name);
            setusername(user.name)
            setredirect(true)
            }

            else{
                console.log("Login failed...s");
                alert("User doesnt exist...")
                // Handle login failure, e.g., show an error message.
            }
            // Handle successful login here, e.g., set user data in the state.
        } 

    }



    if(redirect){
        history('/home',{state :{name:username}})
    }

    return(
        <div className="container">
            <h1>Login</h1>
            <form className="login-form">
                <div className="email-head">Email</div>
                <input type="email" required className="email" onChange={(e) => setemail(e.target.value)} value={email}/><br/>
                <div className="password-head">Password</div>
                {!show && (<div>
                    <input type="password" className="name" value = {password} onChange={(e) => setpassword(e.target.value)} />
                    <button className="show-password" onClick={changeshow}>Show Password</button>
                    </div>
                )}
                {show && (
                    <div>
                    <input type="text" className="name" value = {password} onChange={(e) => setpassword(e.target.value)} />
                        <button className="show-password" onClick={changeshow} >Hide Password</button>
                        </div>
                )}
                <button className="submit" onClick={login}>Login</button>
                <Link to={'/'} className="submit">Signup</Link>
            </form>
        </div>
    )
}

export default Login