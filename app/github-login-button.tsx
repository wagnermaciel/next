'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GitHubLoginButton: React.FC = () => {
  const [token, setToken] = useState<string | null>();
  const { data, error, isLoading } = useSWR(token ? `/api/github/user/${token}` : null, fetcher);

  useEffect(() => {
    setToken(localStorage.getItem('github_access_token'));
  }, []);

  if (token === undefined || isLoading) {
    return null;
  }

  if (error) {
    localStorage.removeItem('github_access_token');
  }

  if (!token || error) {
    return (
      <a
        href="https://github.com/login/oauth/authorize?client_id=Iv1.36998544bc17c34d"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          GitHub Login{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Log into your GitHub account.</p>
      </a>
    );
  }

  return (
    <a
      href={data?.data?.html_url}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        GitHub Profile{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>View your GitHub profile.</p>
    </a>
  );
};

export default GitHubLoginButton;
