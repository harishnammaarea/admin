import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { Modal } from "rsuite";

interface CommonModalProps {
  className?: string
  open: boolean
  bodyClassName?: string
  children: ReactNode
  overflow?: boolean
  size?: "full" | "lg" | "md" | "sm" | "xs"
  onClose(): void
  title?: string
}

export default function CommonModal({
  open,
  className,
  bodyClassName,
  children,
  overflow = true,
  size = "md",
  title = "",
  onClose }: CommonModalProps) {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setOpenModal(open)
  }, [open])

  function handleOnClose() {
    setOpenModal(!openModal)
    onClose()
  }

  return (
    <Modal open={openModal}
      size={size}
      overflow={overflow}
      onClose={handleOnClose}
      className={clsx("modal-main-container", className)}>
      <Modal.Header>
        <Modal.Title style={{ fontWeight: "700" }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={bodyClassName}>
        {children}
      </Modal.Body>
    </Modal>)
}