import React, {useState,useRef,useEffect} from 'react';
import profilePic from '../Assets/profilePic.jpg'
import {useParams,useHistory,Link} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import TimeAgo from 'timeago-react';

function PostGallery({postData,postBlur,blurId,setBlurId,imageBlur,setImageBlur,userPosts,product,profile,showPostModal}) {

    const [focus,setFocus] = useState(false)
    const inputRef =useRef(null)
    const history = useHistory()
    const [{user}, dispatch ] = useStateValue ()


  return (
    <div className='viewpost_gallery'>
    {profile ?<div className='viewpost_gallery_morepost'>Posts</div>: <div className='viewpost_gallery_morepost'>More Post from {postData.postedBy?.name}</div>}

         <div className='viewpost_gallery_items'>

             {/*if profile dont filter d currently displayed post */}
         {(profile)?userPosts?.slice(0,6).map(post=>{
                     return(
                     <div key={post._id} className='viewpost_gallery_item' onMouseOver={()=>postBlur(post._id)}  onMouseLeave={()=> 
                         setTimeout(function(){
                           setImageBlur(false)
                            }, 500)} onClick={()=>product?history.push(`/viewproduct/${post._id}`):showPostModal?showPostModal(post._id):<div>Loading</div>}>
                 
                         <img className ={`${(imageBlur && (blurId===post._id)) && 'image_blur'}`} src={post.photo}  alt=''/>
                            
                         <div className="logo_wrapper">
                            {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><i className="material-icons">favorite</i></span><span>{post.likes.length}</span></p>}
                             {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><i className="material-icons">comment</i></span><span>{post.comments.length}</span></p>}
                         </div>
                     </div>
                     )
                 }):
                        userPosts?.filter(post=>post._id !==postData._id).slice(0,6).map(post=>{
                            return(
                            <div key={post._id} className='viewpost_gallery_item' onMouseOver={()=>postBlur(post._id)}  onMouseLeave={()=> 
                                setTimeout(function(){
                                setImageBlur(false)
                                    }, 500)} onClick={()=>product?history.push(`/viewproduct/${post._id}`):history.push(`/viewpost/${post._id}`)}>
                        
                                <img className ={`${(imageBlur && (blurId===post._id)) && 'image_blur'}`} src={post.photo}  alt=''/>
                                    
                                <div className="logo_wrapper">
                                    {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><i className="material-icons">favorite</i></span><span>{post.likes.length}</span></p>}
                                    {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><i className="material-icons">comment</i></span><span>{post.comments.length}</span></p>}
                                </div>
                            </div>
                            )
                        })}
                    
         </div>
 </div>
  );
}

export default PostGallery;
