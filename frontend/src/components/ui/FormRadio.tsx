import { Input } from "@/components/ui/input";

interface FormRadioGroupProps {
  label: string;
  name: string;
  options: { id: string; label: string }[];
}

export function FormRadioGroup({ label, name, options }: FormRadioGroupProps) {
  return (
    <li className="flex flex-col gap-1">
      <p>{label}</p>
      <ul className="flex gap-3 flex-wrap">
        {options.map((option) => (
          <li key={option.id} className="flex gap-2 items-center">
            <Input type="radio" id={option.id} name={name} className="h-fit"></Input>
            <label htmlFor={option.id}>{option.label}</label>
          </li>
        ))}
      </ul>
    </li>
  );
}