import React from 'react'

import {getDiscussionDetail} from '../../server-utils/get-discussion-detail';
import {DiscussionItemHeader} from '../discussion-item-header';
import {CommentList} from './comment-list';

import type {DiscussionDetail} from '@/app/server-utils/get-discussion-detail';

const Page: React.FC<{params: {number: number}}> = async ({params}) => {
  const data = await getDiscussionDetail(Number(params.number));
  const discussion = data.discussion;
  return (
    <div>
      <DiscussionItemHeader discussion={discussion} />
      <div className="border-blue-500 border-opacity-100 mt-6"
           dangerouslySetInnerHTML={{__html: discussion.bodyHTML}}></div>
      <CommentList comments={discussion.comments} />
    </div>
  )
};

export default Page;
