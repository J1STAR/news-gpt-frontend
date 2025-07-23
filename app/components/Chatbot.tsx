import { useState } from 'react';
import { marked } from 'marked';

const API_BASE_URL = 'http://127.0.0.1:8000';

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


export default function Chatbot() {
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

    return (
        <div className="sticky top-0 my-8 min-h-[600px] rounded-2xl border border-gray-700 bg-gray-800/50 p-10 shadow-2xl">
            <h2 className="mb-5 inline-block border-b-4 border-teal-400 pb-2 text-2xl font-bold text-white">💬 AI 뉴스 분석 챗봇</h2>

            <div className="mb-5 rounded-xl bg-gray-800 p-5 shadow-inner">
                <div className="mb-4 text-sm font-semibold text-white">💡 이런 질문을 해보세요:</div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
                    {defaultSuggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            className="cursor-pointer rounded-full border border-gray-600 bg-gray-700 px-4 py-2.5 text-center text-xs font-semibold text-gray-300 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50"
                            onClick={() => handleSendMessage(suggestion)}
                            disabled={isLoading}>
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            <div id="chat-history" className="mb-5 h-96 min-h-[200px] overflow-y-auto rounded-xl border border-gray-700 bg-gray-900/50 p-4 shadow-inner">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-4 flex flex-col">
                        <div
                            className={`max-w-[70%] rounded-2xl p-3 shadow-md ${
                                msg.sender === 'user'
                                    ? 'self-end rounded-br-lg bg-blue-600 text-white'
                                    : 'self-start rounded-bl-lg bg-gray-700 text-white'
                            }`}
                            dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                        />
                    </div>
                ))}
                {isLoading && (
                    <div className="mb-4 flex flex-col">
                        <div className="max-w-[70%] self-start rounded-2xl rounded-bl-lg bg-gray-700 p-3 text-white shadow-md">
                            <div className="flex items-center gap-1">
                                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2.5">
                <input
                    type="text"
                    id="chat-input"
                    className="flex-1 rounded-full border-2 border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
    );
} 