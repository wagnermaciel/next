import { Octokit } from 'octokit';

export async function GET(_: Request, { params }: { params: { token: string } }) {
  const octokit = new Octokit({ auth: params.token });
  const response = await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return new Response(JSON.stringify(response));
}
