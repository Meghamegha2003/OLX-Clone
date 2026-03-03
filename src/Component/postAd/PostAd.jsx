import React, { useRef, useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { uploadImagesToCloudinary } from "../../services/Cloudinary";
import { showToast } from "../../utility/toster";
import toast from "react-hot-toast";
import "./PostAd.css";

const PostAd = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isPosting, setIsPosting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    newCategory: "",
    price: "",
    description: "",
    location: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([null, null, null]);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = await getDocs(collection(db, "ads"));
      const ads = query.docs.map((doc) => doc.data());
      const uniqueCategories = [...new Set(ads.map((ad) => ad.category))];
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "category") setShowNewCategoryInput(value === "new");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (formData.images.length >= 3) {
      showToast.custom("Maximum 3 images allowed");
      return;
    }
    const emptyIndex = previewImages.findIndex((img) => img === null);
    const newPreview = URL.createObjectURL(file);
    const updatedPreviews = [...previewImages];
    updatedPreviews[emptyIndex] = newPreview;
    setPreviewImages(updatedPreviews);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, file],
    }));
    showToast.custom("Image added");
    e.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPosting) return;
    const user = auth.currentUser;
    if (!user) {
      showToast.loginRequired();
      navigate("/login");
      return;
    }
    if (!formData.title.trim()) return showToast.custom("Enter ad title");
    if (!formData.category.trim()) return showToast.custom("Select category");
    if (showNewCategoryInput && !formData.newCategory.trim())
      return showToast.custom("Enter new category");
    if (!formData.price || Number(formData.price) <= 0)
      return showToast.custom("Enter valid price");
    if (!formData.description.trim())
      return showToast.custom("Enter description");
    if (!formData.location.trim()) return showToast.custom("Enter location");
    if (formData.images.length < 1 || formData.images.length > 3)
      return showToast.custom("Upload 1 to 3 images");

    try {
      setIsPosting(true);
      showToast.custom("Posting your ad...");
      const imageUrls = await uploadImagesToCloudinary(formData.images);
      const finalData = {
        title: formData.title,
        category: showNewCategoryInput ? formData.newCategory : formData.category,
        price: Number(formData.price),
        description: formData.description,
        location: formData.location,
        images: imageUrls,
        createdAt: new Date(),
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || "User",
      };
      await addDoc(collection(db, "ads"), finalData);
      showToast.adPosted();
      navigate("/");
    } catch {
      showToast.custom("Something went wrong");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="post-page">
      <div className="post-box">
        <h2>POST YOUR AD</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
              <option value="new">-- Add New Category --</option>
            </select>
            {showNewCategoryInput && (
              <input
                type="text"
                name="newCategory"
                value={formData.newCategory}
                onChange={handleChange}
                placeholder="Enter new category"
              />
            )}
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Upload 1-3 Photos</label>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
            <div className="image-upload-box" onClick={() => fileInputRef.current.click()}>Click to Upload</div>
            <div className="image-preview-container">
              {previewImages.map((src, index) => (
                <div key={index} className="image-preview-box">
                  {src && <img src={src} alt={`Preview ${index}`} className="image-preview" />}
                </div>
              ))}
            </div>
          </div>
          <button className="post-btn" disabled={isPosting}>
            {isPosting ? "Posting..." : "Post Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;