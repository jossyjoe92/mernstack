    import React,{useRef,useEffect,useState} from 'react'
    import {Link,useHistory} from 'react-router-dom'
    import { useStateValue } from '../StateProvider';
    import { actionTypes } from '../reducer';
    import M from 'materialize-css'

    import { Dropdown, Button,Divider,Icon } from 'react-materialize';

    function Navbar() {
      const searchModal= useRef(null)
      const toggleNav =useRef(null)
      const dropDown = useRef(null)
      const [{user}, dispatch ] = useStateValue ()
    const history = useHistory()
    const[search, setSearch] = useState('')
    const [userDetails, setuserDetails]= useState([])

    useEffect(() => {

      M.Modal.init(searchModal.current)
      M.Sidenav.init(toggleNav.current);
      let elems = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
    },[])
  const renderList = ()=>{
    if(user){
     
      return(
        <>
              <li><i style={{color:'black'}} data-target="modal1"  className="large material-icons modal-trigger">search</i></li>
             <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/createpost">Create Post</Link></li>
            <li><Link to="/myfollowing">My Following</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li>  
           </li>
           <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
              onClick={(e)=>{
                localStorage.clear()
                dispatch({
                type:actionTypes.Set_USER,
                user: null
              })
              history.push('/signin')
            } 
           }> Logout</button>
          
        </>
      )
    }else{
      return(
        <>
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
        </>
      )
    }
  }

  const renderList1 = ()=>{
    if(user){
     
      return(
        <>
              <li><i style={{color:'black'}} data-target="modal1"  className="large material-icons modal-trigger">search</i></li>
             
            <li><Link to="/createpost">Create Post</Link></li>
            <li><Link to="/myfollowing">My Following</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li>  
           </li>
               
            <li>
            <Dropdown
                id="Dropdown_6"
                options={{
                  alignment: 'left',
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: false,
                  container: null,
                  coverTrigger: false,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250
              }}
           trigger={<img style={{width:'40px',height:'40px',margin:'10px'}} src={user.photo} />}
            >          

  <Link to="/profile">
    <Icon>
        person_outline
    </Icon>
    Profile
  </Link>
 
  <a href="#">
    two
  </a>
  
  <a href="#">
    three
  </a>
  <a href="#">
    <Icon>
      settings
    </Icon>
    Settings
  </a>
  <Divider />
  
  <h6 style={{textAlign:'center'}}
            onClick={(e)=>{
              localStorage.clear()
              dispatch({
                type:actionTypes.Set_USER,
                user: null
            })
            history.push('/signin')
            }
            
            }>
                    Logout
                </h6>
  
</Dropdown>
            </li>
      </>
      )
    }else{
      return(
        <>
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
        </>
      )
    }
  }
  const fetchUsers = (query) =>{
    setSearch(query)
    fetch('http://localhost:5000/search-users',{
      method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    query
                })
            }).then(res=>res.json())
            .then(data=>{
                setuserDetails(data.user)
            }).catch(err=>{
                console.log(err)
            })
    
  }
    return (
      <div className="navbar-fixed">
        <nav>
        <div className="nav-wrapper white" >
          <Link to={user? '/':'/signin' } className="brand-logo left">instagram</Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
          
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList1()}
          </ul>
          <ul className="sidenav" ref={toggleNav} id="mobile-demo">
          {renderList()}
          </ul>
         
          
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{color:'black'}}>
              <div className="modal-content">
              <input
               type='text'
               placeholder='Search users'
               value={search}
               onChange={(e)=>fetchUsers(e.target.value)}
               />
  
  <ul className="collection">
    {userDetails.map(item=>{
      return <Link to={item._id !==user._id ? `/profile/${item._id}`:'/profile'} onClick={()=> {
        M.Modal.getInstance(searchModal.current).close()
        setSearch('')
        setuserDetails([])
      }
  
          

       
      }><li className="collection-item" key={item._id}>{item.email}</li></Link>
    })}
      
    </ul>

          </div>
              <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat" onClick={(e)=>{
                  setSearch('')
                  setuserDetails([])
                  }}>Close</button>
              </div>
            </div>
           
      </nav>
    </div>    
    )
}

export default Navbar
