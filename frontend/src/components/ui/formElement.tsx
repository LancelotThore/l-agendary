"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface FormElementProps {
  label: string;
  variant: "input" | "textarea" | "file";
  type?: string;
  id: string;
  name: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  rows?: number;
  accept?: string;
}

export function FormElement({ label, variant, type, id, name, placeholder, maxLength, required, rows, accept }: FormElementProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  return (
    <li className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      {variant === "input" && (
        <Input placeholder={placeholder} type={type} maxLength={maxLength} required={required} name={name} id={id}></Input>
      )}
      {variant === "textarea" && (
        <textarea className="p-1.5 border-border border rounded-lg focus:border-border bg-background" name={name} id={id} maxLength={maxLength} placeholder={placeholder} rows={rows}></textarea>
      )}
      {variant === "file" && (
        <>
          <Input className="hidden" type="file" id={id} name={name} accept={accept} onChange={handleFileChange} />
          <label htmlFor={id} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md w-fit cursor-pointer">
            {fileName ? fileName : "Choisir un fichier"}
          </label>
        </>
      )}
    </li>
  );
}