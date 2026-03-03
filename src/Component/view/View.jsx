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

  const formattedDate = product?.createdAt?.seconds
    ? new Date(product.createdAt.seconds * 1000).toLocaleString("en-IN")
    : "N/A";

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "ads", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProduct(data);
          setMainImage(data.images?.[0] || "/placeholder.png");
        } else {
          setProduct(null);
          setMainImage("/placeholder.png");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
        setMainImage("/placeholder.png");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;

  if (!product) {
    return (
      <div className="product-notfound">
        <picture>
          <source
            type="image/webp"
            srcSet="https://statics.olx.in/external/base/img/no-publications.webp"
          />
          <img
            src="https://statics.olx.in/external/base/img/no-publications.png"
            alt="No Ads"
            className="olx-empty-image"
          />
        </picture>
        <h2>Oops! Product Not Found</h2>
        <p>This product might have been removed or the link is invalid.</p>
        <button className="back-btn" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="view-container">
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

      <div className="details-section">
        <h1 className="title">{product.title}</h1>
        <div className="price">₹ {product.price}</div>
        <p className="description">
          {product.description || "No description available."}
        </p>
        <div className="info-row">
          <span>
            <strong>Location:</strong> {product.location || "N/A"}
          </span>
          <span>
            <strong>Posted on:</strong> {formattedDate}
          </span>
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
