import clsx from "clsx"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { CoverPhotos } from "core/models/restaurants"
import Button from "shared/components/Button"
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon"
import emptyIcon from "assets/illus/empty.png"

interface UploadMultiplePhotosProps {
  className?: string
  max: number
  onImagesToUpload(files: File[] | never[], images?: string[]): void
  urls?: CoverPhotos[]
  title?: string
}

export default function UploadMultiplePhotosWithPreview({ className,
  max,
  onImagesToUpload,
  urls,
  title = "Upload Multiple Files" }:
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
    <div className={clsx("upload-multiple-photos-with-preview-wrapper", className)}>
      <div className="upload-multiple-photos-with-preview-btns-container">
        <h3>{title}</h3>
        <Button
          iconPosition="end"
          label="Upload Photos"
          onClick={handleOnClickUploadImageCard}
          className="upload-multiple-photos-with-preview-btns"
          icon={<AddIconCircularIcon color="#ffffff" />}
        />
      </div>
      <div
        className={clsx("upload-multiple-photos-with-preview-container",
          !selectedImages.length && "upload-multiple-photos-empty")}>
        <input type="file" accept="image/*" multiple ref={inputRef}
          className="upload-multiple-photos-with-preview-input"
          max={max}
          onChange={handleSelectedImages}
        />
        {selectedImages.length > 0 ?
          selectedImages.map((imageUrl, index) => (
            <img
              src={imageUrl}
              alt=""
              width={100}
              height={100}
              key={index}
              className="upload-multiple-photos-selected-images" />
          ))
          :
          <img src={emptyIcon} width={150} height={150} alt="" />
        }
      </div>
    </div>
  )
}