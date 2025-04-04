import React, { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import clsx from 'clsx';

interface ProfileAvatarProps {
  avatarImage: string;
  avatarFallback: string | undefined ;
  overlay? : ReactNode;
  className? : string ;
}

const ProfileAvatar = ( {avatarImage,avatarFallback,overlay,className } : ProfileAvatarProps ) => {
  return (
    <Avatar className={clsx(className)}>
        <AvatarImage src={avatarImage} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
        {overlay}
    </Avatar>
  );
}

export default ProfileAvatar
