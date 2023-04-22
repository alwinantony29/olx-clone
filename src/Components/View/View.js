import React, { useEffect, useContext, useState } from "react";
import { db } from "../../firebase/config";
import "./View.css";
import { postContext } from "../../store/PostContext";
import { collection, getDocs, query, where } from "firebase/firestore";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(postContext);
  
  useEffect(async () => {
    // console.log(postDetails);
    const q = query(
      collection(db, "users"),
      where("id", "==", postDetails.userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setUserDetails(doc.data())
    });
  }, []);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.downloadURL} alt="post image" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>name:{userDetails ? userDetails.username : ""}</p>
          <p>phone:{userDetails ? userDetails.phone : ""}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
