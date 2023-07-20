import React from 'react';

import {DiscussionItemHeader} from './discussion-item-header';

import type {Discussion} from '@/app/server-utils/get-discussions-list';

export const DiscussionList: React.FC<{discussions: Discussion[]}> = ({discussions}) => {
  return discussions.map(discussion => (
    <div className="group rounded-lg border border-transparent px-5 py-4
                    transition-colors hover:border-gray-300 hover:bg-gray-100
                    hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    key={discussion.id}>
      <DiscussionItemHeader discussion={discussion}/>
    </div>
  ));
};
