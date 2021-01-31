import React, {useEffect,useState,useRef} from 'react'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import Loader from 'react-loader-spinner'
import {useHistory,Link} from 'react-router-dom'
import M from 'materialize-css'
import PostModal from '../PostModal';
import PostGallery from '../PostGallery';
import Footer from '../Footer'
function Profile() {
    const [{user}, dispatch ] = useStateValue ()
    const [myPics, setMyPics] = useState([])
    const [image, setImage] = useState(null)
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const postModal =useRef(null)
 const history = useHistory()
 const [comment,setComment]= useState('')
 const inputRef =useRef(null)
 const [postData, setPostData] = useState([])

    useEffect(() => {
        M.Modal.init(postModal.current)
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
            localStorage.setItem("user",JSON.stringify({...user,photo:data.url}))
            dispatch({
                type:actionTypes.Set_USER,
                user: {...user,
                    photo:data.url}
            })
             fetch('http://localhost:5000/updatephoto',{
      method:'put',
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
         
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

    //click on a post open Modal
    const showPostModal = (id)=>{
        console.log(myPics)
        var instance = M.Modal.getInstance(postModal.current);
        instance.open()
        fetch(`http://localhost:5000/post/${id}`,{
         
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          setPostData(result.post)
            
        }).catch(err=>{
            console.log(err)
        }) 
       
    }
       
    

    const updatePic = (file)=>{
        setImage(file)
        
    }

    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }


    const likePost=(id)=>{
        fetch('http://localhost:5000/like',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId :id
            })
        }).then(res=>res.json())
            .then(result =>{
                
                
                setPostData(result)
            }).catch(err=>{
                console.log(err)
            })
    
    }
    const unlikePost=(id)=>{
        fetch('http://localhost:5000/unlike',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId :id
            })
        }).then(res=>res.json())
            .then(result =>{
              
                setPostData(result)
            }).catch(err=>{
                console.log(err)
            })
    }
const makeComment = (text,postId)=>{
        fetch('http://localhost:5000/comment',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text,
                postId
               
            })
            }) 
            .then(res=>res.json())
           .then(result =>{
           
              const newData = postData.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setPostData(newData)
            setComment('')
            
             })
             .catch(err => console.log(err));
     
    }

    return (
        <div className='profile' >
            <div className='profile_top'>
                <div className='profile_image'>
                    {isLoading?
                    <div ><img src={user?.photo} alt=''/><Loader className='loader' type="TailSpin" color="#00BFFF" height={40} width={40} /> </div>: <img src={user?.photo} alt=''/>}
                   
                  
					<input type="file" accept="image/*"  id="input" onChange={e=>updatePic(e.target.files[0])} />
					<div className="label">
                        <label className="image-upload" htmlFor="input">
                            <i className="material-icons icon">add_a_photo</i>
					    </label>
                    </div>
			
                    
                </div>
                <div className='profile_details'>
                    <div className='profile_details_name'>
                        <h5>{user?.name}</h5>
                        {user?.businessRegistered?<button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>history.push('./businessprofile')}>Business Profile</button>:<button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>history.push('./registerbusiness')}>Register a Business </button>}
                    </div>
                    <h6>{user?.email}</h6>
                    
                    <div style={{display:'flex',justifyContent:'space-between', width:'108%'}}>
                        <h6>{myPics?.length} posts</h6>
                        <h6>{user?user.followers.length:0} followers</h6>
                        <h6>{user?user.following?.length:0} following</h6>
                    </div>
                </div>
            </div>

            <div className='gallery'>
                <PostGallery 
                showPostModal={showPostModal}
                postData={postData}
                profile={true}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={myPics}
                />
                
             
            </div>

            <div id="modal3" className="modal" ref={postModal}  >
                <PostModal
                postData={postData}
                setPostData={setPostData} />
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
