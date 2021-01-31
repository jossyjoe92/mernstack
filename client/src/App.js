import React, {useEffect} from 'react';
import './App.css'
import Navbar from './Components/Navbar'
import {BrowserRouter, Route,Link,useHistory, Switch} from 'react-router-dom'
  import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Signup from './Components/Signup/Signup';
import BusinessReg from './Components/BusinessComponent/RegisterBusiness'
import Home from './Components/Home/Home';
import CreatePost from './Components/CreatePost';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import UserProfile from './Components/Profile/UserProfile'
import MyFollowingPost from "./Components/MyFollowing"
import ViewPost from './Components/ViewPost';
import BusinessProfile from './Components/BusinessComponent/BusinessProfile'
import BusinessPost from './Components/BusinessComponent/BusinessPost'
import Products from './Components/BusinessComponent/Products'
import Services from './Components/BusinessComponent/Services'
import OtherBusinessProfile from './Components/BusinessComponent/OtherBusinessProfile'
import ViewProductPost from './Components/BusinessComponent/ViewProduct';
import ProductSubCategory from './Components/BusinessComponent/ProductSubCategory'
import ServiceSubCategory from './Components/BusinessComponent/ServiceSubcategory'
const Routing=()=>{
  const [{user}, dispatch ] = useStateValue ()
  const history = useHistory()

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({
        type:actionTypes.Set_USER,
        user: user
    })
    
    }else{
      history.push('/signin')
    }
    
  }, [])
  return(
  <Switch>
      <Route  path='/signup'>
      <Signup />
    </Route>
    <Route  path='/registerbusiness'>
      <BusinessReg />
    </Route>
    <Route path='/signin'>
      <Login />
    </Route>
    <Route exact path='/profile'>
      <Profile />
    </Route>
    <Route path='/profile/:id'>
      <UserProfile />
    </Route>
    <Route exact path='/businessprofile/:id'>
      <OtherBusinessProfile />
    </Route>
    <Route path='/businessprofile'>
      <BusinessProfile />
    </Route>
    <Route path='/viewpost/:id'>
      <ViewPost />
    </Route>
    <Route path='/viewproduct/:id'>
      <ViewProductPost />
    </Route>
    <Route path='/createpost'>
      <CreatePost />
    </Route>
    <Route path='/businesspost'>
      <BusinessPost />
    </Route>
    <Route path='/product/:subcategory'>
      <ProductSubCategory />
    </Route>
    <Route path='/service/:subcategory'>
      <ServiceSubCategory />
    </Route>
    <Route path='/products'>
      <Products />
    </Route>
    <Route path='/services'>
      <Services />
    </Route>
    <Route path='/myfollowing'>
      <MyFollowingPost />
    </Route>
    <Route exact path='/'>
      <Home />
    </Route>
  </Switch>
  )
}

const App = () => {

  return (
  <BrowserRouter>
     <Navbar /> 
    <Routing />
  </BrowserRouter>
     
      
    
  );
}

export default App;