import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import "./View.css";

const View = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(!product);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!product && id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = { id: docSnap.id, ...docSnap.data() };
            setProduct(data);
            setMainImage(data.images?.[0] || "/placeholder.png");
          } else {
            setProduct(null);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else if (product) {
      setMainImage(product.images?.[0] || "/placeholder.png");
    }
  }, [id, product]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div className="view-container">
      {/* Left: Images */}
      <div className="image-section">
        {product.featured && <span className="badge">FEATURED</span>}
        <button
          className="heart"
          onClick={() => setLiked(!liked)}
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
        >
          {liked ? <FaHeart className="filled" /> : <FaRegHeart />}
        </button>

        <div className="main-image">
          <img src={mainImage} alt={product.title} />
        </div>

        {product.images && product.images.length > 1 && (
          <div className="thumbnails">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={mainImage === img ? "active-thumb" : ""}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div className="details-section">
        <h1 className="title">{product.title}</h1>
        <div className="price">₹ {product.price}</div>
        {product.details && <p className="description">{product.details}</p>}

        <div className="info-row">
          <span><strong>Location:</strong> {product.location || "N/A"}</span>
          <span><strong>Posted on:</strong> {product.date || "N/A"}</span>
        </div>

        <div className="action-buttons">
          <button className="chat-btn">Chat</button>
          <button className="call-btn">Call</button>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default View;