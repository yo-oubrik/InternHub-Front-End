import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import clsx from 'clsx';

interface RadioButtonProps {
  value: any;
  onValueChange: (value: any) => void;
  items: string[];
  itemsValue : any[] ;
  defaultValue?: any;
  classNameGroup? : string 
  classNameItem? : string
  disabled? : boolean
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, onValueChange, items, itemsValue, defaultValue , classNameGroup , classNameItem , disabled }) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={clsx("flex flex-row justify-between w-full" , classNameGroup)}
      defaultValue={defaultValue ?? items[0]} // Set the first item as default if not provided
      disabled={disabled} // Disable the group if disabled prop is provided
    >
      {items.map((item , index) => 
        <div key={index} className={clsx("flex items-center space-x-2" , classNameItem)}>
          <RadioGroupItem value={itemsValue[index]} id={item} />
          <Label htmlFor={item}>{item}</Label>
        </div>
      )}
    </RadioGroup>
  );
};

export default RadioButton;
