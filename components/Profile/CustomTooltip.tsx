import { Info } from 'lucide-react'
import { TooltipContent } from '../ui/tooltip'
import React from 'react'
import { TooltipTrigger } from '../ui/tooltip'
import { Tooltip } from '../ui/tooltip'
import { TooltipProvider } from '../ui/tooltip'

interface CustomTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}
const CustomTooltip: React.FC<CustomTooltipProps> = ({ trigger, content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent className="max-w-[500px] p-4">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip
