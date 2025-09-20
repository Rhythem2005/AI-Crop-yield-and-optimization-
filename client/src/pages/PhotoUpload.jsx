import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Image, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

const PhotoUpload = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    if (e.dataTransfer.files) setIsDragging(true);
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

    const validFiles = imageFiles.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB limit

    if (validFiles.length > 0) {
      setUploadedImages((prev) => [...prev, ...validFiles]);
    }
  };

  const handleSubmit = async () => {
    if (uploadedImages.length === 0) {
      alert(t("upload.alertNoImage"));
      return;
    }

    const formData = new FormData();
    uploadedImages.forEach((file) => formData.append("file", file));

    try {
      const response = await fetch("http://localhost:8000/analyze_crop_image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      navigate("/photo-result", { state: { resultData: data.result } });
    } catch (error) {
      console.error("Upload failed:", error);
      alert(t("upload.alertFailed"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">{t("upload.headerTitle")}</h1>
          <p className="text-gray-600 text-lg">{t("upload.headerSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{t("upload.uploadTitle")}</h2>
            </div>

            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-25"
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload").click()}
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-lg font-medium text-gray-800 mb-2">{t("upload.dragDrop")}</h3>
              <p className="text-gray-500 mb-4">{t("upload.or")} {t("upload.clickBrowse")}</p>

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                {t("upload.selectPhotos")}
              </button>

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

            {/* Photo Tips */}
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📸</span>
                <h4 className="font-medium text-green-800">{t("upload.tipsTitle")}</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• {t("upload.tips1")}</li>
                <li>• {t("upload.tips2")}</li>
                <li>• {t("upload.tips3")}</li>
                <li>• {t("upload.tips4")}</li>
              </ul>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{t("upload.previewTitle")}</h2>
            </div>

            {uploadedImages.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">{t("upload.noImages")}</h3>
                <p className="text-gray-500">{t("upload.noImagesSubtitle")}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {uploadedImages.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-xl border-2 border-gray-100"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImages((prev) => prev.filter((_, i) => i !== idx));
                        }}
                      >
                        ×
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-colors"
                >
                  {t("upload.processButton", { count: uploadedImages.length })}
                </button>
              </>
            )}
          </div>
        </div>

        {/* What Our AI Analyzes Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">🔍</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">{t("upload.analysisTitle")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("upload.analysisHealthTitle")}</h3>
              <p className="text-gray-600 text-sm">{t("upload.analysisHealthDesc")}</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("upload.analysisYieldTitle")}</h3>
              <p className="text-gray-600 text-sm">{t("upload.analysisYieldDesc")}</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("upload.analysisRecoTitle")}</h3>
              <p className="text-gray-600 text-sm">{t("upload.analysisRecoDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
