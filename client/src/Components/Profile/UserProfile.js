import React, {useEffect,useState,useRef} from 'react'
import { useStateValue } from '../../StateProvider';
import {useParams} from 'react-router-dom'
import { actionTypes } from '../../reducer';
import M from 'materialize-css'
import PostModal from '../PostModal';
import PostGallery from '../PostGallery'
import Footer from '../Footer'

function Profile() {
    const [{user}, dispatch ] = useStateValue ()
    const [profile, setProfile] = useState([])
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const postModal =useRef(null)
    const [postData, setPostData] = useState([])
    const {id} = useParams()
    const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
   

    useEffect(() => {
    M.Modal.init(postModal.current)
        fetch(`http://localhost:5000/user/${id}`,{
         
             headers:{
              "Authorization":"Bearer "+ localStorage.getItem("jwt")
             }
         }).then(res=>res.json())
         .then(result=>{
          //console.log(result)
            setProfile(result)
             
         }).catch(err=>{
             console.log(err)
         }) 
        
     }, [])

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
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,result._id]
                    }
                }
            })
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
            setShowFollow(true)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }

        //click on a post open Modal
        const showPostModal = (id)=>{
            var instance = M.Modal.getInstance(postModal.current);
            instance.open()
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
           
        }
           
        
    return (
        <div className='profile' >
            <div className='profile_top'>
                <div className='profile_image'>
                    <img 
                    src={profile.user?.photo}
                    alt=''/>
                </div>
                <div className='profile_details'>
                    <h5>{profile.user?.name}</h5>
                    <h6>{profile.user?.email}</h6>
                    <div style={{display:'flex',justifyContent:'space-between', width:'108%'}}>
                        <h6>{profile.posts?.length} posts</h6>
                        <h6>{profile.user?.followers.length} followers</h6>
                        <h6>{profile.user?.following.length} following</h6>
                    </div>
                    {showFollow? <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={followUser} style={{margin:'10px'}}>
                        follow
                    </button>: <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={unFollowUser} style={{margin:'10px'}}>
                        unfollow
                    </button>}
               
                </div>
            </div>

            <div className='gallery'>
            <PostGallery 
                postData={postData}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={profile.posts}
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
