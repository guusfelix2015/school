import React, { useMemo } from 'react'
import ReactTooltip, { type Place } from 'react-tooltip'

interface Props {
  placement?: Place
  title: string | React.ReactNode
  children: React.ReactNode
}

export const Tooltip = ({ placement, title, children }: Props) => {
  const id = useMemo(() => Math.random().toString(36).substring(8), [title])

  return (
    <>
      <span className="inline" data-tip data-for={id}>
        {children}
      </span>
      <ReactTooltip
        id={id}
        place={placement ?? 'top'}
        effect="solid"
        className="!rounded-lg !py-2 !px-3 text-sm text-white"
      >
        {title}
      </ReactTooltip>
    </>
  )
}
