import clsx from "clsx";
import UploadMultiplePhotosWithPreview from "components/UploadMultiplePhotos";
import { CoverPhotos } from "core/models/restaurants";
import CommonCard from "shared/components/CommonCard";

interface AddRestaurantCoverPhotosProps {
  className?: string
  onImagesToUpload(files: File[], images?: string[]): void
  urls?: CoverPhotos[]
}

export default function AddRestaurantCoverPhotos({ className, onImagesToUpload, urls }: AddRestaurantCoverPhotosProps) {
  function handleImagesToUpload(files: File[], images: string[]) {
    onImagesToUpload(files, images)
  }

  return (
    <CommonCard className={clsx("add-restaurant-cover-photos-container", className)}>
      <UploadMultiplePhotosWithPreview
        urls={urls}
        onImagesToUpload={handleImagesToUpload}
      />
    </CommonCard>)
}