import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css?url";
import Header from '~/components/Header';
import SubscribeModal from "./components/SubscribeModal";
import ChatbotModal from "./components/ChatbotModal";
import { useState } from "react";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap", rel: "stylesheet" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  
  const toggleChatbotModal = () => {
    setIsChatbotModalOpen(!isChatbotModalOpen);
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[var(--background-light)] text-[var(--text-primary-light)] dark:bg-[var(--background-dark)] dark:text-[var(--text-primary-dark)] transition-colors duration-300">
        <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
          <Header onSubscribeClick={() => setIsSubscribeModalOpen(true)} />
          {children}
          <ScrollRestoration />
          <Scripts />
          <SubscribeModal 
            isOpen={isSubscribeModalOpen} 
            onClose={() => setIsSubscribeModalOpen(false)} 
          />
          <ChatbotModal 
            isOpen={isChatbotModalOpen} 
            onClose={() => setIsChatbotModalOpen(false)}
          />
          <button
            onClick={toggleChatbotModal}
            className="fixed bottom-8 right-8 z-40 h-16 w-16 rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110"
            title="Open Chatbot"
          >
            <span className="text-3xl">🤖</span>
          </button>
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Outlet />
  );
}
