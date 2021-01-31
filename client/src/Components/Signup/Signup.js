import React, { useState, useEffect } from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
    const history = useHistory()
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [image, setImage] = useState('')
    const [imgUrl, setImgUrl] = useState(undefined)

    useEffect(() => {
      if(image){
        uploadPic()
      }
     
    }, [image])
    const uploadPic = ()=>{

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
             console.log(data.url)
            setImgUrl(data.url)
           //postData(data.url)
         })
         .catch(err=>{
           console.log(err)
         })
        
    }
    const PostData = () =>{
       
        if (!name) {
            M.toast({html: 'Please enter name', classes:'#c62828 red darken-3'})
            return
         }else if (!/\S+@\S+\.\S+/.test(email)) {
            M.toast({html: 'Invalid Email', classes:'#c62828 red darken-3'})
            return
          }else if (!password) {
            M.toast({html: 'Password is required', classes:'#c62828 red darken-3'})
            return
        }else if(!image){
            fetch('http://localhost:5000/signup',{
                method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    password,
                    email,
                    
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:'#c62828 red darken-3'})
    
                }else{
                    M.toast({html: data.message, classes:'#43a047 green darken-1'})
                    history.push('/signin')
                }
            }).catch(err=>{
                console.log(err)
            })
        }else {
            fetch('http://localhost:5000/signup',{
                method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    password,
                    email,
                    imgUrl
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:'#c62828 red darken-3'})
    
                }else{
                    M.toast({html: data.message, classes:'#43a047 green darken-1'})
                    history.push('/signin')
                }
            }).catch(err=>{
                console.log(err)
            })
        }

        
         
        
    }
    return (
       <div className='mycard'>
           <div className='card auth-card input-field'>
               <h2>Instagram</h2>
               <input
               type='text'
               placeholder='name'
               onChange={(e)=>setName(e.target.value)}
               />
               <input
               type='text'
               placeholder='email'
               onChange={(e)=>setEmail(e.target.value)}
               />

               <input type='password'
               placeholder='password'
               onChange={(e)=>setPassword(e.target.value)}
               />
                 <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Add Profile Image</span>
                    <input type="file" onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={PostData}>
                    Signup
                </button>
                <h5>
                    <Link to='/signin'>Already have an account ?</Link>
                </h5>
           </div>
       </div>
    )
}

export default Signup

