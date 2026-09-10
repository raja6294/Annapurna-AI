/**
 * FoodImageUploader.jsx
 * Real multi-image uploader with preview, validation, and upload status.
 *
 * - Accepts JPG, JPEG, PNG, WebP (max 10MB each, max 10 files)
 * - Shows thumbnail previews with filename and remove button
 * - Uploads via POST /api/food-scans/upload
 * - Returns uploaded image URLs to parent via onUploadComplete(urls)
 */

import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, CheckCircle2, AlertTriangle, RefreshCw, Camera, ImageIcon } from 'lucide-react';
import { api } from '../lib/api';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILES = 10;

const FoodImageUploader = ({ onUploadComplete, onUploadedUrls }) => {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]); // { id, file, previewUrl, status, error, uploadedUrl }
  const [isDragOver, setIsDragOver] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" is not a supported format. Use JPG, PNG, or WebP.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 10 MB.`;
    }
    return null;
  };

  const addFiles = useCallback((files) => {
    setGlobalError(null);
    const fileArray = Array.from(files);

    if (previews.length + fileArray.length > MAX_FILES) {
      setGlobalError(`Maximum ${MAX_FILES} images allowed.`);
      return;
    }

    const newPreviews = [];
    for (const file of fileArray) {
      const validationError = validateFile(file);
      const previewUrl = URL.createObjectURL(file);
      newPreviews.push({
        id: `${Date.now()}_${Math.random()}`,
        file,
        previewUrl,
        status: validationError ? 'error' : 'pending',
        error: validationError,
        uploadedUrl: null,
      });
    }

    setPreviews((prev) => [...prev, ...newPreviews]);
  }, [previews]);

  const handleFileInput = (e) => {
    if (e.target.files?.length) {
      addFiles(e.target.files);
      e.target.value = ''; // reset so same file can be re-added
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.length) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removePreview = (id) => {
    setPreviews((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleUpload = async () => {
    const pendingItems = previews.filter((p) => p.status === 'pending');
    if (pendingItems.length === 0) {
      // All already uploaded — just call back with existing URLs
      const urls = previews.filter((p) => p.uploadedUrl).map((p) => p.uploadedUrl);
      if (urls.length > 0) {
        onUploadComplete?.(urls);
        onUploadedUrls?.(urls);
      }
      return;
    }

    setIsUploading(true);
    setGlobalError(null);

    // Mark all pending as uploading
    setPreviews((prev) =>
      prev.map((p) => (p.status === 'pending' ? { ...p, status: 'uploading' } : p))
    );

    try {
      const formData = new FormData();
      pendingItems.forEach((item) => formData.append('images', item.file));

      const response = await api.uploadFoodImages(formData);
      const uploadedUrls = response.data?.imageUrls || [];

      // Match uploaded URLs back to pending items by order
      setPreviews((prev) => {
        let urlIndex = 0;
        return prev.map((p) => {
          if (p.status === 'uploading') {
            const url = uploadedUrls[urlIndex++] || null;
            return { ...p, status: url ? 'done' : 'error', uploadedUrl: url, error: url ? null : 'Upload failed' };
          }
          return p;
        });
      });

      // Collect all uploaded URLs (including previously uploaded ones)
      const allUrls = [
        ...previews.filter((p) => p.uploadedUrl).map((p) => p.uploadedUrl),
        ...uploadedUrls,
      ];

      onUploadComplete?.(allUrls);
      onUploadedUrls?.(allUrls);
    } catch (err) {
      const msg = err.message?.includes('Failed to fetch')
        ? 'Cannot connect to backend. Make sure the backend server is running on port 5000.'
        : err.message || 'Upload failed. Please try again.';
      setGlobalError(msg);
      setPreviews((prev) =>
        prev.map((p) =>
          p.status === 'uploading' ? { ...p, status: 'error', error: 'Upload failed' } : p
        )
      );
    } finally {
      setIsUploading(false);
    }
  };

  const pendingCount = previews.filter((p) => p.status === 'pending').length;
  const doneCount = previews.filter((p) => p.status === 'done').length;
  const hasValidFiles = pendingCount > 0;

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
          isDragOver
            ? 'border-spiceGold bg-spiceGold/15'
            : 'border-spiceGold/40 bg-spiceGold/5 hover:bg-spiceGold/10 hover:border-spiceGold/70'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
          className="hidden"
          id="food-image-input"
        />
        <Upload className="h-8 w-8 text-spiceGold mx-auto mb-2" />
        <p className="text-xs font-semibold text-foreground">
          {isDragOver ? 'Drop images here' : 'Click or drag food photos here'}
        </p>
        <p className="text-[11px] text-muted-foreground font-mono mt-1">
          JPG · PNG · WebP · Max 10MB per file · Up to 10 images
        </p>
      </div>

      {/* Global Error */}
      {globalError && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {previews.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border-2 border-border bg-muted aspect-square">
              <img
                src={item.previewUrl}
                alt="Food preview"
                className="h-full w-full object-cover"
              />

              {/* Status overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                item.status === 'uploading' ? 'bg-black/50' :
                item.status === 'done' ? 'bg-mossVerified/20' :
                item.status === 'error' ? 'bg-red-500/30' : 'bg-transparent'
              }`}>
                {item.status === 'uploading' && (
                  <RefreshCw className="h-6 w-6 text-white animate-spin" />
                )}
                {item.status === 'done' && (
                  <CheckCircle2 className="h-6 w-6 text-mossVerified drop-shadow" />
                )}
                {item.status === 'error' && (
                  <AlertTriangle className="h-6 w-6 text-red-400 drop-shadow" />
                )}
              </div>

              {/* Remove button */}
              {item.status !== 'uploading' && (
                <button
                  onClick={(e) => { e.stopPropagation(); removePreview(item.id); }}
                  className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                >
                  <X className="h-3 w-3" />
                </button>
              )}

              {/* Status badge */}
              <div className={`absolute bottom-0 inset-x-0 text-[9px] font-mono font-bold text-center py-0.5 ${
                item.status === 'done' ? 'bg-mossVerified text-white' :
                item.status === 'error' ? 'bg-red-600 text-white' :
                item.status === 'uploading' ? 'bg-spiceGold text-pineCanopy' :
                'bg-spiceGold text-pineCanopy'
              }`}>
                {item.status === 'done' ? '✓ Uploaded' :
                 item.status === 'error' ? '✕ Error' :
                 item.status === 'uploading' ? 'Uploading...' :
                 `Photo ${previews.indexOf(item) + 1}`}
              </div>

              {/* Error tooltip */}
              {item.error && item.status !== 'uploading' && (
                <div className="absolute bottom-6 inset-x-0 px-1">
                  <p className="text-[8px] text-red-300 bg-red-900/80 rounded px-1 py-0.5 leading-tight">{item.error}</p>
                </div>
              )}
            </div>
          ))}

          {/* Add more button */}
          {previews.length < MAX_FILES && (
            <button
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-spiceGold/40 flex flex-col items-center justify-center gap-1 text-spiceGold/60 hover:text-spiceGold hover:border-spiceGold/70 hover:bg-spiceGold/5 transition-all"
            >
              <Camera className="h-6 w-6" />
              <span className="text-[10px] font-mono">Add more</span>
            </button>
          )}
        </div>
      )}

      {/* Upload Button */}
      {previews.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isUploading || (!hasValidFiles && doneCount === 0)}
          className="w-full py-3 rounded-xl border border-spiceGold/60 bg-spiceGold/10 hover:bg-spiceGold/20 text-spiceGold font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-40"
        >
          {isUploading ? (
            <><RefreshCw className="h-4 w-4 animate-spin" /><span>Uploading {pendingCount} image(s)...</span></>
          ) : doneCount > 0 && !hasValidFiles ? (
            <><CheckCircle2 className="h-4 w-4 text-mossVerified" /><span>{doneCount} image(s) uploaded — ready to scan</span></>
          ) : (
            <><Upload className="h-4 w-4" /><span>Upload {pendingCount} image(s) to server</span></>
          )}
        </button>
      )}
    </div>
  );
};

export default FoodImageUploader;
