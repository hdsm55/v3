import React, { forwardRef } from 'react'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  children?: React.ReactNode
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({ children, ...props }, ref) => {
    return (
      <video ref={ref} {...props}>
        {children}
      </video>
    )
  },
)

LazyVideo.displayName = 'LazyVideo'

export default LazyVideo
