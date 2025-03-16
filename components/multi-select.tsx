"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command } from "@/components/ui/command"

type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  options: Option[]
  selected: Option[]
  onChange: (selected: Option[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (option: Option) => {
    onChange(selected.filter((s) => s.value !== option.value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && selected.length > 0) {
          onChange(selected.slice(0, -1))
        }
      }
      // This is not a default behavior of the <input /> field
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }

  const selectables = options.filter((option) => !selected.some((s) => s.value === option.value))

  return (
    <Command onKeyDown={handleKeyDown} className={`overflow-visible bg-transparent ${className}`}>
      <div className="group border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((option) => (
            <Badge key={option.value} variant="morphic" className="mb-1">
              {option.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option)
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : undefined}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 && (
          <div className="absolute w-full z-10 top-0 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm text-foreground shadow-md outline-none animate-in">
            <div className="h-full overflow-auto max-h-52 p-1">
              {selectables.map((option) => (
                <div
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => {
                    onChange([...selected, option])
                    setInputValue("")
                  }}
                  className="cursor-pointer px-2 py-1.5 text-sm rounded-sm hover:bg-white/10"
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Command>
  )
}

