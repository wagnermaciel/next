import React from 'react'

export const DiscussionItemBody = ({body}) => {
  return (
    <div className="border-blue-500 border-opacity-100 mt-6"
         dangerouslySetInnerHTML={{__html: body}}></div>
  )
}
