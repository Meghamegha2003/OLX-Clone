import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const View = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    // Only fetch if no product in state
    if (!product && id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            setProduct(null); // show not found
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(null); // show not found
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, product]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div className="single-product-container">
      <div className="image-section">
        <img
          src={product.images || "/placeholder.png"}
          alt={product.title || "Product Image"}
          loading="lazy"
        />
        {product.featured && <span className="badge">FEATURED</span>}

        <button
          className="heart"
          onClick={() => setLiked(!liked)}
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
        >
          {liked ? <FaHeart className="filled" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="details-section">
        <h1 className="title">{product.title}</h1>
        <p className="price">Price: {product.price}</p>
        {product.details && <p className="description">{product.details}</p>}
        <p className="location">Location: {product.location}</p>
        <p className="date">Posted on: {product.date}</p>

        <div className="actions">
          <button className="buy-btn">Buy Now</button>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default View;