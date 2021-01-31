import React,{useState,useEffect} from 'react'
import { useStateValue } from '../StateProvider';
import {Link} from 'react-router-dom'

function MyFollowingPost() {
    const [{user}, dispatch ] = useStateValue ()
    const [data,setData] = useState([])

    useEffect(() => {
       fetch('http://localhost:5000/mysubscribedpost',{
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
              console.log(result)
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
            
             })
             .catch(err => console.log(err));
     
    }

    const deletePost = (postId)=>{
        fetch(`http://localhost:5000/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const deleteComment = (commentId)=>{
        fetch(`http://localhost:5000/deletecomment/${commentId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
      <div className='home'>
          {
              data.map(post=>{
                  return (
                    <div className='card home-card' key={post._id}>
                    <h5><Link to={post.postedBy._id !==user._id ? `/profile/${post.postedBy._id}`:'/profile'}>{post.postedBy.name}</Link> {post.postedBy._id===user._id && <i style={{color:'red'}} className="material-icons" style={{float:'right'}}
                    onClick={()=>deletePost(post._id)}>delete</i>} </h5>
                    <div className='card-image'>
                        <img src={post.photo} alt='' />
                    </div>
                    <div className='card-content'>
                      <i style={{color:'red', cursor:'pointer'}} className="material-icons">favorite</i>
                      {post.likes.includes(user._id)?<i className="material-icons" style={{color:'blue', cursor:'pointer'}}
                      onClick={()=>{unlikePost(post._id)}}>thumb_down</i>:<i className="material-icons"
                      onClick={()=>{likePost(post._id)}}>thumb_up</i>}
                      
                      {(post.likes.length===1)? <h6>{post.likes.length} like</h6>:<h6>{post.likes.length} likes</h6>}
                        <h6>{post.title}</h6>
                        <p>{post.body}</p>
                        {post.comments.map(comment=>{
                            return(
                                <h6 key={comment._id}>{comment.postedBy._id===user._id && <i style={{color:'red'}} className="material-icons" onClick={()=>deleteComment(comment._id)}>delete</i>}<span style={{fontWeight:'500',fontSize:'13px'}}>{comment.postedBy.name}</span> <span style={{fontSize:'12px'}}>{comment.text}</span></h6>
                            )
                        })}
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            makeComment(e.target[0].value,post._id)
                        }}>
                            <input type='text' placeholder='add a comment' />
                        </form>
                        
                    </div>
                </div>
               
                  )
              })
          }
          
      </div>
    )
}

export default MyFollowingPost
