import { useState } from "react"
import './Signup.css'
import { Link, useNavigate } from "react-router-dom"

function Signup(){
    const history = useNavigate()

    const [name,setname] = useState('')
    const [password,setpassword] = useState('')
    const [email,setemail] = useState('')
    const [show, setshow] = useState(false)
    const[redirect, setredirect] = useState(false)
    const [guest,setguest] = useState(false)

    function changeshow(){
        setshow(!show)
    }

   async function adduser(ev){
        const data = new FormData()
        data.set('name', name)
        data.set('email', email)
        data.set('password', password)
        ev.preventDefault()
        await fetch(`${process.env.REACT_APP_API_URL}/signup`,{
            method:'POST',
            body : data,
            credentials : 'include'
        }).then(async (res) =>{
            const response = await res.json()
            if(response === 'exist'){
                alert("User Exists")
            }
            else if(response === "notexist"){
                alert("Signup succesful")
                setredirect(true)
            }
        })
    }

    function guestContinue(ev){
        ev.preventDefault()
        setguest(true)
    }

    if(redirect){
        history('/home', {
            state : {name : name}
        })
    }

    if(guest){
        history('/home')
    }

    return(
        <div className="container">
            <h1>Signup</h1>
            <form className="login-form">
                <div className="name-head">Name</div>
                <input type="text" className="name" onChange={(e) => setname(e.target.value)} value={name}/><br/>
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
                <button className="submit" onClick={adduser}>Signup</button>
                <Link to={'/login'}>Login</Link>
                <button className="submit" onClick={guestContinue}>Continue as Guest</button>
            </form>
        </div>
    )
}

export default Signup