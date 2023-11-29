import { Suspense, useEffect, useState } from 'react'
import './Home.css'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'

function Home() {

    const history = useNavigate()

    const [doubts, setdoubts] = useState([])
    const [reply, setreply] = useState("")
    const [user,setuser] = useState(null)
    const [likes,setlikes] = useState(true)
    const location = useLocation()
    useEffect(() => {
        if(location.state && location.state.name!==null){
        setuser(location.state.name)
        }
        fetch(`${process.env.REACT_APP_API_URL}/doubts`).then(response => {
            response.json().then(doubts => {
                setdoubts(doubts)
            })
        })
    },[location.state])
    async function like(id) {
        await fetch(`${process.env.REACT_APP_API_URL}/${id}/like`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setlikes(!likes)
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
        }).then(setreply(''))
    }

    async function deletecom(id){
        await fetch(`${process.env.REACT_APP_API_URL}/${id}/delete`, {
            method: "DELETE"
        })
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
                            <textarea className='reply-text' onChange={(e) => setreply(e.target.value)} key = {doubt._id} value={reply}></textarea>
                            <div className='doubt-reply' onClick={() => replycom(doubt._id)}>reply</div>
                            <div className='add-favourite' onClick={() => like(doubt._id)}>Like {doubt.likes}</div>
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