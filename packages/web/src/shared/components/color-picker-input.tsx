import { useEffect, useState } from 'react'
import { SketchPicker, type Color } from 'react-color'
import { Popover } from '@headlessui/react'
import ColorTransformer from 'color'

interface Props {
  value: string
  onChange: (color: string) => void
}

export const ColorPickerInput = ({ value, onChange }: Props) => {
  const [color, setColor] = useState<Color>()

  function rgbaToHexa({ r, g, b, a }: { r: number; g: number; b: number; a: number }) {
    return ColorTransformer.rgb(r, g, b, a ?? 1).hexa()
  }

  useEffect(() => {
    setColor(value)
  }, [value])

  return (
    <div className="flex items-start">
      <Popover className="relative h-[25px]">
        <Popover.Button className="z-5 cursor-pointer rounded-l-md border border-neutral-300 p-1">
          <div
            className="block h-[15px] w-[40px]"
            style={{ backgroundColor: color?.toString() }}
          ></div>
        </Popover.Button>
        <Popover.Panel className="absolute z-10">
          <SketchPicker
            onChange={(color) => {
              const { r, g, b, a } = color.rgb
              setColor(color.hex)
              onChange(rgbaToHexa({ r, g, b, a: a ?? 1 }))
            }}
            color={color}
            presetColors={[]}
          />
        </Popover.Panel>
      </Popover>
      <div className="border-l-none -ml-px inline-flex h-[25px] min-w-[60px] items-center rounded-md rounded-l-none border px-2">
        <span className="text-xs font-medium text-gray-600">{color?.toString()}</span>
      </div>
    </div>
  )
}
