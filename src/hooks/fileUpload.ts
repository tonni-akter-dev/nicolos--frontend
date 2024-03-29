"use client";
import  { RefObject, useRef, ChangeEvent, useState } from "react";

interface ImageHookResult {
  imageFileInputRef: RefObject<HTMLInputElement>;
  selectedImage: any;
  selectedFiles: any;
  handleImageClick: () => void;
  handleImageFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useImageUpload = (): ImageHookResult => {
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedFiles, setSelectedFiles] = useState<any>(null);

  const handleImageClick = () => {
    imageFileInputRef.current?.click();
  };

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedFiles(files);
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  return {
    imageFileInputRef,
    selectedImage,
    handleImageClick,
    handleImageFileChange,
    selectedFiles,
  };
};

export default useImageUpload;
