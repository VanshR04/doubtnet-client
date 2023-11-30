import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import './AddDoubt.css'
import React from 'react';
import { Navigate, useLoaderData, useLocation, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
function AddDoubt(){
    const [head, sethead] = React.useState('')
    const [body, setBody] = React.useState('')
    const [redirect, setredirect] = React.useState(false)
    const location = useLocation()
    const author = location.state.user
    console.log(author);
    const history = useNavigate()

    async function submit(ev){
        const data = new FormData()
        data.set('author', author)
        data.set('head', head)
        data.set('body', body)
        ev.preventDefault()
        console.log(data);
        await fetch(`${process.env.REACT_APP_API_URL}/newdoubt`,{
            method:'POST',
            body : data,
            credentials : 'include'
        }).then(setredirect(true))
    }

    if(redirect){
        history('/home', {
            state : {name : author}
        }) 
    }

    const handleBodyChange = (value) => {
        setBody(value);
      }

    return(<>
        <Navbar />
        <div className='add-doubt'>
            <h2>Header</h2>
            <form onSubmit={submit}>
            <input type='text' className='head-add' value = {head} onChange={(e) => sethead(e.target.value)}/>
            <ReactQuill theme="snow" className='description-add' onChange={handleBodyChange}/>
            <button className='submit' onClick={submit}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default AddDoubt