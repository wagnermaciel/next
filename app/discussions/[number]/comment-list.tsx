'use client'

import React, {useState} from 'react'
import useSWR from 'swr';

import type {Comment as CommentData} from '@/app/server-utils/get-discussion-detail'

const fetcher = (url: string) => fetch(url).then(r => r.json());

const Comment: React.FC<{comment: CommentData, allowReplies: boolean}> = ({comment, allowReplies}) => {
  const [viewReplies, setViewReplies] = useState(false);

  const viewRepliesUrl = encodeURI(`/api/comments/${comment.id}`);
  const {data} = useSWR(() => (viewReplies ? viewRepliesUrl : null), fetcher);

  function viewRepliesClicked() {
    setViewReplies(true);
  }

  return (
    <div className="group mt-5 rounded-lg px-5 py-4
                    transition-colors border border-gray-300 bg-gray-100">
      <div className="text-xs mb-2">
        <div>
          {comment.author} commented at {comment.createdAt}
        </div>
      </div>
      <div className="border-blue-500 border-opacity-100"
           dangerouslySetInnerHTML={{__html: comment.bodyHTML}}></div>
      <div className="flex justify-end">
        <button className={`text-xs ${viewReplies || !allowReplies ? "hidden" : "block"}`}
                onClick={viewRepliesClicked}>
          View replies
        </button>
      </div>
      <section>
        {data?.map(reply => {
          return (
            <Comment key={reply.id} comment={reply} allowReplies={false} />
          );
         })}
      </section>
    </div>
  );
};

export const CommentList: React.FC<{comments: CommentData[]}> = ({comments}) => {
  return (
    comments.map(comment =>
      <Comment key={comment.id} comment={comment} allowReplies={true} />
    )
  );
};
