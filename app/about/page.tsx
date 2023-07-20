const Page: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* An intermediary div is necessary for the span because the above .flex causes all children to be display:block. */}
      <div>
        Hello!
        Use this site to browse <span className="font-bold">GitHub discussions</span>.{' '}
        {/* In dev, this updates on every request. In prod, it is statically generated. */}
        Last built at {new Date().toLocaleString()}.
      </div>
    </main>
  )
}

export default Page;

