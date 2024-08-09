import clsx from "clsx"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import AddIconFilledCirculatIcon from "shared/icons/AddIconFilledCircularIcon";

interface UploadSinglePhotoProps {
  className?: string
  previewImageClassName?: string
  onUploadImage(image: File | never[]): void
  defaultProfileIcon: string
  url?: string
}


export default function UploadSinglePhoto({ className,
  onUploadImage,
  previewImageClassName,
  url,
  defaultProfileIcon
}: UploadSinglePhotoProps) {
  const inputref = useRef<null | HTMLInputElement>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("")

  useEffect(() => {
    if (url) {
      setSelectedImageUrl(url)
    }
  }, [url])

  function handleOnSelectImage(e: ChangeEvent<HTMLInputElement>) {
    const image = e.target.files ? e.target.files[0] : null
    if (image) {
      const selectedImageUrl = URL.createObjectURL(image)
      setSelectedImageUrl(selectedImageUrl)
      onUploadImage(image)
    }

  }

  function onClickImage() {
    if (inputref.current) {
      inputref.current.click()
    }
  }

  return (
    <div className={clsx("upload-single-photo-container", className)}>
      <input
        type="file"
        accept="image/*"
        ref={inputref}
        onChange={handleOnSelectImage}
        className="upload-single-photo-input" />
      <div className="upload-single-photo-preview-image-container">
        {selectedImageUrl ?
          <img src={selectedImageUrl}
            alt=""
            width={100}
            height={100}
            className={clsx("upload-single-photo-image", previewImageClassName)} />
          : <img
            src={defaultProfileIcon}
            alt=""
            width={100}
            height={100}
            onClick={onClickImage}
            className={clsx("upload-single-photo-default-photo", previewImageClassName)} />
        }
        <span className="upload-single-photo-cancel-button-container"
          onClick={onClickImage}>
          <AddIconFilledCirculatIcon color="#5449f0" fontSize="2rem"
            className="upload-single-photo-cancel-fill-icon" />
        </span>
      </div>
    </div>)
}