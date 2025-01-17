import { queryGraphql } from "./query-graphql";

export interface Comment {
  id: string;
  author: string;
  createdAt: string;
  bodyHTML: string;
}

export interface DiscussionDetail {
  id: string;
  number: number;
  title: string;
  author: string;
  createdAt: string;
  reactionGroups: any;
  bodyHTML: string;
  comments: Comment[];
}

export interface DiscussionResponse {
  discussion: DiscussionDetail;
}

export async function getDiscussionDetail(discussionId: Number): Promise<DiscussionResponse> {
  const data: any = await queryGraphql(
    `
  query discussionDetails($repoOwner: String!, $repoName: String!, $number: Int!) {
    repository(owner: $repoOwner, name: $repoName) {
      discussion(number: $number) {
        id,
        number
        title
        author {
          login
        }
        createdAt
        reactionGroups {
          content
          reactors {
            totalCount
          }
        }
        bodyHTML
        comments(first: 10) {
          edges {
            node {
              author {
                login
              }
              createdAt
              bodyHTML
            }
          }
        }
      }
    }
  }`,
    {
      number: discussionId,
    }
  );

  const {
    repository: {
      discussion: {
        id,
        number,
        title,
        author: { login: author },
        createdAt,
        reactionGroups,
        bodyHTML,
        comments: { edges: comments },
      },
    },
  } = data;

  return {
    discussion: {
      id,
      number,
      title,
      author,
      createdAt,
      reactionGroups,
      bodyHTML,
      comments: comments.map(
        ({ node: { author, createdAt, bodyHTML } }: any) => ({
          id,
          author: author.login,
          createdAt,
          bodyHTML,
        })
      ),
    },
  };
}
