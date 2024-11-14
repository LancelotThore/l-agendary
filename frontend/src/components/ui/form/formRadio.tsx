import React from 'react';
import { Input } from "@/components/ui/input";

interface FormRadioGroupProps {
  label: string;
  name: string;
  options: { id: string; label: string, required: boolean }[];
  register: any;
}

export const FormRadioGroup = React.forwardRef<HTMLInputElement, FormRadioGroupProps>(({ label, name, options }, ref) => {
  return (
    <li className="flex flex-col gap-1">
      <p>{label}</p>
      <ul className="flex gap-3 flex-wrap">
        {options.map((option) => (
          <li key={option.id} className="flex gap-2 items-center">
            <Input type="radio" id={option.id} name={name} className="h-fit" required={option.required} ref={ref} />
            <label htmlFor={option.id}>{option.label}</label>
          </li>
        ))}
      </ul>
    </li>
  );
});

FormRadioGroup.displayName = "FormRadioGroup";