import clsx from "clsx";
import CommonCard from "shared/components/CommonCard";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";

interface UploadImageCardProps {
  className?: string
  onClick():void
}

export default function UploadImageCard({ className,onClick }: UploadImageCardProps) {
  return (
    <CommonCard className={clsx("upload-image-card", className)} onClick={onClick}>
      <AddIconCircularIcon color="#5449f0" fontSize="3rem" />
    </CommonCard>)
}