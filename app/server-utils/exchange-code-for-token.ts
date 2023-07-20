import { requireEnv } from './query-graphql';

export async function exchangeCodeForToken(code: string) {
  const clientId = requireEnv('GITHUB_CLIENT_ID');
  const clientSecret = requireEnv('GITHUB_CLIENT_SECRET');
  const URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  return await fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
    },
  });
}
