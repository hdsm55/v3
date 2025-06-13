import React from 'react'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = '',
  ...props
}) => {
  const percentage = (value / max) * 100

  return (
    <div
      className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
