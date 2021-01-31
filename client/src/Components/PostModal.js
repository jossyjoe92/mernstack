import React, {useRef,useState,useEffect, forwardRef} from 'react';

import TimeAgo from 'timeago-react';
import {Link} from 'react-router-dom'
import { useStateValue } from '../StateProvider';

const PostModal = ({postData,setPostData}) =>{
     const [{user}, dispatch ] = useStateValue ()
    const [comment,setComment]= useState('')
 const inputRef =useRef(null)
 const [postComments, setPostComments] = useState([])

 
  useEffect(() => {
    setPostComments(postData.comments)
  }, [postData]);

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
       console.log(result)
          
        setPostComments(result.comments)
        setComment('')
        
         })
         .catch(err => console.log(err));
 
}
  return (
    <div className='viewpost_post'>
                <img src={postData?.photo} alt='img' />
                <div className='viewpost_sidecomment'>
                    <div className='viewpost_user_profile'>
                        <Link to={postData.postedBy?._id !==user?._id ? `/profile/${postData.postedBy?._id}`:'/profile'}> 
                            <img src={postData.postedBy?.photo} alt={postData.postedBy?.name} />
                        </Link>
                        <div className='viewpost_userInfo'>
                            <h6><strong>{postData.postedBy?.email}</strong></h6>
                            <h6>{postData.postedBy?.name}</h6>   
                        </div>
                        <p><strong>Follow</strong></p>
                    </div>
                    <div className='viewpost_sidecomment_comments'>
                        <div className='viewpost_sidecomment_comment'>
                            {
                                postComments?.map((comment,i)=>{
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
  );
}

export default PostModal;
