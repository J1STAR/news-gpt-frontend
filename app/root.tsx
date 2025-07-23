import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css?url";
import headerStyles from "~/styles/components/header.css?url";
import navigationStyles from "~/styles/components/navigation.css?url";
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';
import SubscribeModal from "./components/SubscribeModal";
import { useState } from "react";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: headerStyles },
  { rel: "stylesheet", href: navigationStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header onSubscribeClick={() => setIsSubscribeModalOpen(true)} />
        <Navigation />
        {children}
        <ScrollRestoration />
        <Scripts />
        <SubscribeModal 
          isOpen={isSubscribeModalOpen} 
          onClose={() => setIsSubscribeModalOpen(false)} 
        />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
