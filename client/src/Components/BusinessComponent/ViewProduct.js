import React,{useEffect,useRef,useState} from 'react'
import Footer from '../Footer'
import {useParams,useHistory,Link} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import TimeAgo from 'timeago-react';
import PostGallery from '../PostGallery'


function ViewProductPost() {  
    const inputRef =useRef(null)
    const history = useHistory()
    const [{user}, dispatch ] = useStateValue ()
    const {id} = useParams()
    const [comment,setComment]= useState('')
    const [postData, setPostData] = useState([])
    const[businessPosts, setBusinessPosts] = useState(null)
    const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const [focus,setFocus] = useState(false)

    
   // const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)

    useEffect(() => {
        
       fetch(`http://localhost:5000/businesspost/${id}`,{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
          setPostData(result.post)
            
        }).catch(err=>{
            console.log(err)
        }) 
       
    }, [id])

    useEffect(() => {
      if(postData.business===undefined){
          return
      }else{
        fetch(`http://localhost:5000/allbusinesspost/${postData.business._id}`,{
         
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
         setBusinessPosts(result.posts)
          // setProfile(result)
            
        }).catch(err=>{
            console.log(err)
        }) 
      }
          
        
       
        
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
            <div className='viewpost_post'>
                <img src={postData?.photo} alt='img' />
                <div className='viewpost_sidecomment'>
                    <div className='viewpost_user_profile'>
                        <Link to={postData.business?._id !==user?.businessRegistered ? `/businessprofile/${postData.business?._id}`:'/businessprofile'}> 
                            <img src={postData.business?.photo}  alt={postData?.name} />
                        </Link>
                        <div className='viewpost_userInfo'>
                            <h6><strong>{postData.business?.name}</strong></h6>
                            <h6>{postData.business?.email}</h6> 
                            <h6>{postData.business?.address}</h6>    
                        </div>
                        <p><strong>Follow</strong></p>
                    </div>
                    <div className='viewpost_sidecomment_comments'>
                        <div className='viewpost_sidecomment_comment'>
                            {
                                postData.comments?.map((comment,i)=>{
                                    return (
                                        <div key={comment._id} className='viewpost_sidecomment_commentDisplay'>
                                            <img src={comment.postedBy.photo} alt='' />
                                            <h6  className='comments'><span style={{fontWeight:'800',fontSize:'13px'}}>{comment.postedBy.name}</span>
                                                <span style={{fontWeight:'500',fontSize:'12px'}} >{comment.text}</span>
                            
                                            </h6>
                                        </div>
                                    )
                                })
                            }
                            
                            
                        </div>
                    </div>
                   
                    
                    <div className='viewpost_sidecomment_icons'>
                    <i  onClick={()=>{
                         const element = inputRef.current;
                         element.focus();
                    }} className="material-icons">comment</i>
                   
                            {postData.likes?.includes(user._id)?<i style={{color:'red'}}  className="material-icons" 
                            onClick={()=>{unlikePost(postData._id)}}>favorite</i>:<i className="material-icons"
                            onClick={()=>{likePost(postData._id)}}>favorite_border</i>}
                            
                            {(postData.likes?.length===1)? <h6>{postData.likes?.length} like</h6>:<h6>{postData.likes?.length} likes</h6>}
                            
                            <TimeAgo style={{fontSize:'12px'}} datetime={postData.timestamp}/>
                    </div>
                   
                    <div className='viewpost_sidecomment_addComment'>
                        <form onSubmit={(e)=>{
                                e.preventDefault();
                                makeComment(e.target[0].value,postData._id)
                                 }}>
                            <input type='text' ref={inputRef}  value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='add a comment' />
                        </form>
                    </div>

                </div>

            </div>
            <hr />
            <div className='gallery'>
                <PostGallery 
                postData={postData}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={businessPosts}
                product={true}
                />
                
             
            </div>
           
            <div className='viewpost_footer'>
                <Footer />
            </div>
        </div>
    )
}

export default ViewProductPost
