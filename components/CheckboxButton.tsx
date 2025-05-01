import clsx from "clsx";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface CheckboxButtonProps {
  onCheckedFunction: (key: any, value: any) => void;
  items: string[];
  itemsValue: any[];
  classNameGroup?: string;
  classNameItemContainer?: string;
  classNameItemContainerWhenChecked?: string;
  classNameLabel?: string;
  classNameLabelWhenChecked?: string;
  classNameItem?: string;
  classNameItemWhenChecked?: string;
  currentValue?: any;
  disabled?: boolean;
}

const CheckboxButton = ({
  items,
  itemsValue,
  onCheckedFunction,
  classNameGroup,
  classNameItemContainer,
  classNameItemContainerWhenChecked,
  classNameLabel,
  classNameLabelWhenChecked,
  classNameItem,
  classNameItemWhenChecked,
  currentValue,
  disabled,
}: CheckboxButtonProps) => {
  return (
    console.log("itemsValue", itemsValue),
    console.log("items", items),
    (
      <div className={clsx(classNameGroup)}>
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center rounded-lg transition-all",
              itemsValue[index] && classNameItemContainerWhenChecked,
              classNameItemContainer
            )}
          >
            <Checkbox
              id={item}
              className={clsx(
                classNameItem,
                itemsValue[index] && classNameItemWhenChecked
              )}
              checked={currentValue === itemsValue[index]}
              onCheckedChange={() => onCheckedFunction(item, itemsValue[index])}
              disabled={disabled}
            />
            <Label
              htmlFor={item}
              className={clsx(
                itemsValue[index] && classNameLabelWhenChecked,
                classNameLabel
              )}
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    )
  );
};

export default CheckboxButton;
