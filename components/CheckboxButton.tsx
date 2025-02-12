import clsx from 'clsx';
import React from 'react'
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface CheckboxButtonProps {
    onCheckedFunction : (value: any) => void;
    items: string[];
    itemsValue : any[] ;
    classNameGroup? : string 
    classNameItem? : string
    disabled? : boolean
  }

const CheckboxButton = ({ items , itemsValue , onCheckedFunction , classNameGroup , classNameItem , disabled} : CheckboxButtonProps) => {
  return (
    <div className={clsx("space-y-4",classNameGroup)}>
        {
            items.map((item , index) =>
                <div key={index} className={clsx("flex items-center space-x-2" , classNameItem)}>
                    <Checkbox
                        id={item}
                        checked={itemsValue[index]}
                        onCheckedChange={() => onCheckedFunction(item) }
                        disabled={disabled}
                    />
                    <Label htmlFor={item}>{item}</Label>
                </div>
        )}
    </div>
  );
}

export default CheckboxButton;
