import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import { db  } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Header from '../Header/Header';
import { storage } from "../../firebase/config";
import {  useNavigate} from "react-router-dom";
import {  ref ,getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { authContext } from '../../store/Context';
const Create = () => {
  const navigate=useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const date=new Date()
  const {user}=useContext(authContext)
  // Create a reference to 'mountains.jpg'
const storageRef = ref(storage, `images/${image?image.name:''}`);
  const handleSubmit=()=>{ 
    const uploadTask=uploadBytesResumable(storageRef,image)
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        console.log('File available at', downloadURL);
        await addDoc(collection(db, "products"), {
          name,
          category,
          price,
          downloadURL,
          userId:user.uid,
          createdAt:date.toDateString()
        }).then(()=>{
          console.log('product details uploaded');
          navigate('/')
      })
      });
    }
  );  
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input value={name}
            onChange={(e)=>setName(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input value={category}
            onChange={(e)=>setCategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e)=>setPrice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
