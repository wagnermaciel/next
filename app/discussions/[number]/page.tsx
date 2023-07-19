import React from 'react'

import {getDiscussionDetail} from '../../server-utils/get-discussion-detail';
import {DiscussionItemBody} from '../discussion-item-body';
import {DiscussionItemHeader} from '../discussion-item-header';

import type {DiscussionDetail} from '@/app/server-utils/get-discussion-detail';


const Page: React.FC = async ({params}) => {
  const data = await getDiscussionDetail(Number(params.number));
  const discussion = data.discussion;
  return (
    <div>
      <DiscussionItemHeader discussion={discussion} />
      <DiscussionItemBody body={discussion.bodyHTML} />
    </div>
  )
};

export default Page;
