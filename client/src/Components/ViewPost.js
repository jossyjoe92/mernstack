import React,{useEffect,useRef,useState} from 'react'
import Footer from './Footer'
import profilePic from '../Assets/profilePic.jpg'
import {useParams,useHistory,Link} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import TimeAgo from 'timeago-react';
import PostModal from './PostModal';
import PostGallery from './PostGallery';



function ViewPost() {  
   
    const [{user}, dispatch ] = useStateValue ()
    const {id} = useParams()
    const [ blurId, setBlurId] = useState(null)
    const[userPosts, setUserPosts] = useState(null)
    const [postData, setPostData] = useState([])
    const[imageBlur,setImageBlur]= useState(false)
    const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
     const [comment,setComment]= useState('')
   // const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
    useEffect(() => {
       fetch(`http://localhost:5000/post/${id}`,{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
          setPostData(result.post)
            
        }).catch(err=>{
            console.log(err)
        }) 
       
    }, [id])

    useEffect(() => {
        
            fetch(`http://localhost:5000/user/${postData.postedBy?._id}`,{
         
                headers:{
                 "Authorization":"Bearer "+ localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
             setUserPosts(result.posts)
              // setProfile(result)
                
            }).catch(err=>{
                console.log(err)
            }) 
        
       
        
     }, [postData])

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
    const followUser=()=>{
        fetch('http://localhost:5000/follow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              followId:id
               
            })
            }) 
            .then(res=>res.json())
           .then(result =>{
            
            localStorage.setItem("user",JSON.stringify(result))
            dispatch({
                type:actionTypes.Set_USER,
                user: result
            })
            /*
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,result._id]
                    }
                }
            })
            */
            setShowFollow(false)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const unFollowUser=()=>{
        fetch('http://localhost:5000/unfollow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              unfollowId:id
               
            })
            }) 
            .then(res=>res.json())
           .then(result =>{
            
            localStorage.setItem("user",JSON.stringify(result))
            dispatch({
                type:actionTypes.Set_USER,
                user: result
            })
            /*
            setProfile((prevState)=>{
                const newFollowers = prevState.user.followers.filter(item=>item !== result._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollowers
                    }
                }
            })
            */
            setShowFollow(true)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
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

    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }

    return (
        <div className='viewpost'>
           <PostModal postData={postData} setPostData={setPostData}/>
            <hr />
           
           <PostGallery 
           postData={postData}
           postBlur={postBlur}
           blurId={blurId}
           imageBlur={imageBlur}
           setImageBlur={setImageBlur}
           userPosts={userPosts}
           />
            <div className='viewpost_footer'>
                <Footer />
            </div>
        </div>
    )
}

export default ViewPost
