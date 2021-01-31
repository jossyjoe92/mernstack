import React,{useState,useEffect} from 'react'
import { useStateValue } from '../../StateProvider';
import {Link,useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import ServiceAside from './ServiceAside';


function Services() { 
     const history = useHistory()
     const {subcategory} = useParams()
    const [{user}, dispatch ] = useStateValue ()
    const [data,setData] = useState([])
    const [comment,setComment]= useState('')
    const [commentId,setCommentId] = useState([])

    useEffect(() => {
        console.log(subcategory)
       fetch(`http://localhost:5000/businesssubcategory/${subcategory}`,{
           headers:{
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
         setData(result.posts)
           
       }).catch(err=>{
           console.log(err)
       })
   
    }, [subcategory])

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
                            <Link to={post.postedBy._id !==user._id ? `/businessprofile/${post?.business._id}`:'/businessprofile'}> <img 
                                src={post?.business.photo}
                                alt=''/> 
                            </Link>
                         <h6><Link to={post.postedBy._id !==user._id ? `/businessprofile/${post.business._id}`:'/businessprofile'}>{post.business.name}</Link></h6>
                         <span className='delete_post'>{post.postedBy._id===user._id && <i style={{color:'red'}} className="material-icons" 
                             onClick={()=>deletePost(post._id)}>delete</i>} </span>
                        </div>

                        <div className='card-image'>
                            <img src={post.photo} alt='' />
                        </div>
                         <div className='card-content'>
                            <i className="material-icons" onClick={()=>history.push(`/viewproduct/${post._id}`)}>comment</i>
                            {post.likes.includes(user._id)?<i style={{color:'red'}} className="material-icons" 
                            onClick={()=>{unlikePost(post._id)}}>favorite</i>:<i className="material-icons"
                            onClick={()=>{likePost(post._id)}}>favorite_border</i>}
                            
                            {(post.likes.length===1)? <h6>{post.likes.length} like</h6>:<h6>{post.likes.length} likes</h6>}
                            <h6>{post.title}</h6>
                            <p><strong>price: ${post.price}</strong></p>
                            <p>{post.description}</p>

                            {post.comments.map(comment=>{
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
          <div className='home_user_profile'>
                <img src={user?.photo} alt={user?.name} />
                <div className='home_userInfo'>
                    <h6><strong>{user?.email}</strong></h6>
                    <h6>{user?.name}</h6>   
                </div>
                <p><strong>Switch</strong></p>
            </div>
            <div className='product_aside'>
                <div className='product_asideHeader'>
                    <h6>Categories</h6>
                </div>
           
                <ServiceAside />

         
            </div>
          </div>
      </div>
    )
}

export default Services
