export const uploadImagesToCloudinary = async (images) => {
  const imageUrls = [];

  for (let image of images) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qio28ksw");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dphyfrqfj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

     if (!result.secure_url) {
      throw new Error("Cloudinary upload failed");
    }
    
    imageUrls.push(result.secure_url);
  }

  return imageUrls;
};