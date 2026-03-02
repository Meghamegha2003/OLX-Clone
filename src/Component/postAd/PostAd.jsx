import React, { useRef, useState } from "react";
import "./PostAd.css";
import { uploadImagesToCloudinary } from "../../services/Cloudinary";
import { addDoc, collection } from "firebase/firestore";
import {db} from '../../firebase/Firebase'
import { useNavigate } from "react-router-dom";

const PostAd = () => {
  const navigate = useNavigate()
      const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    location: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const imageUrls = await uploadImagesToCloudinary(formData.images);
      const finalData = {
        ...formData,
        images: imageUrls,
        createdAt : new Date()
      }
      await addDoc(collection(db,"ads"),finalData)
      alert("Post added successfully")
      navigate('/')
    } catch (error) {
      console.log(error)
      alert("something went wrong")
    }
  };

  return (
    <div className="post-page">
      <div className="post-box">
        <h2>POST YOUR AD</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Cars</option>
              <option>Mobiles</option>
              <option>Electronics</option>
              <option>Furniture</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>

          <div className="form-group">
            <label>Upload Photos</label>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <div
              className="image-upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              <p>Click to upload images</p>
            </div>
          </div>

          <button className="post-btn">Post Now</button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
