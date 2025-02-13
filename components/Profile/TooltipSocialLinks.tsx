import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import clsx from 'clsx';

interface TooltipSocialLinksProps {
    triggerContent: React.ReactNode;
    tooltipContent: string;
    tooltipStyling? : string ;
}


const TooltipSocialLinks = ( { triggerContent , tooltipContent , tooltipStyling } : TooltipSocialLinksProps ) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{triggerContent}</TooltipTrigger>
        <TooltipContent className={clsx(tooltipStyling)} side='bottom'>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipSocialLinks
