import clsx from "clsx"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import UploadImageCard from "../UploadImageCard"
import { CoverPhotos } from "core/models/restaurants"

interface UploadMultiplePhotosProps {
  className?: string
  max?: number
  onImagesToUpload(files: File[] | never[], images?: string[]): void
  urls?: CoverPhotos[]
}

export default function UploadMultiplePhotosWithPreview({ className, onImagesToUpload, urls }:
  UploadMultiplePhotosProps) {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([])

  useEffect(() => {
    if (urls && urls.length > 0) {
      setSelectedImages(urls.map(url => url.url))
    }
  }, [urls])

  function handleOnClickUploadImageCard() {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  function handleSelectedImages(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length === 0) {
      return
    }

    const currentFiles = e.target.files || []
    const tempImagesToUpload = []
    const selectedImagesUrls = [...selectedImages]

    for (let i = 0; i < currentFiles.length; i++) {
      const file: File = currentFiles[i]
      tempImagesToUpload.push(file)
      selectedImagesUrls.push(URL.createObjectURL(file))
    }

    for (let i = 0; i < imagesToUpload.length; i++) {
      const file: File = imagesToUpload[i]
      tempImagesToUpload.push(file)
    }

    setImagesToUpload(tempImagesToUpload)
    setSelectedImages(selectedImagesUrls)
    onImagesToUpload(tempImagesToUpload)
  }

  return (
    <div className={clsx("upload-multiple-photos-with-preview-container", className)}>
      <input type="file" accept="image/*" multiple ref={inputRef}
        className="upload-multiple-photos-with-preview-input"
        max={5}
        onChange={handleSelectedImages}
      />
      <UploadImageCard onClick={handleOnClickUploadImageCard} />
      {selectedImages.length > 0 &&
        selectedImages.map((imageUrl, index) => (
          <img
            src={imageUrl}
            alt=""
            width={100}
            height={100}
            key={index}
            className="upload-multiple-photos-selected-images" />
        ))
      }
    </div>)
}