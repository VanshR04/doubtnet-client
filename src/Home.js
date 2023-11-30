import { Suspense, useEffect, useState } from 'react'
import './Home.css'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";

function Home() {

    const history = useNavigate()

    const [doubts, setdoubts] = useState([])
    const [reply, setreply] = useState("")
    const [user,setuser] = useState(null)
    const [likes,setlikes] = useState(null)
    const location = useLocation()
    const [dlike,setdlike] = useState(false)
    const [del,setdel] = useState(0)
    const [wanttoreply, setwanttoreply] = useState(false)
    const box = document.getElementById("reply")
    useEffect(() => {
        if(location.state && location.state.name!==null){
        setuser(location.state.name)
        }
        fetch(`${process.env.REACT_APP_API_URL}/doubts`).then(response => {
            response.json().then(doubts => {
                setdoubts(doubts)
            })
        })
    },[location.state,doubts,del,reply])
    async function like(id) {
        await fetch(`${process.env.REACT_APP_API_URL}/${id}/like`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setlikes(!likes)
        setdlike(true)
    }

    async function dislike(id){
        await fetch(`${process.env.REACT_APP_API_URL}/${id}/dislike`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setlikes(!likes)
        setdlike(false)
    }

    async function replycom(id) {
        const data = {
            reply: reply
        }
        await fetch(`${process.env.REACT_APP_API_URL}/${id}/reply`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })        
        setreply('')
        box.innerText = ""
    }

    async function deletecom(id){
        await fetch(`${process.env.REACT_APP_API_URL}/${id}/delete`, {
            method: "DELETE"
        })
        setdel(del+1)
        console.log("deleted");
    }
    

    return (
        <>
        <Navbar />
            <Suspense fallback="Loading...">
                {doubts.length > 0 && doubts.map(doubt => (
                    <div className='doubt'>
                        <div className='author'>{doubt.author}</div>
                        <h1 className="doubt-head">{doubt.head}</h1>
                        <h3 className='doubt-description'>{doubt.body.substring(3, doubt.body.length - 4)}</h3>
                        <div className='bottom'>
                            <textarea className={doubt._id} style={{"width" : "100%" ,"padding" : "8px" , "border": "1px solid #ccc", "border-radius" : "5px", "font-size" : "14px"}} id  = "reply" onChange={(e) => setreply(e.target.value)} key = {doubt._id}></textarea>
                            <div className='doubt-reply' onClick={() => replycom(doubt._id)}>reply</div>
                            {/* <div className={doubt._id} style = {{"color": "#007bff",  "cursor": "pointer",  "font-size": "14px",  "margin-left": "10px"}} onClick={() => like(doubt._id)}><AiOutlineLike /> {doubt.likes}</div>
                            <div className={doubt._id} style = {{"color": "#007bff",  "cursor": "pointer",  "font-size": "14px",  "margin-left": "10px"}} onClick={() => dislike(doubt._id)}><AiTwotoneLike /> {doubt.likes}</div> */}
                            {user === doubt.author && <div className='delete' onClick={() => deletecom(doubt._id)}>Delete</div>}
                        </div>
                        {doubt.replies.length > 0 && (
                                <ul className='doubt-list'>
                                    {doubt.replies.map((reply, index) => (
                                        <li className = "list-ind" key={index}>{reply}</li>
                                    ))}
                                </ul>
                            )}
                    </div>
                ))}
                {doubts.length === 0 && <div className='no-doubts'>No doubts to show</div>}
            </Suspense>
        </>
    )
}

export default Home