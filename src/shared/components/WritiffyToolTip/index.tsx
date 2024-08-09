import { ReactElement, ReactNode } from "react";
import { Tooltip, Whisper } from "rsuite";

interface WritiffyToolTipProps {
  className?: string
  placement: | 'top'
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
  trigger: Array<'click' | 'contextMenu' | 'hover' | 'focus' | 'active'>
  | 'click'
  | 'contextMenu'
  | 'hover'
  | 'focus'
  | 'active'
  | 'none';
  toolTip: string,
  toolTipComponent: ReactElement
}

export default function WritiffyToolTip({ className, trigger = "click", placement = "top", toolTip, toolTipComponent }: WritiffyToolTipProps) {
  return (
    <Whisper
      trigger={trigger}
      placement={placement}
      speaker={<Tooltip>{toolTip}</Tooltip>}
      className={className}
    >
      {toolTipComponent}
    </Whisper>
  )
}