import clsx from "clsx"
import Button from "shared/components/Button"
import CommonModal from "shared/components/CommonModal"

interface ConfirmDeleteModalProps {
  className?: string
  message: string
  openModal: boolean
  onCloseModal(): void
  onClick(): void
}

export default function ConfirmDeleteModal({
  className,
  message,
  openModal,
  onClick,
  onCloseModal }: ConfirmDeleteModalProps) {
  return (
    <CommonModal
      open={openModal}
      onClose={onCloseModal}
      size="sm"
      className={clsx("confiirm-delete-modal", className)}>
      <h4>{message}</h4>
      <Button label="Confirm" onClick={onClick} />
    </CommonModal>
  )
}