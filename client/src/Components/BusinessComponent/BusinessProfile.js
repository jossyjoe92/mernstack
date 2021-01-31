import React, {useEffect,useState} from 'react'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import Loader from 'react-loader-spinner'
import {useHistory} from 'react-router-dom'

import PostGallery from '../PostGallery'

function BusinessProfile() {
    const [{user}, dispatch ] = useStateValue ()
    const [ business,setBusiness] = useState()
    const [myPics, setMyPics] = useState([])
    const [image, setImage] = useState(null)
    const [displayPhoto,setDisplayPhoto]= useState()
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
 const history = useHistory()
 
  useEffect(()=>{
      if(user !== null){
        fetch(`http://localhost:5000/business/${user?.businessRegistered}`,{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           setBusiness(result)
           setDisplayPhoto(result.business.photo)
        }).catch(err=>{
            console.log(err)
        }) 
      }
   
  },[user])
  /*
    useEffect(() => {
       fetch("http://localhost:5000/mypost",{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
           setMyPics(result.myposts)
           
        }).catch(err=>{
            console.log(err)
        }) 
       
    }, [])
*/
    useEffect(() => {
        if(image){
         setIsLoading(true)
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
            setDisplayPhoto(data.url)
             fetch('http://localhost:5000/updatecoverphoto',{
      method:'put',
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
         Id:user.businessRegistered,
          imgUrl:data.url,
      })
      }) 
      .then(res=>res.json())
     .then(data =>{
      
       setIsLoading(false)
     
       })
       .catch(err => console.log(err));
            
           
         })
         .catch(err=>{
           console.log(err)
         })
                
        }
    }, [image])

    const updatePic = (file)=>{
        setImage(file)
        
    }

    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }
    return (
        <div className='business_profile' >
            <div className='business_profile_top'>
                <div className='business_profile_image'>
                    {isLoading?
                    <div ><img src={business?.business.photo} alt=''/><Loader className='loader' type="TailSpin" color="#00BFFF" height={40} width={40} /> </div>: <img src={displayPhoto&&displayPhoto} alt=''/>}
                   
                  
					<input type="file" accept="image/*"  id="input" onChange={e=>updatePic(e.target.files[0])} />
					<div className="label">
                        <label className="image-upload" htmlFor="input">
                            <i className="material-icons icon">add_a_photo</i>
					    </label>
                    </div>
			
                    
                </div>
                <div className='profile_details'>
                    <h5>{business?.business.name}</h5>
                    <h6>{business?.business.address}</h6>
                    <h6>{business?.business.email}</h6>
                   
                    <div style={{display:'flex',justifyContent:'space-between', width:'108%'}}>
                        <h6>{business?.posts.length} posts</h6>
                        <h6>{business?.business.subscribers.length} Subscribers</h6>
                    </div>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>history.push('./businesspost')}>Post a product or service</button>
                </div>
            </div>

             <div className='gallery'>
                <PostGallery 
                postData={business?.business?.name}
                profile={true}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={business?.posts}
                product={true}
                />
                
             
            </div>
        </div>
    )
}

export default BusinessProfile
