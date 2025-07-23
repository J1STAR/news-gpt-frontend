import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css?url";
import indexStyles from "./styles/index.css?url";
// import analysisStyles from "./styles/analysis.css?url"; // Removed to scope to analysis route
// import newsDetailStyles from "./styles/news-detail.css?url"; // Removed to scope to news-detail route


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: indexStyles },
  // { rel: "stylesheet", href: analysisStyles },
  // { rel: "stylesheet", href: newsDetailStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
