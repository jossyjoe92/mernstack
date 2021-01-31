import React, {useState} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

function CreatePost() {
const history= useHistory()
    const [title,setTitle]= useState('')
    const [body,setBody]= useState('')
    const [image, setImage] = useState();


    const onSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            M.toast({html: 'Please enter post title', classes:'#c62828 red darken-3'})
            return
         }else if (!body) {
            M.toast({html: 'Invalid Enter your post', classes:'#c62828 red darken-3'})
            return
          }else if (!image) {
            M.toast({html: 'No Image selected', classes:'#c62828 red darken-3'})
            return
        }

         
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "instaclone")
          data.append("cloud_name", "jossyjoe")
           fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload",{
             method: "post",
             body: data
           })
           .then(res=>res.json())
           .then(data=>{
         
             postDetails(data.url)
           })
           .catch(err=>{
             console.log(err)
           })
          
    }

    const postDetails = (data)=>{
  
     fetch('http://localhost:5000/createpost',{
      method:'post',
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          title,
          body,
          imgUrl:data,
      })
      }) 
      .then(res=>res.json())
     .then(data =>{
         if(data.error){
             M.toast({html: data.error, classes:'#c62828 red darken-3'})
         }else{
            M.toast({html: `Post Created Successfully`, classes:'#43a047 green darken-1'})
            history.push('/')
         }
     
       })
       .catch(err => console.log(err));
}
    return (
        <div className='card input-filed'
            style={{
                margin:'10px auto',
                maxWidth:'500px',
                padding:'20px',
                textAlign:"center"
            }}>
            <input type='text' placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type='text' placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)} />

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={onSubmit}>
                    Submit Post
                </button>

        </div>
    )
}

export default CreatePost
