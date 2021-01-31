import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
    const history = useHistory()
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [location,setLocation]= useState('')
    const [address,setAddress]= useState('')
    const [description,setDescription]= useState('')
    const [image, setImage] = useState(null)
    const [imgUrl, setImgUrl] = useState(undefined)

    useEffect(() => {
      if(image){
        uploadPic()
      }
      console.log(imgUrl)
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
        console.log(imgUrl)
        if (!name) {
            M.toast({html: 'Please enter name', classes:'#c62828 red darken-3'})
            return
         }else if (!/\S+@\S+\.\S+/.test(email)) {
            M.toast({html: 'Invalid Email', classes:'#c62828 red darken-3'})
            return
          }else if (!phone) {
            M.toast({html: 'Business contact is required', classes:'#c62828 red darken-3'})
            return
        }else if (!address) {
            M.toast({html: 'Address is required', classes:'#c62828 red darken-3'})
            return
        }else if (!description) {
            M.toast({html: 'A brief description of your business is required', classes:'#c62828 red darken-3'})
            return
        }else if(!image){
            fetch('http://localhost:5000/business/newbusiness',{
                method:'post',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    name,
                    phone,
                    location,
                    address,
                    description,
                    email,
                    
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:'#c62828 red darken-3'})
    
                }else{
                    M.toast({html: data.message, classes:'#43a047 green darken-1'})
                   // history.push('/signin')
                }
            }).catch(err=>{
                console.log(err)
            })
        }else {
            fetch('http://localhost:5000/business/newbusiness',{
                method:'post',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    name,
                    phone,
                    location,
                    address,
                    description,
                    email,
                    imgUrl
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:'#c62828 red darken-3'})
    
                }else{
                    M.toast({html: data.message, classes:'#43a047 green darken-1'})
                   // history.push('/signin')
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
               placeholder='location'
               onChange={(e)=>setLocation(e.target.value)}
               />
               <input
               type='text'
               placeholder='address'
               onChange={(e)=>setAddress(e.target.value)}
               />
               <input
               type='text'
               placeholder='email'
               onChange={(e)=>setEmail(e.target.value)}
               />

               <input type='text'
               placeholder='phone'
               onChange={(e)=>setPhone(e.target.value)}
               />
                 <input
               type='text'
               placeholder='Description'
               onChange={(e)=>setDescription(e.target.value)}
               />
                 <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Add Cover Image</span>
                    <input type="file" onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={PostData}>
                    Register Business
                </button>
               
           </div>
       </div>
    )
}

export default Signup

