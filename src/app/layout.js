// src/app/layout.js


export const metadata = {
  title: "My First Next App",
  description: "A Next.js project without custom fonts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
