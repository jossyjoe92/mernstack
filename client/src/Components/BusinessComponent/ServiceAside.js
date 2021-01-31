import React from 'react';
import google from '../../Assets/google.png'
import ecwa from '../../Assets/headerLogo.png'
import {Link,useHistory} from 'react-router-dom'
function ServiceAside() {
     const history = useHistory()
  return (
                <>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/Accomodation')}>
                        <img src={google} alt='alt' className="large material-icons"/>
               
                        <div className='home_userInfo'>
                            <h6><strong>Accomodation</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>
                        
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/Hotels')}>
                        <img src={ecwa} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Hotels and Suites</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/Restaurants')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Eatery and Restaurants</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/Schools')}>
                        <img src={ecwa} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Schools</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/FashionDesign')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Fashion Design</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/Enginnering')}>
                        <img src={ecwa} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Engineering</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/Barbing')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Barbing</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile'  onClick={()=>history.push('/service/Health')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Health</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                  
                    <div className='sugUser_profile' onClick={()=>history.push('/service/HairStylist')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Hair Stylist</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/service/Capentary')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Carpentary and Word work</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                </>
  );
}

export default ServiceAside;
