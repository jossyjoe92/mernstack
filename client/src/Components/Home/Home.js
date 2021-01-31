import React,{useState,useEffect,useRef} from 'react'
import { useStateValue } from '../../StateProvider';
import {Link,useHistory} from 'react-router-dom'
import SideComponent from './SideComponent'
import dotMenu from '../../Assets/dotmenu.png'

import M from 'materialize-css'
function Home() { 
    const dotMenuModal =useRef(null)
     const history = useHistory()
    const [{user}, dispatch ] = useStateValue ()
    const [data,setData] = useState([])
    const [comment,setComment]= useState('')
    const [commentId,setCommentId] = useState([])

    useEffect(() => {
       
       fetch('http://localhost:5000/allpost',{
           headers:{
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           
          setData(result.posts)
       
       }).catch(err=>{
           console.log(err)
       })
       
    }, [])

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
                //if(data.error){
                   // M.toast({html: data.error, classes:'#c62828 red darken-3'})
              //  }else{
                //   M.toast({html: `Post Created Successfully`, classes:'#43a047 green darken-1'})
                //   history.push('/')
                //}
             // console.log(result)
                const newData = data.map(item=>{
                    if(item._id=== result._id){
                        return result
                    }else{
                        return item
                    }
                })
                //console.log(data)
                setData(newData)
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
                //if(data.error){
                   // M.toast({html: data.error, classes:'#c62828 red darken-3'})
              //  }else{
                //   M.toast({html: `Post Created Successfully`, classes:'#43a047 green darken-1'})
                //   history.push('/')
                //}
                //console.log(data)
                const newData = data.map(item=>{
                    if(item._id===result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
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
           
              const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
            setComment('')
            
             })
             .catch(err => console.log(err));
     
    }

    const deletePost = (postId)=>{
        if(window.confirm('Are you sure to delete this post?')){
        fetch(`http://localhost:5000/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

    const deleteComment = (commentId,postId)=>{
        if(window.confirm('Are you sure to delete this comment?')){
        fetch(`http://localhost:5000/deletecomment/${postId}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               commentId
               
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
    const lovePost = (commentId)=>{

            
            setCommentId(prevState=>[...prevState,commentId])
    }

    const unLovePost = (commentId)=>{
        setCommentId(prevState=>prevState.filter(item=>item !== commentId))
    }
    
    return (
      <div className='home'>
          <div className='home-left'>
      
          {
              data.map(post=>{
                  return (
                    <div className='card home-card' key={post._id}>
                        <div className='card_header'>
                            <Link to={post.postedBy._id !==user._id ? `/profile/${post.postedBy._id}`:'/profile'}> <img 
                                src={post.postedBy.photo}
                                alt=''/> 
                            </Link>
                         <h6><Link to={post.postedBy._id !==user._id ? `/profile/${post.postedBy._id}`:'/profile'}>{post.postedBy.name}</Link></h6>
                         
                         <span className='dotMenu' onClick={()=>{
                             M.Modal.init(dotMenuModal.current,{opacity:0.5})
                              var instance = M.Modal.getInstance(dotMenuModal.current);
                              instance.open()
                         }} ><img src = {dotMenu} />
                         <div id="modal4" className="modal" ref={dotMenuModal}  >
                            <div className="modal-content"  >
             
    {(post.postedBy._id !==user._id ) ? <p onClick={()=>deletePost(post._id)}><strong>Report</strong></p>
    :<p style={{color:'red'}}><strong>Delete</strong></p>} 
    <hr />
    {user.following.includes(post.postedBy._id)?<p>Unfollow</p>:(post.postedBy._id !==user._id)&&<p>Follow</p>}
    <hr />
    <p onClick={()=>{
        var instance = M.Modal.getInstance(dotMenuModal.current);
        instance.close()
        console.log(post.postedBy._id)
        console.log(user._id)
        post.postedBy._id !==user._id ? history.push(`/profile/${post.postedBy._id}`):history.push('/profile')}
        }>
    Profile
                            
        </p>
   
            </div>
            <div className="modal-footer">
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
            {/*<a href="#!" class="modal-close waves-effect waves-green btn-flat">Follow</a>*/}Follow
            </button>
            </div>
        </div>
</span>
                        </div>
                        
                        <div className='card-image'>
                            <img src={post.photo} alt='' />
                        </div>
                         <div className='card-content'>
                            <i className="material-icons" onClick={()=>history.push(`/viewpost/${post._id}`)}>comment</i>
                            {post.likes.includes(user._id)?<i style={{color:'red'}} className="material-icons" 
                            onClick={()=>{unlikePost(post._id)}}>favorite</i>:<i className="material-icons"
                            onClick={()=>{likePost(post._id)}}>favorite_border</i>}
                            
                            {(post.likes.length===1)? <h6>{post.likes.length} like</h6>:<h6>{post.likes.length} likes</h6>}
                            <h6>{post.title}</h6>

                            <p>{post.body}</p>

                            {post.comments.slice(0,2).map(comment=>{
                            return(
                                <h6 key={comment._id} className='comments'><span style={{fontWeight:'800',fontSize:'13px'}}>{comment.postedBy.name}</span>
                                    <span style={{fontSize:'13px', marginLeft:'5px'}}>{comment.text}</span>
                                    <span className="comment_delete">{comment.postedBy._id===user._id && <i className="tiny material-icons" onClick={()=>
                                    deleteComment(comment._id,post._id)}>delete</i>}{(commentId.includes(comment._id)) ? <i style={{color:'red'}} 
                                    className="tiny material-icons" onClick={()=>unLovePost(comment._id)} >favorite</i>:<i className="tiny material-icons" onClick={()=>lovePost(comment._id)}
                                    >favorite_border</i>}</span>
                                </h6>
                                )
                            })}
                            {(post.comments.length>2)&&<p style={{fontSize:'12px',cursor:'pointer'}} onClick={()=>history.push(`/viewpost/${post._id}`)}>See more comments...</p>}
                            <form onSubmit={(e)=>{
                                e.preventDefault();
                                makeComment(e.target[0].value,post._id)
                                 }}>
                            <input type='text' value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='add a comment' />
                        </form>
                        
                    </div>
                </div>
               
                  )
              })
          }
          </div>
          <div className='home-right'>
               <SideComponent />
          </div>
      </div>
    )
}

export default Home
