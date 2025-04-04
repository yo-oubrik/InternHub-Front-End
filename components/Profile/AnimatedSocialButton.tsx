import React, { useState, useRef } from 'react';
import { Github, Linkedin, FileText, Globe } from 'lucide-react';

interface AnimatedSocialButtonProps {
  href: string;
  platform: 'github' | 'linkedin' | 'cv' | 'portfolio';
  className?: string;
  disabled : boolean ;
}

const AnimatedSocialButton = ({ href, platform, className = '' , disabled }: AnimatedSocialButtonProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getPlatformConfig = () => {
    switch (platform) {
      case 'github':
        return {
          icon: <Github className="w-5 h-5" />,
          bgColor: 'bg-black',
          textColor: 'text-white',
          hoverBgColor: 'hover:bg-black/90',
        };
      case 'linkedin':
        return {
          icon: <Linkedin className="w-5 h-5" />,
          bgColor: 'bg-[#0077b7]',
          textColor: 'text-white',
          hoverBgColor: 'hover:bg-[#0077b7]/90',
        };
      case 'cv':
        return {
          icon: <FileText className="w-5 h-5" />,
          bgColor: 'bg-slate-600',
          textColor: 'text-white',
          hoverBgColor: 'hover:bg-slate-700',
        };
      case 'portfolio':
        return {
          icon: <Globe className="w-5 h-5" />,
          bgColor: 'bg-purple-600',
          textColor: 'text-white',
          hoverBgColor: 'hover:bg-purple-700',
        };
    }
  };

  const config = getPlatformConfig();

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-lg px-4 py-2 ${config.bgColor} ${config.textColor} ${config.hoverBgColor} transition-all duration-300 group hover:scale-105 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center gap-2">
        <span className="relative z-10">{config.icon}</span>
        <span className="relative z-10 capitalize">{platform}</span>
      </div>
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100px)`,
          pointerEvents: 'none',
        }}
      />
    </a>
  );
};

export default AnimatedSocialButton; 