import { useState } from 'react';
import { marked } from 'marked';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

type Message = {
    sender: 'user' | 'bot';
    text: string;
    isHtml?: boolean;
};

const initialMessage: Message = {
    sender: 'bot',
    text: `안녕하세요! 저는 주간 키워드 분석 기반 AI 챗봇입니다. 🤖<br />
<strong>현재 주간 핵심 키워드를 기반으로</strong> 다양한 관점에서 답변해드립니다.<br /><br />
📌 <strong>질문 유형:</strong><br />
• 산업별 분석: "인공지능의 경제적 영향은?"<br />
• 키워드 트렌드: "반도체 최근 동향은?"<br />
• 비교 분석: "AI vs 반도체 비교"<br />
• 일반 질문: "현재 주요 뉴스는?"`,
};

type ChatbotModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const defaultSuggestions = [
        '인공지능의 사회적 영향은?',
        '반도체 시장 경제 전망은?',
        'AI vs 반도체 비교',
        '최근 기업 동향은?'
    ];

    const handleSendMessage = async (messageText: string) => {
        const trimmedMessage = messageText.trim();
        if (!trimmedMessage || isLoading) return;

        setMessages(prev => [...prev, { sender: 'user', text: trimmedMessage }]);
        setIsLoading(true);
        if(messageText === input) {
            setInput('');
        }

        try {
            const controller = new AbortController();
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: trimmedMessage }),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages(prev => [...prev, { sender: 'bot', text: data.answer }]);
        } catch (error) {
            console.error('Chat API error:', error);
            setMessages(prev => [...prev, { sender: 'bot', text: '오류가 발생했습니다. 다시 시도해주세요.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-8 z-50 w-full max-w-lg rounded-lg bg-[var(--card-light)] shadow-2xl dark:bg-[var(--card-dark)]">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                <h2 className="text-xl font-bold">💬 AI 뉴스 분석 챗봇</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">&times;</button>
            </div>
            <div className="p-6">
                <div id="chat-history" className="mb-5 h-96 min-h-[200px] overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-inner dark:border-gray-700 dark:bg-gray-900/50">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-4 flex flex-col">
                            <div
                                className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
                                    msg.sender === 'user'
                                        ? 'self-end rounded-br-lg bg-blue-600 text-white'
                                        : 'self-start rounded-bl-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
                                }`}
                                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                            />
                        </div>
                    ))}
                    {isLoading && (
                        <div className="mb-4 flex flex-col">
                            <div className="max-w-[70%] self-start rounded-2xl rounded-bl-lg bg-gray-200 p-3 shadow-md dark:bg-gray-700">
                                <div className="flex items-center gap-1">
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-5 rounded-lg bg-gray-100 p-5 shadow-inner dark:bg-gray-800">
                    <div className="mb-4 text-sm font-semibold">💡 이런 질문을 해보세요:</div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
                        {defaultSuggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className="cursor-pointer rounded-full bg-white px-4 py-2.5 text-center text-xs font-semibold text-gray-700 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                onClick={() => handleSendMessage(suggestion)}
                                disabled={isLoading}>
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2.5">
                    <input
                        type="text"
                        id="chat-input"
                        className="flex-1 rounded-full border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        placeholder="궁금한 점을 물어보세요..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        id="chat-send"
                        className="cursor-pointer rounded-full border-none bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-px hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-60 disabled:shadow-none"
                        disabled={isLoading}>
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
} 