import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import clsx from 'clsx';

interface ProfileAvatarProps {
  avatarImage: string;
  avatarFallback: string;
  className? : string ;
}

const ProfileAvatar = ( {avatarImage,avatarFallback,className } : ProfileAvatarProps ) => {
  return (
    <Avatar className={clsx(className)}>
        <AvatarImage src={avatarImage} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  );
}

export default ProfileAvatar
