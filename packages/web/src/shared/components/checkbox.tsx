import React from 'react'

type Props = { children: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = ({ children, ...props }: Props) => {
  return (
    <div className="flex">
      <label className="text_color flex items-center text-sm font-medium">
        <input
          type="checkbox"
          className="focus:ring-black-500 mr-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-1 focus:ring-neutral-700 focus:ring-offset-1"
          {...props}
        />
        {children}
      </label>
    </div>
  )
}
