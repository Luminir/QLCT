import { Span } from 'next/dist/trace'
import React from 'react'

const HeaderBox = ({type = "title", title, subtext, user}: HeaderBoxProps) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title">
            {title}
            {/* Check if type === 'greeting', then render () */}
            {type === "greeting" && (<span className=' text-green-500'>
                &nbsp;{user} {/* &nbsp === " ", equivalent to a spacebar*/}
            </span>)}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
    </div>
  )
}

export default HeaderBox