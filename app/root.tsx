import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css?url";
import { useState } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>See-Saw - IT News for Professionals</title>
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary-color: #007bff;
              --background-light: #f8f9fa;
              --card-light: #ffffff;
              --text-primary-light: #212529;
              --background-dark: #121212;
              --card-dark: #1e1e1e;
              --text-primary-dark: #e0e0e0;
              --accent-color: #007bff;
            }
            body {
              font-family: 'Inter', sans-serif;
            }
            .theme-toggle:focus {
              outline: none;
            }
            .theme-toggle .sun-icon,
            .theme-toggle .moon-icon {
              transition: transform 0.3s ease, opacity 0.3s ease;
            }
            html.dark .theme-toggle .sun-icon {
              transform: rotate(90deg) scale(0);
              opacity: 0;
            }
            html.dark .theme-toggle .moon-icon {
              transform: rotate(0) scale(1);
              opacity: 1;
            }
            .theme-toggle .moon-icon {
              transform: rotate(-90deg) scale(0);
              opacity: 0;
              position: absolute;
            }
          `
        }} />
      </head>
      <body className="bg-[var(--background-light)] text-[var(--text-primary-light)] dark:bg-[var(--background-dark)] dark:text-[var(--text-primary-dark)] transition-colors duration-300">
        <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
        <script dangerouslySetInnerHTML={{
          __html: `
            function toggleTheme() {
              document.documentElement.classList.toggle('dark');
            }
          `
        }} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
