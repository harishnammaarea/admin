import clsx from "clsx"
import Button from "shared/components/Button"
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon"

interface AddAreaAdminFormBtnsProps {
  className?: string
  active: number
}

export default function AddAreaAdminFormBtns({ className, active }: AddAreaAdminFormBtnsProps) {
  return (
    <div className={clsx("add-area-admin-form-btns-container", className)}>
      {
        active !== 1 &&
        <Button
          label="Previous"
          iconPosition="start"
          icon={<ArrowWithLineIcon color="#ffffff" />}
          className="add-area-admin-form-btn" />
      }
      <Button
        label="Next"
        iconPosition="end"
        type="submit"
        icon={<ArrowWithLineIcon color="#ffffff" rotate={180} />}
        className="add-area-admin-form-btn" />
    </div>)
}