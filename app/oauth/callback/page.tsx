'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page: React.FC = () => {
  const params = useSearchParams();
  const { data } = useSWR(`/api/oauth/callback/${params.get('code')}`, fetcher);

  if (!data) {
    return (
      <main className="p-24">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (data.error) {
    return (
      <main className="p-24 flex flex-col">
        <h1>Failed to retrieve an access token for code: {params.get('code')}</h1>
        <pre className="mt-8 p-8 border-2 overflow-scroll">{JSON.stringify(data, null, 4)}</pre>
        <a
          className="bg-white text-black p-2 mt-8 text-center rounded-full font-bold hover:bg-gray-300 focus:bg-gray-500"
          href="https://github.com/login/oauth/authorize?client_id=Iv1.36998544bc17c34d"
        >
          Try again
        </a>
      </main>
    );
  }

  localStorage.setItem('github_access_token', data['access_token']);

  return (
    <main className="p-24 flex flex-col">
      <h1>Success!</h1>
      <pre className="mt-8 p-8 border-2 overflow-scroll">{JSON.stringify(data, null, 4)}</pre>
      <Link
        className="bg-white text-black p-2 mt-8 text-center rounded-full font-bold hover:bg-gray-300 focus:bg-gray-500"
        href="/"
      >
        Return to home page
      </Link>
    </main>
  );
};

export default Page;
