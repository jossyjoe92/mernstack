import React, {useState,useRef, useEffect} from 'react'
import { useStateValue } from '../../StateProvider';
import Footer from '../Footer'
import M from 'materialize-css'


function SideComponent() {
    const [{user}, dispatch ] = useStateValue ()
    const [suggestedUsers,setSuggestedUser] = useState([])
    const [foundUser, setFoundUser] = useState([])
    const profileModal =useRef(null)
  
    
   
    useEffect(() => {
      
        M.Modal.init(profileModal.current,{opacity:0})
       fetch('http://localhost:5000/users',{
           headers:{
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
     
          setSuggestedUser(result.users)
           
       }).catch(err=>{
           console.log(err)
       })
    }, [])

    const findUser = (userId)=>{
        setTimeout(function(){
           
                fetch(`http://localhost:5000/user/${userId}`,{
                    headers:{
                     "Authorization":"Bearer "+ localStorage.getItem("jwt")
                    }
                }).then(res=>res.json())
                .then(result=>{
                    setTimeout(function(){
                        
                   setFoundUser(result)
                   var instance = M.Modal.getInstance(profileModal.current);
                   instance.open()
                }, 500);
                }).catch(err=>{
                    console.log(err)
                })
         
        }, 500);
    
    }
    const closeModal = ()=>{
      
        setTimeout(function(){
        var instance = M.Modal.getInstance(profileModal.current);
        instance.close()
    }, 2000);
    }

    return (
        <>
            <div className='home_user_profile'>
                <img src={user?.photo} alt={user?.name} />
                <div className='home_userInfo'>
                    <h6><strong>{user?.email}</strong></h6>
                    <h6>{user?.name}</h6>   
                </div>
                <p><strong>Switch</strong></p>
            </div>
            <div className='home_suggestedUsers'>
                <div className='home_sugUserHeader'>
                    <h6>Suggestions for you</h6>
                </div>
            {suggestedUsers.map(sugUser=>{
                return(
                   
                    <div className='sugUser_profile' key={sugUser._id}>
                        <img src={sugUser?.photo} alt={sugUser?.name} onMouseOver={()=>{
                            findUser(sugUser?._id)}} 
                            onMouseOut={closeModal} className="large material-icons"/>
               
                        <div className='home_userInfo'>
                            <h6><strong>{sugUser?.email}</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>
                        <p><strong>Follow</strong></p>
                    </div>
                   
                   )
                 })
             }
            </div>

        <div id="modal2" className="modal" ref={profileModal}  >
            <div className="modal-content side_modal" onMouseEnter={()=>{
                 setTimeout(function(){
                    var instance = M.Modal.getInstance(profileModal.current);
                    instance.open()
                }, 2000); 
            }   } >
                <div className='modal_header'>
                    <img src={foundUser.user?.photo} alt={foundUser.user?.name}   className="large material-icons"/>
                    <div className='home_userInfo'>
                        <h6><strong>{foundUser.user?.name}</strong></h6>
                        <h6>{foundUser.user?.email}</h6>   
                    </div>
                </div>
                <hr />
                <div className='post_details'>
                        <h6><span>{foundUser.posts?.length}</span> <span>posts</span></h6>
                        <h6><span>{foundUser.user?.followers.length} </span><span>followers</span></h6>
                        <h6><span style={{marginBottom:'10px'}}>{foundUser.user?.following.length} </span><span>following</span></h6>
                </div>
                <hr />
                <div className='modal-gallery'>

                    {foundUser.posts?.map((item)=>{
                        return(
                        <img className='modal_gallery_item' src={item.photo} key={item._id} alt='' />
                        )
                    })}
                </div>
             
            </div>
            <div className="modal-footer">
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
            {/*<a href="#!" class="modal-close waves-effect waves-green btn-flat">Follow</a>*/}Follow
            </button>
            </div>
        </div>
        <Footer />
            
        </>
    )
}

export default SideComponent
