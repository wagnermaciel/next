import {getCommentReplies} from "@/app/server-utils/get-discussion-detail";
import {NextResponse} from "next/server";

export async function GET(
  request: Request,
  {params}: {params: {commentId: string}}
) {
  return NextResponse.json(
    await getCommentReplies(params.commentId));
}
