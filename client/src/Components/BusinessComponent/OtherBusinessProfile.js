import React, {useEffect,useState} from 'react'
import { useStateValue } from '../../StateProvider';
import {useParams} from 'react-router-dom'
import { actionTypes } from '../../reducer';
import PostGallery from '../PostGallery'

function OtherBusinessProfile() {
    const [{user}, dispatch ] = useStateValue ()
    const [profile, setProfile] = useState([])
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)

    const {id} = useParams()
    const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
   

    useEffect(() => {
      
        fetch(`http://localhost:5000/business/${id}`,{
         
             headers:{
              "Authorization":"Bearer "+ localStorage.getItem("jwt")
             }
         }).then(res=>res.json())
         .then(result=>{
            setProfile(result)
             
         }).catch(err=>{
             console.log(err)
         }) 
        
     }, [])

    const subscribeBusiness=()=>{
        fetch('http://localhost:5000/subscribe',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              subscribeId:id
               
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
                   business:{
                       ...prevState.business,
                        subscribers:[...prevState.business.subscribers,result._id]
                    }
                }
            })
            setShowFollow(false)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const unSubscribeBusiness=()=>{
        fetch('http://localhost:5000/unsubscribe',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unsubscribeId:id
               
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
                const newFollowers = prevState.business.subscribers.filter(item=>item !== result._id)
                return {
                    ...prevState,
                    business:{
                        ...prevState.business,
                        subscribers:newFollowers
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
    return (
        <div className='business_profile' >
            
            <div className='business_profile_top'>
                <div className='business_profile_image'>
                    <img 
                    src={profile.business?.photo}
                    alt=''/>
                </div>
                <div className='profile_details'>
                    <h5>{profile.business?.name}</h5>
                    <h6>{profile.business?.email}</h6>
                    <div style={{display:'flex',justifyContent:'space-between', width:'108%'}}>
                        <h6>{profile.posts?.length} posts</h6>
                        <h6>{profile.business?.subscribers.length} subscribers</h6>
                        
                    </div>
                    {showFollow? <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={subscribeBusiness} style={{margin:'10px'}}>
                        Subscribe
                    </button>: <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={unSubscribeBusiness} style={{margin:'10px'}}>
                        unsubscribe
                    </button>}
               
                </div>
            </div>

            <div className='gallery'>
                <PostGallery 
                postData={profile?.business}
                profile={true}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={profile?.posts}
                product={true}
                />
                
             
            </div>
            
            
        </div>
    )
}

export default OtherBusinessProfile
