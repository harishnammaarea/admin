import clsx from "clsx";
import { Tag } from "rsuite";

interface CommonTagProps {
  className?: string
  tag: string
  onClose?(): void
  closable?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
}

export default function CommonTag({ className, closable = true, onClose, color, tag = "",size="md" }: CommonTagProps) {
  return (
    <Tag
      closable={closable}
      color={color}
      size={size}
      onClose={() => { onClose && onClose() }}
      className={clsx("common-tag-container", className)}>
      {tag}
    </Tag>)
}