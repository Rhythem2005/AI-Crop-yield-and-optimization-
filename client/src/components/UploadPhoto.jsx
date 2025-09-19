// src/components/UploadPhoto.jsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ import i18n hook

const UploadPhoto = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ translation hook

  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files) => {
    const imageFiles = files.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
    );

    const validFiles = imageFiles.filter((file) => file.size <= 10 * 1024 * 1024);

    if (validFiles.length > 0) {
      setUploadedImages((prev) => [...prev, ...validFiles]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <a
              href="/"
              className="text-gray-600 flex items-center gap-2 hover:text-green-700"
            >
              ← {t("upload.backToHome")}
            </a>
          </div>

          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {t("upload.headerTitle")}
          </h2>
          <p className="text-gray-600 mt-1">
            {t("upload.headerSubtitle")}
          </p>
        </div>

        {/* Upload & Preview side by side equally */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("upload.uploadTitle")}
              </h3>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-green-400"
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600">
                    <span className="font-medium text-green-600">
                      {t("upload.dragDrop")}
                    </span>{" "}
                    {t("upload.or")}{" "}
                    <span className="font-medium text-green-600">
                      {t("upload.clickBrowse")}
                    </span>
                  </p>
                </div>

                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                {t("upload.supportedFormats")}
              </p>
            </div>
          </div>

          {/* Right Column - Preview Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("upload.previewTitle")}
              </h3>

              {uploadedImages.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex-1 flex flex-col justify-center">
                  <p className="text-gray-500">{t("upload.noImages")}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {t("upload.noImagesSubtitle")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={() => navigate("/result")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium shadow transition"
                >
                  {t("upload.processButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
