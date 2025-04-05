import { Info } from 'lucide-react'
import { TooltipContent } from '../ui/tooltip'
import React from 'react'
import { TooltipTrigger } from '../ui/tooltip'
import { Tooltip } from '../ui/tooltip'
import { TooltipProvider } from '../ui/tooltip'

interface CustomTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  contentClassName?: string;
}
const CustomTooltip: React.FC<CustomTooltipProps> = ({ trigger, content, side = 'top', contentClassName }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent className={contentClassName} side={side}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip
