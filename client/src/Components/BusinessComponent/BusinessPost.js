import React, {useState,useRef,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';

function CreatePost() {

    const history= useHistory()
    const [{user}, dispatch ] = useStateValue ()
    const [title,setTitle]= useState('')
    const [description,setDescription]= useState('')
    const [price,setPrice]= useState('')
    const [category,setCategory]= useState('')
    const [subCategory,setSubCategory]= useState('')
    const [image, setImage] = useState();
    const selectCategory =useRef(null)
    const selectSubCategory =useRef(null)

useEffect(() => {

    M.FormSelect.init(selectCategory.current)
    M.FormSelect.init(selectSubCategory.current)

}, [category]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            M.toast({html: 'Please enter name of product or service', classes:'#c62828 red darken-3'})
            return
         }else if (!category) {
            M.toast({html: 'Invalid Select your category', classes:'#c62828 red darken-3'})
            return
          }else if (!subCategory) {
            M.toast({html: 'Invalid Select your subcategory', classes:'#c62828 red darken-3'})
            return
          }else if (!description) {
            M.toast({html: 'Invalid Enter brief description of your post', classes:'#c62828 red darken-3'})
            return
          }else if (!image) {
            M.toast({html: 'No Image selected', classes:'#c62828 red darken-3'})
            return
        }

         
    const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "instaclone")
          data.append("cloud_name", "jossyjoe")
           fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload",{
             method: "post",
             body: data
           })
           .then(res=>res.json())
           .then(data=>{
         
             postDetails(data.url)
           })
           .catch(err=>{
             console.log(err)
           })
          
    }

    const postDetails = (data)=>{
  
     fetch('http://localhost:5000/createbusinesspost',{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            category,
            subCategory,
            price,
            description,
            imgUrl:data,
            business:user.businessRegistered
        })
        }) 
     .then(res=>res.json())
     .then(data =>{
         if(data.error){
             M.toast({html: data.error, classes:'#c62828 red darken-3'})
         }else{
            M.toast({html: `Post Created Successfully`, classes:'#43a047 green darken-1'})
            history.push('/')
         }
     
       })
       .catch(err => console.log(err));
    }

    return (
        <div className='card input-filed'
            style={{
                margin:'10px auto',
                maxWidth:'500px',
                padding:'20px',
                textAlign:"center"
            }}>
                           
            <div className="input-field col s12">
                <input type='text'  value={title} onChange={(e)=>setTitle(e.target.value)} />
                <label htmlFor="last_name">Product Name</label>
            </div>
           
            <div className="input-field col s12" >
                <select ref={selectCategory} onChange={(e) => {
                                setCategory(e.target.value);
                               
                            }}>
                    <option value="" >Select Category</option>
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                
                </select>
              
            </div>
            <div className="input-field col s12" >
                <select ref={selectSubCategory} onChange={(e) => {
                                setSubCategory(e.target.value);   
                            }}>
                    <option value="" >Select Sub-Category</option>
                    {
                         (category==="Product") && <>
                            <option value="Automobile">Automobiles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="phones">Phones and Accessory</option>
                            <option value="Shoe-Wears">Shoes and wears</option>
                            <option value="Furniture">Furnitures</option>
                            <option value="Academics">Educational Materials</option>
                            <option value="Sports">Sports Equipment</option>
                        </>
                    }
                    {
                        (category==="Service") && <>
                            <option value="Accomodation">Accomodation</option>
                            <option value="Hospitalty">Hotels and Suites</option>
                            <option value="Restaurant">Eatery and Restaurants</option>
                            <option value="Barbing">Barbing</option>
                            <option value="Hair-style">Hair Styling</option>
                            <option value="Fashion-design">Fashion Designer</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Catering">Catering and Baking</option>
                            <option value="Welding">Welding and Metal work</option>
                            <option value="Carpentary-Woodwork">Carpentary and Wood work</option>
                        </>
                            }
                   
                
                </select>
               
            </div>
           
            <div className="input-field col s12">
                <input type='number'  value={price} onChange={(e)=>setPrice(e.target.value)} />
                <label htmlFor="price">Product Price if neccesary</label>
            </div>

            <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea"  value={description} onChange={(e)=>setDescription(e.target.value)} ></textarea>
                <label htmlFor="textarea1">Brief Description of {category}</label>
            </div>
                 
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={onSubmit}>
                    Submit Post
                </button>

        </div>
    )
}

export default CreatePost
