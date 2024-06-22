import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <title>Assessment</title>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.2/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <header className="h-8 bg-base-100 flex flex-row justify-center text-xl">
          Assessment
        </header>

        <main className="container mt-4 mx-auto bg-base-200 justify-self-center self-center">
          {children}
        </main>
      </body>
    </html>
  );
}
