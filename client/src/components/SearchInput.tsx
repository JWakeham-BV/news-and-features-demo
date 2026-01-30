import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onClear: () => void;
  isExpanded?: boolean;
}

export function SearchInput({ className, value, onClear, isExpanded, ...props }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when search becomes active if desired, 
  // but for this POC we keep it simple.
  
  return (
    <div 
      className={cn(
        "relative group transition-all duration-300 ease-in-out",
        isExpanded ? "w-full" : "w-full max-w-2xl mx-auto"
      )}
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        
        <input
          ref={inputRef}
          type="text"
          className={cn(
            "w-full h-14 pl-12 pr-12 rounded-2xl bg-white border-2 border-transparent",
            "shadow-lg shadow-black/5 text-lg font-medium placeholder:text-muted-foreground/70",
            "focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/10",
            "transition-all duration-200",
            className
          )}
          placeholder="Search for operations, equipment, or news..."
          value={value}
          {...props}
        />

        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
