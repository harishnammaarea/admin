import { ReactElement } from "react";
import { Popover, Whisper } from "rsuite";

interface CommonPopoverProps {
  className?: string
  popOverContent: ReactElement
  trigger?: | Array<'click' | 'contextMenu' | 'hover' | 'focus' | 'active'>
  | 'click'
  | 'contextMenu'
  | 'hover'
  | 'focus'
  | 'active'
  | 'none'
  placement?: | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'leftEnd'
  | 'rightStart'
  | 'rightEnd'
  | 'auto'
  | 'autoVerticalStart'
  | 'autoVerticalEnd'
  | 'autoHorizontalStart'
  | 'autoHorizontalEnd';
  children: ReactElement,
  popOverClassName?: string
}

export default function CommonPopover({ className,
  children,
  placement = "bottom",
  trigger = "click",
  popOverClassName,
  popOverContent
}: CommonPopoverProps) {
  return (<Whisper
    className={className}
    trigger={trigger}
    placement={placement}
    preventOverflow={true}
    speaker={
      <Popover className={popOverClassName}>
        {popOverContent}
      </Popover>
    }
  >
    {children}
  </Whisper>
  )

}
