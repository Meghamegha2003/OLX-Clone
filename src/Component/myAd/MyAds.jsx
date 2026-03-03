import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/Firebase";
import { Link } from "react-router-dom";
import { showToast } from "../../utility/toster";
import "./MyAds.css";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const adsRef = collection(db, "ads");
        const q = query(adsRef, where("userId", "==", currentUser.uid));
        const snapshot = await getDocs(q);

        const userAds = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAds(userAds);
      } catch (error) {
        showToast.custom("Failed to fetch your ads");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ad?")) return;

    try {
      await deleteDoc(doc(db, "ads", id));
      setAds((prev) => prev.filter((ad) => ad.id !== id));
      showToast.custom("Ad deleted successfully");
    } catch {
      showToast.custom("Delete failed");
    }
  };

  const openEditModal = (ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const adRef = doc(db, "ads", selectedAd.id);

      await updateDoc(adRef, {
        title: selectedAd.title,
        price: selectedAd.price,
        location: selectedAd.location,
      });

      setAds((prev) =>
        prev.map((ad) => (ad.id === selectedAd.id ? selectedAd : ad))
      );

      showToast.custom("Ad updated successfully");
      setIsModalOpen(false);
    } catch {
      showToast.custom("Update failed");
    }
  };

  if (loading) {
    return <div className="center-message">Loading your ads...</div>;
  }

  if (!user) {
    return <div className="center-message">Please login to view your ads.</div>;
  }

  if (ads.length === 0) {
    return (
      <div className="olx-empty-wrapper">
        <div className="olx-empty-card">
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

          <div className="olx-empty-title">
            You haven't listed anything yet
          </div>

          <p className="olx-empty-subtitle">
            Let go of what you don't use anymore
          </p>

          <Link
            className="olx-empty-btn"
            to={"/postad"}
            style={{ textDecoration: "none" }}
          >
            Start selling
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="myads-container">
      <h2>My Ads</h2>

      <div className="myads-grid">
        {ads.map((ad) => (
          <div key={ad.id} className="myad-card">
            <img
              src={ad.images?.[0] || "/placeholder.png"}
              alt={ad.title}
              className="myad-image"
            />

            <div className="myad-content">
              <h3>{ad.title}</h3>
              <p className="price">₹ {ad.price}</p>
              <p className="location">{ad.location}</p>
            </div>

            <div className="myad-buttons">
              <Link to={`/view/${ad.id}`} className="view-btn">
                View
              </Link>

              <button className="edit-btn" onClick={() => openEditModal(ad)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(ad.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Ad</h3>

            <input
              type="text"
              value={selectedAd.title}
              onChange={(e) =>
                setSelectedAd({ ...selectedAd, title: e.target.value })
              }
              placeholder="Title"
            />

            <input
              type="number"
              value={selectedAd.price}
              onChange={(e) =>
                setSelectedAd({ ...selectedAd, price: e.target.value })
              }
              placeholder="Price"
            />

            <input
              type="text"
              value={selectedAd.location}
              onChange={(e) =>
                setSelectedAd({ ...selectedAd, location: e.target.value })
              }
              placeholder="Location"
            />

            <div className="modal-buttons">
              <button onClick={handleUpdate} className="save-btn">
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAds;