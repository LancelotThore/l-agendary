import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search } from "./icons";

export interface SelectInputProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: string[];
  img?: React.ReactNode;
  placeholder?: string;
  fetchOptions?: () => Promise<string[]>;
}

const SearchInput = React.forwardRef<HTMLDivElement, SelectInputProps>(
  ({ className, options = [], img = <Search className="w-4 md:w-6" />, placeholder = "Select an option", fetchOptions, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [dynamicOptions, setDynamicOptions] = useState<string[]>(options);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = dynamicOptions.filter(option =>
      typeof option === 'string' && option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
      if (fetchOptions) {
        fetchOptions().then(fetchedOptions => {
          console.log("Fetched options:", fetchedOptions); // Debugging log
          setDynamicOptions(fetchedOptions);
        }).catch(error => {
          console.error("Error fetching options:", error);
        });
      }
    }, [fetchOptions]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative flex flex-col items-center w-full md:max-w-lg" ref={dropdownRef}>
        <div
          className={cn(
            "relative flex items-center w-full h-10 rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            img ? "pl-10" : "",
            isDropdownOpen ? "bg-nav border-nav ring-nav" : "focus:bg-secondary",
            className
          )}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          {...props}
          ref={ref}
        >
          {img && <div className="absolute left-3 z-10">{img}</div>}
          <span className="flex-grow">{selectedOption || placeholder}</span>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full md:max-w-lg rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background z-20">
            <input
              type="text"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
              )}
              placeholder="Rechercher"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer py-2 px-3 hover:bg-gray-200"
                  onClick={() => {
                    setSelectedOption(option);
                    setSearchTerm("");
                    setIsDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };