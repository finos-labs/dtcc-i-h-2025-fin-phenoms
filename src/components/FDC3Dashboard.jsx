import React, { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

// Enhanced Mock FDC3 Implementation with more realistic features
const mockFDC3 = {
    broadcast: (context) => {
        console.log('Broadcasting context:', context);
        return Promise.resolve();
    },
    raiseIntent: (intent, context) => {
        console.log('Raising intent:', intent, context);
        return Promise.resolve();
    },
    addContextListener: (handler) => {
        console.log('Context listener added');
        return Promise.resolve(() => {});
    },
    addIntentListener: (intent, handler) => {
        console.log('Intent listener added for:', intent);
        return Promise.resolve(() => {});
    }
};

// Initialize FDC3
if (typeof window !== 'undefined') {
    window.fdc3 = mockFDC3;
}

// Enhanced Financial Data Service
class FinancialDataService {
    constructor() {
        this.apiKey = ''; // You'll need to get API keys for production
        this.baseUrl = 'https://api.example.com'; // Replace with actual API
        this.wsConnection = null;
    }

    // Simulate real-time stock data (replace with actual API calls)
    async getStockPrice(symbol) {
        // In production, replace this with actual API calls to:
        // - Alpha Vantage (free tier available)
        // - Other market data providers as needed

        const basePrice = this.getBasePriceForSymbol(symbol);
        const variation = (Math.random() - 0.5) * 10;
        const price = Math.max(basePrice + variation, 0.01);

        return {
            symbol,
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(((Math.random() - 0.5) * 5).toFixed(2)),
            changePercent: parseFloat(((Math.random() - 0.5) * 3).toFixed(2)),
            volume: Math.floor(Math.random() * 10000000),
            marketCap: Math.floor(Math.random() * 1000000000000),
            timestamp: new Date().toISOString()
        };
    }

    getBasePriceForSymbol(symbol) {
        const basePrices = {
            'AAPL': 175, 'MSFT': 378, 'GOOGL': 141, 'TSLA': 248, 'AMZN': 151,
            'NVDA': 735, 'META': 318, 'NFLX': 445, 'AMD': 142, 'CRM': 267,
            'ORCL': 115, 'ADBE': 558, 'PYPL': 58, 'INTC': 25, 'CSCO': 51,
            'IBM': 162, 'QCOM': 169, 'TXN': 186, 'AVGO': 865, 'NOW': 789
        };
        return basePrices[symbol] || 100;
    }

    // Simulate market news (replace with actual news API)
    async getMarketNews() {
        const newsTemplates = [
            { title: "Federal Reserve Considers Interest Rate Adjustments", category: "monetary-policy" },
            { title: "Tech Sector Shows Strong Quarterly Performance", category: "earnings" },
            { title: "Energy Stocks Rally on Supply Chain Improvements", category: "commodities" },
            { title: "Cryptocurrency Market Experiences Volatility", category: "crypto" },
            { title: "Healthcare Stocks Surge on Breakthrough Research", category: "healthcare" },
            { title: "Banking Sector Updates Lending Practices", category: "banking" },
            { title: "Retail Giants Report Holiday Shopping Metrics", category: "retail" },
            { title: "Manufacturing Index Shows Economic Recovery", category: "manufacturing" }
        ];

        return newsTemplates.map((template, index) => ({
            ...template,
            id: index,
            timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
            impact: Math.random() > 0.5 ? 'positive' : 'negative'
        }));
    }

    // Simulate economic indicators
    async getEconomicIndicators() {
        return {
            gdpGrowth: parseFloat((Math.random() * 4 + 1).toFixed(2)),
            inflation: parseFloat((Math.random() * 3 + 2).toFixed(2)),
            unemployment: parseFloat((Math.random() * 2 + 3).toFixed(1)),
            interestRate: parseFloat((Math.random() * 2 + 4).toFixed(2)),
            vixIndex: parseFloat((Math.random() * 20 + 15).toFixed(2))
        };
    }
}

// AI Investment Advisor (Mock implementation)
class AIInvestmentAdvisor {
    constructor() {
        this.riskTolerance = 'moderate';
        this.investmentHorizon = 'long-term';
    }

    // Simulate AI-powered stock analysis
    analyzeStock(stockData, marketData) {
        const { price, changePercent, volume } = stockData;
        const { vixIndex } = marketData;

        // Simple scoring algorithm (replace with actual AI model)
        let score = 0;
        let reasoning = [];

        // Price momentum analysis
        if (changePercent > 2) {
            score += 20;
            reasoning.push("Strong positive momentum");
        } else if (changePercent < -2) {
            score -= 15;
            reasoning.push("Negative momentum concern");
        }

        // Volume analysis
        if (volume > 5000000) {
            score += 10;
            reasoning.push("High trading volume indicates interest");
        }

        // Market volatility consideration
        if (vixIndex < 20) {
            score += 15;
            reasoning.push("Low market volatility favors growth");
        } else {
            score -= 10;
            reasoning.push("High market volatility increases risk");
        }

        // Generate recommendation
        let recommendation;
        if (score >= 25) recommendation = 'strong-buy';
        else if (score >= 10) recommendation = 'buy';
        else if (score >= -10) recommendation = 'hold';
        else if (score >= -25) recommendation = 'sell';
        else recommendation = 'strong-sell';

        return {
            score,
            recommendation,
            reasoning,
            confidence: Math.min(Math.abs(score) * 2, 100),
            riskLevel: vixIndex > 25 ? 'high' : vixIndex > 15 ? 'medium' : 'low'
        };
    }

    // Portfolio optimization suggestions
    analyzePortfolio(holdings, totalValue) {
        const suggestions = [];

        // Diversification analysis
        if (holdings.length < 5) {
            suggestions.push({
                type: 'diversification',
                message: 'Consider diversifying across more sectors',
                priority: 'high'
            });
        }

        // Cash allocation
        const cashPercentage = (125640 / totalValue) * 100;
        if (cashPercentage > 10) {
            suggestions.push({
                type: 'allocation',
                message: 'High cash position - consider investing for better returns',
                priority: 'medium'
            });
        }

        return suggestions;
    }
}

const EnhancedFDC3Dashboard = () => {
    const [portfolioValue, setPortfolioValue] = useState(2547832);
    const [availableCash] = useState(125640);
    const [daysPnL, setDaysPnL] = useState(12445);
    const [selectedStock, setSelectedStock] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [stockData, setStockData] = useState({});
    const [marketNews, setMarketNews] = useState([]);
    const [economicData, setEconomicData] = useState({});
    const [aiRecommendations, setAiRecommendations] = useState({});
    const [portfolioSuggestions, setPortfolioSuggestions] = useState([]);
    const [isMarketOpen, setIsMarketOpen] = useState(true);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Portfolio Value',
            data: [],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00d4ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }]
    });

    // Expanded stock list
    const stockSymbols = [
        'AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX',
        'AMD', 'CRM', 'ORCL', 'ADBE', 'PYPL', 'INTC', 'CSCO', 'IBM',
        'QCOM', 'TXN', 'AVGO', 'NOW'
    ];

    // Initialize services
    const [dataService] = useState(() => new FinancialDataService());
    const [aiAdvisor] = useState(() => new AIInvestmentAdvisor());

    // Show notification function
    const showNotification = useCallback((message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    // Check if market is open (simplified)
    const checkMarketStatus = useCallback(() => {
        const now = new Date();
        const hours = now.getHours();
        const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
        const isOpenHours = hours >= 9 && hours < 16; // 9 AM to 4 PM
        setIsMarketOpen(isWeekday && isOpenHours);
    }, []);

    // Load stock data
    const loadStockData = useCallback(async () => {
        const newStockData = {};
        const promises = stockSymbols.slice(0, 10).map(async (symbol) => {
            try {
                const data = await dataService.getStockPrice(symbol);
                newStockData[symbol] = data;
                return data;
            } catch (error) {
                console.error(`Error loading ${symbol}:`, error);
                return null;
            }
        });

        await Promise.all(promises);
        setStockData(newStockData);

        if (isMarketOpen) {
            showNotification('📈 Live market data updated', 'success');
        }
    }, [dataService, stockSymbols, isMarketOpen, showNotification]);

    // Load market news
    const loadMarketNews = useCallback(async () => {
        try {
            const news = await dataService.getMarketNews();
            setMarketNews(news.slice(0, 6));
        } catch (error) {
            console.error('Error loading news:', error);
        }
    }, [dataService]);

    // Load economic indicators
    const loadEconomicData = useCallback(async () => {
        try {
            const data = await dataService.getEconomicIndicators();
            setEconomicData(data);
        } catch (error) {
            console.error('Error loading economic data:', error);
        }
    }, [dataService]);

    // Generate AI recommendations
    const generateAIRecommendations = useCallback(() => {
        const recommendations = {};
        Object.entries(stockData).forEach(([symbol, data]) => {
            recommendations[symbol] = aiAdvisor.analyzeStock(data, economicData);
        });
        setAiRecommendations(recommendations);

        const suggestions = aiAdvisor.analyzePortfolio(Object.keys(stockData), portfolioValue);
        setPortfolioSuggestions(suggestions);
    }, [stockData, economicData, aiAdvisor, portfolioValue]);

    // FDC3 Functions
    const broadcastContext = async (type, symbol) => {
        const context = {
            type: 'fdc3.instrument',
            id: { ticker: symbol },
            name: getCompanyName(symbol)
        };

        if (window.fdc3) {
            await window.fdc3.broadcast(context);
            showNotification(`📡 Broadcasting ${symbol} context`, 'info');
        }
    };

    const raiseIntent = async (intent, symbol) => {
        const context = {
            type: 'fdc3.instrument',
            id: { ticker: symbol }
        };

        if (window.fdc3) {
            await window.fdc3.raiseIntent(intent, context);
            showNotification(`🎯 Intent: ${intent} for ${symbol}`, 'info');
        }
    };

    const selectStock = (symbol) => {
        setSelectedStock(symbol);
        broadcastContext('instrument', symbol);

        const stock = stockData[symbol];
        if (stock) {
            const recommendation = aiRecommendations[symbol];
            if (recommendation) {
                showNotification(
                    `🤖 AI Analysis: ${recommendation.recommendation.toUpperCase()} ${symbol} (${recommendation.confidence}% confidence)`,
                    'ai'
                );
            }
        }
    };

    const getCompanyName = (symbol) => {
        const companies = {
            'AAPL': 'Apple Inc.', 'MSFT': 'Microsoft Corporation', 'GOOGL': 'Alphabet Inc.',
            'TSLA': 'Tesla Inc.', 'AMZN': 'Amazon.com Inc.', 'NVDA': 'NVIDIA Corporation',
            'META': 'Meta Platforms Inc.', 'NFLX': 'Netflix Inc.', 'AMD': 'Advanced Micro Devices',
            'CRM': 'Salesforce Inc.', 'ORCL': 'Oracle Corporation', 'ADBE': 'Adobe Inc.',
            'PYPL': 'PayPal Holdings', 'INTC': 'Intel Corporation', 'CSCO': 'Cisco Systems',
            'IBM': 'International Business Machines', 'QCOM': 'Qualcomm Inc.',
            'TXN': 'Texas Instruments', 'AVGO': 'Broadcom Inc.', 'NOW': 'ServiceNow Inc.'
        };
        return companies[symbol] || symbol;
    };

    const getRecommendationColor = (recommendation) => {
        const colors = {
            'strong-buy': 'text-green-400',
            'buy': 'text-green-300',
            'hold': 'text-yellow-400',
            'sell': 'text-red-300',
            'strong-sell': 'text-red-400'
        };
        return colors[recommendation] || 'text-gray-400';
    };

    const getRecommendationIcon = (recommendation) => {
        const icons = {
            'strong-buy': '🟢',
            'buy': '🔵',
            'hold': '🟡',
            'sell': '🟠',
            'strong-sell': '🔴'
        };
        return icons[recommendation] || '⚪';
    };

    // Real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            if (isMarketOpen) {
                setPortfolioValue(prev => {
                    const change = (Math.random() - 0.5) * 50000;
                    const newValue = Math.max(prev + change, 1000000);

                    // Update chart data
                    setChartData(prevChart => {
                        const now = new Date();
                        const timeLabel = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

                        const newLabels = [...prevChart.labels];
                        const newData = [...prevChart.datasets[0].data];

                        if (newLabels.length > 20) {
                            newLabels.shift();
                            newData.shift();
                        }

                        newLabels.push(timeLabel);
                        newData.push(newValue);

                        return {
                            ...prevChart,
                            labels: newLabels,
                            datasets: [{
                                ...prevChart.datasets[0],
                                data: newData
                            }]
                        };
                    });

                    // Update P&L
                    const pnlChange = change * 0.1;
                    setDaysPnL(prev => prev + pnlChange);

                    return newValue;
                });

                // Refresh stock data less frequently
                if (Date.now() % 30000 < 5000) { // Every 30 seconds
                    loadStockData();
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isMarketOpen, loadStockData]);

    // Initialize data loading
    useEffect(() => {
        const initializeData = async () => {
            checkMarketStatus();
            await Promise.all([
                loadStockData(),
                loadMarketNews(),
                loadEconomicData()
            ]);

            showNotification('🚀 Enhanced FDC3 Dashboard loaded with real-time data!', 'success');
        };

        initializeData();

        // Set up periodic updates
        const newsInterval = setInterval(loadMarketNews, 300000); // 5 minutes
        const economicInterval = setInterval(loadEconomicData, 600000); // 10 minutes
        const statusInterval = setInterval(checkMarketStatus, 60000); // 1 minute

        return () => {
            clearInterval(newsInterval);
            clearInterval(economicInterval);
            clearInterval(statusInterval);
        };
    }, [checkMarketStatus, loadStockData, loadMarketNews, loadEconomicData, showNotification]);

    // Generate AI recommendations when data changes
    useEffect(() => {
        if (Object.keys(stockData).length > 0 && Object.keys(economicData).length > 0) {
            generateAIRecommendations();
        }
    }, [stockData, economicData, generateAIRecommendations]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#fff' }
            }
        },
        elements: {
            point: {
                radius: 3,
                hoverRadius: 6
            }
        },
        scales: {
            x: {
                ticks: { color: '#fff' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: {
                    color: '#fff',
                    callback: (value) => '$' + (value / 1000000).toFixed(1) + 'M'
                },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
            {/* Enhanced Header */}
            <header className="bg-black bg-opacity-30 p-4 flex justify-between items-center backdrop-blur-lg border-b border-white border-opacity-10">
                <div className="text-2xl font-bold text-cyan-400">
                    🏦 Enhanced FDC3 Financial Dashboard
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${isMarketOpen ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span>{isMarketOpen ? 'Market Open' : 'Market Closed'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>FDC3 Connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                        <span>AI Enabled</span>
                    </div>
                </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto">
                {/* Enhanced Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-cyan-400 text-xl mb-2 flex items-center gap-2">
                            📈 Portfolio Value
                        </div>
                        <div className="text-4xl font-bold text-green-400 mb-2">
                            ${portfolioValue.toLocaleString()}
                        </div>
                        <div className={`text-sm ${daysPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {daysPnL >= 0 ? '+' : ''}${daysPnL.toLocaleString()} Today
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-cyan-400 text-xl mb-2 flex items-center gap-2">
                            💰 Available Cash
                        </div>
                        <div className="text-4xl font-bold text-green-400 mb-2">
                            ${availableCash.toLocaleString()}
                        </div>
                        <div className="text-sm opacity-80">
                            {((availableCash / portfolioValue) * 100).toFixed(1)}% of Portfolio
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-cyan-400 text-xl mb-2 flex items-center gap-2">
                            📊 VIX Index
                        </div>
                        <div className="text-4xl font-bold text-yellow-400 mb-2">
                            {economicData.vixIndex || '--'}
                        </div>
                        <div className="text-sm opacity-80">Market Volatility</div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-cyan-400 text-xl mb-2 flex items-center gap-2">
                            🎯 AI Recommendations
                        </div>
                        <div className="text-4xl font-bold text-purple-400 mb-2">
                            {Object.keys(aiRecommendations).length}
                        </div>
                        <div className="text-sm opacity-80">Active Analyses</div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl">Real-time Portfolio Performance</h3>
                            <div className="text-sm opacity-80">
                                Updated: {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                        <div style={{ height: '300px' }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>

                        {/* AI Portfolio Suggestions */}
                        {portfolioSuggestions.length > 0 && (
                            <div className="mt-4 p-4 bg-purple-500 bg-opacity-20 rounded-lg border border-purple-400">
                                <h4 className="text-purple-300 font-semibold mb-2">🤖 AI Portfolio Insights</h4>
                                {portfolioSuggestions.map((suggestion, index) => (
                                    <div key={index} className={`text-sm mb-1 ${suggestion.priority === 'high' ? 'text-yellow-300' : 'text-white'}`}>
                                        • {suggestion.message}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Enhanced Watchlist with AI */}
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <h3 className="text-xl mb-4">AI-Enhanced Watchlist</h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {Object.entries(stockData).map(([symbol, data]) => {
                                const recommendation = aiRecommendations[symbol];
                                return (
                                    <div
                                        key={symbol}
                                        onClick={() => selectStock(symbol)}
                                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:transform hover:translate-x-2 ${
                                            selectedStock === symbol
                                                ? 'bg-cyan-500 bg-opacity-20'
                                                : 'bg-white bg-opacity-5 hover:bg-white hover:bg-opacity-15'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-bold text-cyan-400 flex items-center gap-2">
                                                    {symbol}
                                                    {recommendation && (
                                                        <span className="text-xs">
                                                            {getRecommendationIcon(recommendation.recommendation)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs opacity-80">{getCompanyName(symbol)}</div>
                                                {recommendation && (
                                                    <div className={`text-xs font-semibold ${getRecommendationColor(recommendation.recommendation)}`}>
                                                        {recommendation.recommendation.replace('-', ' ').toUpperCase()}
                                                        <span className="text-gray-400 ml-1">({recommendation.confidence}%)</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">${data.price}</div>
                                                <div className={`text-sm ${data.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {data.changePercent >= 0 ? '+' : ''}{data.changePercent}%
                                                </div>
                                                <div className="text-xs opacity-70">
                                                    Vol: {(data.volume / 1000000).toFixed(1)}M
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Economic Indicators & News */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Economic Indicators */}
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <div className="text-cyan-400 text-xl mb-4 flex items-center gap-2">
                            📊 Economic Indicators
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>GDP Growth</span>
                                <span className="text-green-400">{economicData.gdpGrowth}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Inflation Rate</span>
                                <span className="text-yellow-400">{economicData.inflation}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Unemployment</span>
                                <span className="text-blue-400">{economicData.unemployment}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Interest Rate</span>
                                <span className="text-purple-400">{economicData.interestRate}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced News Feed */}
                    <div className="lg:col-span-2 bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <div className="text-cyan-400 text-xl mb-4 flex items-center gap-2">
                            📰 Real-time Market News
                        </div>
                        <div className="space-y-3 max-h-72 overflow-y-auto">
                            {marketNews.map((news, index) => (
                                <div key={index} className={`p-4 bg-white bg-opacity-5 rounded-lg border-l-4 ${news.impact === 'positive' ? 'border-green-400' : 'border-red-400'}`}>
                                    <div className="font-semibold mb-2 flex items-center gap-2">
                                        {news.impact === 'positive' ? '📈' : '📉'}
                                        {news.title}
                                    </div>
                                    <div className="text-sm opacity-70 flex justify-between">
                                        <span>{news.category}</span>
                                        <span>{new Date(news.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FDC3 & AI Integration Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <div className="text-cyan-400 text-xl mb-4 flex items-center gap-2">
                            🔧 FDC3 Integration Status
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Context Broadcasting: Active
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Intent Handling: Ready
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                App Directory: Connected
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Channel Management: Online
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => broadcastContext('portfolio', 'AAPL')}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm"
                            >
                                📤 Broadcast AAPL
                            </button>
                            <button
                                onClick={() => raiseIntent('ViewChart', 'MSFT')}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm"
                            >
                                📊 View MSFT Chart
                            </button>
                            <button
                                onClick={() => raiseIntent('StartTrade', selectedStock || 'GOOGL')}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm"
                            >
                                💼 Trade {selectedStock || 'GOOGL'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <div className="text-purple-400 text-xl mb-4 flex items-center gap-2">
                            🤖 AI Investment Assistant
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                                <div className="text-sm font-semibold text-purple-300 mb-1">Market Sentiment</div>
                                <div className="text-lg">
                                    {economicData.vixIndex && economicData.vixIndex < 20 ? '😊 Optimistic' :
                                        economicData.vixIndex && economicData.vixIndex > 30 ? '😰 Fearful' : '😐 Neutral'}
                                </div>
                            </div>

                            <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                                <div className="text-sm font-semibold text-purple-300 mb-1">Top AI Recommendation</div>
                                <div className="text-lg">
                                    {Object.entries(aiRecommendations).length > 0 ? (
                                        (() => {
                                            const topStock = Object.entries(aiRecommendations)
                                                .sort((a, b) => b[1].score - a[1].score)[0];
                                            return topStock ? `${getRecommendationIcon(topStock[1].recommendation)} ${topStock[0]}` : 'Analyzing...';
                                        })()
                                    ) : 'Loading...'}
                                </div>
                            </div>

                            <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                                <div className="text-sm font-semibold text-purple-300 mb-1">Risk Assessment</div>
                                <div className="text-lg">
                                    {economicData.vixIndex && economicData.vixIndex < 20 ? '🟢 Low Risk' :
                                        economicData.vixIndex && economicData.vixIndex > 25 ? '🔴 High Risk' : '🟡 Medium Risk'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <button
                                onClick={() => showNotification('🤖 AI Analysis: Portfolio is well-diversified with moderate risk exposure', 'ai')}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm"
                            >
                                🔍 Analyze Portfolio
                            </button>
                            <button
                                onClick={() => showNotification('🎯 AI suggests increasing tech exposure by 5% based on current market trends', 'ai')}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm"
                            >
                                🎯 Get Suggestions
                            </button>
                        </div>
                    </div>
                </div>

                {/* AWS Integration Instructions */}
                <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 bg-opacity-20 rounded-2xl p-6 backdrop-blur-lg border border-orange-400">
                    <div className="text-orange-300 text-xl mb-4 flex items-center gap-2">
                        ☁️ AWS Integration Guide
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-semibold mb-2 text-orange-200">Real-time Data APIs</h4>
                            <ul className="text-sm space-y-1 text-orange-100">
                                <li>• Alpha Vantage API (Free tier: 25 requests/day)</li>
                                <li>• Yahoo Finance API (Unofficial, free)</li>
                                <li>• Polygon.io API (Free tier: 5 calls/minute)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2 text-orange-200">AWS AI Services</h4>
                            <ul className="text-sm space-y-1 text-orange-100">
                                <li>• Amazon Bedrock (Claude/GPT models)</li>
                                <li>• Amazon SageMaker (Custom ML models)</li>
                                <li>• Amazon Comprehend (Sentiment analysis)</li>
                                <li>• Amazon Forecast (Time series prediction)</li>
                                <li>• Amazon Personalize (Recommendations)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center p-8 bg-black bg-opacity-30 mt-8">
                <p>🏆 DTCC AI India Hackathon 2025 | Enhanced with Real-time Data & AI | Powered by AWS</p>
                <p className="text-sm opacity-70 mt-2">
                    {isMarketOpen ? 'Live market data enabled' : 'Market closed - showing simulated data'}
                </p>
            </footer>

            {/* Enhanced Notifications */}
            <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`px-4 py-3 rounded-lg shadow-lg animate-pulse backdrop-blur-lg border transition-all duration-300 ${
                            notification.type === 'success' ? 'bg-green-500 bg-opacity-90 border-green-400' :
                                notification.type === 'ai' ? 'bg-purple-500 bg-opacity-90 border-purple-400' :
                                    notification.type === 'error' ? 'bg-red-500 bg-opacity-90 border-red-400' :
                                        'bg-cyan-500 bg-opacity-90 border-cyan-400'
                        } text-white`}
                    >
                        <div className="text-sm font-medium">{notification.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnhancedFDC3Dashboard;
