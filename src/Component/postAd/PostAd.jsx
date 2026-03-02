import React, { useRef, useState } from "react";
import "./PostAd.css";
import { uploadImagesToCloudinary } from "../../services/Cloudinary";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PostAd = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    location: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([null, null, null]); // 3 fixed slots

  const toastOptions = { style: { background: "#003670", color: "#fff" } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // max 3 images
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    // Fill the 3 fixed slots, empty slots stay null
    const fixedPreviews = [null, null, null];
    previews.forEach((src, index) => {
      fixedPreviews[index] = src;
    });
    setPreviewImages(fixedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast("Please enter ad title", toastOptions);
      return;
    }
    if (!formData.category.trim()) {
      toast("Please select a category", toastOptions);
      return;
    }
    if (!formData.price.trim() || Number(formData.price) <= 0) {
      toast("Please enter a valid price", toastOptions);
      return;
    }
    if (!formData.description.trim()) {
      toast("Please enter description", toastOptions);
      return;
    }
    if (!formData.location.trim()) {
      toast("Please enter location", toastOptions);
      return;
    }
    if (formData.images.length < 3) {
      toast("Please upload 3 images", toastOptions);
      return;
    }

    try {
      const imageUrls = await uploadImagesToCloudinary(formData.images);
      const finalData = { ...formData, images: imageUrls, createdAt: new Date() };
      await addDoc(collection(db, "ads"), finalData);
      toast("Ad posted successfully!", toastOptions);
      navigate("/");
    } catch (error) {
      toast("Something went wrong. Please try again.", toastOptions);
      console.log(error);
    }
  };

  return (
    <div className="post-page">
      <Toaster position="top-right" reverseOrder={false} />
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
            <select name="category" value={formData.category} onChange={handleChange}>
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
            <label>Upload 3 Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div className="image-upload-box" onClick={() => fileInputRef.current.click()}>
              <p>Click to upload images</p>
            </div>
            <div className="image-preview-container">
              {previewImages.map((src, index) => (
                <div key={index} className="image-preview-box">
                  {src ? <img src={src} alt={`Preview ${index}`} className="image-preview" /> : null}
                </div>
              ))}
            </div>
          </div>
          <button className="post-btn">Post Now</button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;