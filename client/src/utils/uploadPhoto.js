const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/analyze_crop_image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload photo");
  }

  return await response.json();
};

export default uploadPhoto;
