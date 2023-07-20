import { exchangeCodeForToken } from '@/app/server-utils/exchange-code-for-token';

export async function GET(_: Request, { params }: { params: { code: string } }) {
  return exchangeCodeForToken(params.code);
}
