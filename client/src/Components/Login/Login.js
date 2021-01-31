import React, {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {

    const history = useHistory()
    const [{user}, dispatch ] = useStateValue ()
    
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const PostData = () =>{

     if (!/\S+@\S+\.\S+/.test(email)) {
            M.toast({html: 'Invalid Email', classes:'#c62828 red darken-3'})
            return
          }else if (!password) {
            M.toast({html: 'Password is required', classes:'#c62828 red darken-3'})
            return
        }
         
        fetch('http://localhost:5000/signin',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                
            })
        }).then(res=>res.json())
        .then(data=>{
           
            if(data.error){
                M.toast({html: data.error, classes:'#c62828 red darken-3'})

            }else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({
                    type:actionTypes.Set_USER,
                    user: data.user
                })
                M.toast({html: `Welcome ${data.user.name}`, classes:'#43a047 green darken-1'})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    
    return (
       <div className='mycard'>
           <div className='card auth-card input-field'>
               <h2>Instagram</h2>
               <input
               type='text'
               placeholder='email'
               onChange={(e)=>setEmail(e.target.value)}
               />

               <input type='password'
               placeholder='password'
               onChange={(e)=>setPassword(e.target.value)}
               />

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={PostData}>
                    Login
                </button>
                <h5>
                    <Link to='/signup'>Don't have an account ?</Link>
                </h5>
           </div>
       </div>
    )
}

export default Login
