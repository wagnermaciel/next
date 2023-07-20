import Link from 'next/link'
import React from 'react'

import type {Discussion} from '@/app/server-utils/get-discussions-list'

export const DiscussionItemHeader: React.FC<{discussion: Discussion}> = ({discussion}) => {
  return (
    <div>
      <Link className="font-bold text-2xl"
            href={`/discussions/${discussion.number}`}>
        {discussion.title}
      </Link>
      <div className="text-sm">
        Created by {discussion.author} at {discussion.createdAt}
      </div>
    </div>
  )
};
