import { useState } from 'react';

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
    isHtml: true,
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
        <div className="chatbot-section">
            <h2 className="section-title">💬 AI 뉴스 분석 챗봇</h2>

            <div className="chat-suggestions">
                <div className="suggestion-title">💡 이런 질문을 해보세요:</div>
                <div className="suggestions-container">
                    {defaultSuggestions.map((suggestion, index) => (
                        <button key={index} className="suggestion-item" onClick={() => handleSendMessage(suggestion)} disabled={isLoading}>
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            <div id="chat-history" className="chat-history">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        {msg.isHtml ? (
                            <div className={`chat-${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
                        ) : (
                            <div className={`chat-${msg.sender}`}>{msg.text}</div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="chat-message">
                        <div className="chat-bot typing-dots">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="chat-input-container">
                <input
                    type="text"
                    id="chat-input"
                    className="chat-input"
                    placeholder="궁금한 점을 물어보세요..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    autoComplete="off"
                />
                <button type="submit" id="chat-send" className="chat-send" disabled={isLoading}>
                    전송
                </button>
            </form>
        </div>
    );
} 