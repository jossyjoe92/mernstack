import React from 'react';
import {Link,useHistory} from 'react-router-dom'
import google from '../../Assets/google.png'
import ecwa from '../../Assets/headerLogo.png'
function ProductAside() {
    const history = useHistory()
  return (
    <>
       <div className='sugUser_profile' onClick={()=>history.push('/product/Automobile')}>
                        <img src='https://svgsilh.com/svg/1299198.svg' alt='alt' className="large material-icons"/>
               
                        <div className='home_userInfo'>
                            <h6><strong>Vehicles</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>
                        
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/product/Electronics')}>
                        <img src='https://freesvg.org/img/1382215647.png' alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Electronics</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile' onClick={()=>history.push('/product/Phones')}>
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAADb29v7+/t6enro6Ojy8vIKCgrv7+/4+PhoaGiVlZWgoKBISEjr6+v19fWysrLIyMiAgIAtLS08PDzh4eGoqKggICCGhoZcXFxubm5UVFQcHBzDw8MRERE3NzfQ0NAwMDCNjY2ZmZm44rCtAAADCUlEQVR4nO3ZiVLiQBhFYcIawiIoizoyorz/O84oVTMSU2Un3NtNdZ3zAD/9FXQ6Cb1e9wbrWbWfFN4m+2q2vmKRVzS+N9u+9ngXH3iK6PtoHtlXbiIDi2IxjgncRvd9NIoHXCYBFkW8b/EhkXATCxjzInrZLA4wzSY8F2crPiUUPscABl5mtr1Bm0J/GTFO/nnQSnat5+6C5q4Monq/glbSfsOMguZWBlG9oIUU09Zzp0FzXwyiWmWYsP1+CRMWBlKtwCvCtvXgsF9psTSYLuuHLaT92TwLG9w3mC4LFBaH5ahNy0Pg3NsRukKIECFChAgRRhcO45RQaP+0cwmFA/vHfYZQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLUhdIRQG0JHCLVdCO2fdi6hMEEIESJEiBAhQoQIESJE+NHvrIWL1XLamy5Xi0yFm/+L629yFA4vxjznJxzW5nQl3qzw9dugh8yEx2+D1nkJFw2T3rISrhomzbMSbhsmHbMSNr0cH2cvHGQlHDdMKrMSHhsm5bUPZw2T3rMSvjRMmmQlbDgQd90G3aywuKvN6XZW3LKwdus9eMtOWLyWX6aUHZ8sblpYFPN/Q7rdkt6+8O9j8KG/7R+G14zwC7fXLE/QyC6cJhZO7cLez4uw5gf2npICnyIIO96LiNpFEHZ76FHV9Bgmr0oIrGIAk54X/rPis8dkwPc4wK5vOq/v+4tzV6kuNlEuM+dGSYCRNuG5svsfgF1bRPwGPztFBs5/XpK68j6i77H+EiRSx1O17/bGLLzJvjodr1nkH3odQquQ8czSAAAAAElFTkSuQmCC' alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Phones and Accessory</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile'  onClick={()=>history.push('/product/Shoes-Wears')}>
                        <img src={ecwa} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Shoes and Wears</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile'  onClick={()=>history.push('/product/Furnitures')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Furnitures</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile'  onClick={()=>history.push('/product/AcademicMaterials')}>
                        <img src={ecwa} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Educational Materials</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>
                    <div className='sugUser_profile'  onClick={()=>history.push('/product/SportsEquipments')}>
                        <img src={google} alt='alt' className="large material-icons"/>
                        <div className='home_userInfo'>
                            <h6><strong>Sports Equipment</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>   
                    </div>

    </>
  );
}

export default ProductAside;
