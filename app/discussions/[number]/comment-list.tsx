'use client'

import React from 'react'

import type {Comment as CommentData} from '@/app/server-utils/get-discussion-detail'

export const Comment: React.FC<{comment: CommentData}> = ({comment}) => {
  return (
    <div className="group mt-5 rounded-lg px-5 py-4
                    transition-colors border border-gray-300 bg-gray-100">
      <div className="text-xs mb-2">
        {comment.author} commented at {comment.createdAt}
      </div>
      <div className="border-blue-500 border-opacity-100"
           dangerouslySetInnerHTML={{__html: comment.bodyHTML}}></div>
    </div>
  );
};

export const CommentList: React.FC<{comments: CommentData[]}> = ({comments}) => {
  return (
    comments.map(comment =>
      <Comment comment={comment} key={comment.id} />
    )
  );
};
