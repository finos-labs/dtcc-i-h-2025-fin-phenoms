import React, { useState, useRef, useEffect } from 'react';

const AIChat = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m your AI financial assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Mock AI response function (in production, this would call AWS Bedrock or another AI service)
    const getAIResponse = async (userMessage) => {
        setIsTyping(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock responses based on keywords in the user's message
        let response = '';
        const lowerCaseMessage = userMessage.toLowerCase();
        
        if (lowerCaseMessage.includes('stock') || lowerCaseMessage.includes('invest')) {
            response = "Based on current market conditions, I recommend diversifying your portfolio. Consider a mix of growth stocks and value stocks to balance risk.";
        } else if (lowerCaseMessage.includes('market')) {
            response = "The market has been showing volatility recently. Keep an eye on economic indicators and consider long-term investment strategies.";
        } else if (lowerCaseMessage.includes('portfolio')) {
            response = "A well-balanced portfolio typically includes a mix of stocks, bonds, and other assets. The specific allocation depends on your risk tolerance and investment timeline.";
        } else if (lowerCaseMessage.includes('risk')) {
            response = "Risk management is crucial in investing. Consider your time horizon, diversify your investments, and only invest what you can afford to lose.";
        } else if (lowerCaseMessage.includes('crypto') || lowerCaseMessage.includes('bitcoin')) {
            response = "Cryptocurrency investments are highly volatile. They should typically represent only a small portion of a diversified portfolio.";
        } else if (lowerCaseMessage.includes('retirement') || lowerCaseMessage.includes('401k')) {
            response = "Retirement planning should start early. Consider tax-advantaged accounts like 401(k)s and IRAs, and increase contributions as your income grows.";
        } else if (lowerCaseMessage.includes('inflation')) {
            response = "Inflation can erode purchasing power over time. Assets like stocks, real estate, and TIPS (Treasury Inflation-Protected Securities) can help hedge against inflation.";
        } else if (lowerCaseMessage.includes('dividend')) {
            response = "Dividend-paying stocks can provide income and potentially lower volatility. They're often favored by income-focused investors.";
        } else if (lowerCaseMessage.includes('etf') || lowerCaseMessage.includes('fund')) {
            response = "ETFs and mutual funds offer diversification and professional management. They can be a good option for investors who prefer not to select individual stocks.";
        } else if (lowerCaseMessage.includes('bond')) {
            response = "Bonds typically offer lower returns but also lower risk compared to stocks. They can provide income and help stabilize a portfolio.";
        } else if (lowerCaseMessage.includes('thank')) {
            response = "You're welcome! I'm here to help with any financial questions you might have.";
        } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            response = "Hello! How can I assist with your financial questions today?";
        } else {
            response = "That's an interesting question. As a financial AI assistant, I can help with investment strategies, market analysis, portfolio management, and general financial advice. Could you provide more details about what you'd like to know?";
        }
        
        setIsTyping(false);
        return response;
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        
        // Add user message
        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        
        // Get AI response
        const aiResponse = await getAIResponse(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    };

    return (
        <>
            {/* Chat toggle button */}
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
                {isChatOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>
            
            {/* Chat window */}
            {isChatOpen && (
                <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 max-w-full flex flex-col h-96 border border-gray-200 dark:border-gray-700">
                    {/* Chat header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Financial AI Assistant
                        </h3>
                        <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Chat messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}
                            >
                                <div 
                                    className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                                        message.role === 'user' 
                                            ? 'bg-purple-600 text-white rounded-br-none' 
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="mb-4">
                                <div className="inline-block p-3 rounded-lg max-w-xs lg:max-w-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Chat input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <button 
                                type="submit" 
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-r-lg hover:opacity-90 transition-opacity"
                                disabled={isTyping}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default AIChat;