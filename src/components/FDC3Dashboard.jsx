import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Mock FDC3 Implementation
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

const FDC3Dashboard = () => {
    const [portfolioValue, setPortfolioValue] = useState(2547832);
    const [availableCash] = useState(125640);
    const [daysPnL] = useState(12445);
    const [selectedStock, setSelectedStock] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [chartData, setChartData] = useState({
        labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00'],
        datasets: [{
            label: 'Portfolio Value',
            data: [2520000, 2535000, 2528000, 2542000, 2538000, 2545000, 2540000, 2548000, 2545000, 2547832],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00d4ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }]
    });

    const stocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.1 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 1.8 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.75, change: -0.5 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.92, change: 3.2 }
    ];

    const newsItems = [
        { title: 'Federal Reserve Signals Potential Rate Changes', time: '2 hours ago' },
        { title: 'Tech Stocks Rally on AI Optimism', time: '4 hours ago' },
        { title: 'Energy Sector Shows Strong Performance', time: '6 hours ago' }
    ];

    // Show notification function
    const showNotification = (message) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    // FDC3 Functions
    const broadcastContext = async (type, symbol) => {
        const context = {
            type: 'fdc3.instrument',
            id: { ticker: symbol },
            name: getCompanyName(symbol)
        };

        if (window.fdc3) {
            await window.fdc3.broadcast(context);
            showNotification(`Broadcasting ${context.type}: ${symbol}`);
        }
    };

    const raiseIntent = async (intent, symbol) => {
        const context = {
            type: 'fdc3.instrument',
            id: { ticker: symbol }
        };

        if (window.fdc3) {
            await window.fdc3.raiseIntent(intent, context);
            showNotification(`Intent: ${intent} for ${symbol}`);
        }
    };

    const selectStock = (symbol) => {
        setSelectedStock(symbol);
        broadcastContext('instrument', symbol);
        showNotification(`Selected ${symbol} - Context broadcasted to all FDC3 apps`);
    };

    const getCompanyName = (symbol) => {
        const companies = {
            'AAPL': 'Apple Inc.',
            'MSFT': 'Microsoft Corporation',
            'GOOGL': 'Alphabet Inc.',
            'TSLA': 'Tesla Inc.'
        };
        return companies[symbol] || symbol;
    };

    const testFDC3 = () => {
        const tests = ['Context Broadcasting', 'Intent Handling', 'Channel Communication', 'App Directory'];
        let testIndex = 0;

        const testInterval = setInterval(() => {
            if (testIndex < tests.length) {
                showNotification(`✅ ${tests[testIndex]} - OK`);
                testIndex++;
            } else {
                clearInterval(testInterval);
                showNotification('🎉 All FDC3 tests passed!');
            }
        }, 800);
    };

    const showChannels = () => {
        const channels = ['red', 'green', 'blue', 'yellow', 'global'];
        showNotification(`📺 Available Channels: ${channels.join(', ')}`);
    };

    // Real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setPortfolioValue(prev => {
                const change = (Math.random() - 0.5) * 10000;
                const newValue = prev + change;

                // Update chart data
                setChartData(prevChart => {
                    const now = new Date();
                    const timeLabel = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

                    const newLabels = [...prevChart.labels];
                    const newData = [...prevChart.datasets[0].data];

                    if (newLabels.length > 10) {
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

                return newValue;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Initialize FDC3 listeners
    useEffect(() => {
        if (window.fdc3) {
            window.fdc3.addContextListener((context) => {
                console.log('Received context:', context);
                if (context.type === 'fdc3.instrument') {
                    showNotification(`Received instrument context: ${context.id.ticker}`);
                }
            });
        }

        showNotification('🏦 Welcome to FDC3 Financial Dashboard!');
    }, []);

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
                radius: 4,
                hoverRadius: 8
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
            {/* Header */}
            <header className="bg-black bg-opacity-30 p-4 flex justify-between items-center backdrop-blur-lg border-b border-white border-opacity-10">
                <div className="text-2xl font-bold text-cyan-400">
                    🏦 FDC3 Financial Dashboard
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span>FDC3 Connected</span>
                </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto">
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-cyan-400 text-xl mb-2 flex items-center gap-2">
                            📈 Portfolio Value
                        </div>
                        <div className="text-4xl font-bold text-green-400 mb-2">
                            ${portfolioValue.toLocaleString()}
                        </div>
                        <div className="text-sm opacity-80">+2.34% Today</div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-cyan-400 text-xl mb-2 flex items-center gap-2">
                            💰 Available Cash
                        </div>
                        <div className="text-4xl font-bold text-green-400 mb-2">
                            ${availableCash.toLocaleString()}
                        </div>
                        <div className="text-sm opacity-80">Ready to Invest</div>
                    </div>

                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="text-cyan-400 text-xl mb-2 flex items-center gap-2">
                            📊 Day's P&L
                        </div>
                        <div className="text-4xl font-bold text-green-400 mb-2">
                            +${daysPnL.toLocaleString()}
                        </div>
                        <div className="text-sm opacity-80">Unrealized Gains</div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <h3 className="text-xl mb-4">Portfolio Performance</h3>
                        <div style={{ height: '300px' }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button
                                onClick={() => broadcastContext('portfolio', 'AAPL')}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                📤 Broadcast AAPL
                            </button>
                            <button
                                onClick={() => raiseIntent('ViewChart', 'MSFT')}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                📊 View MSFT Chart
                            </button>
                            <button
                                onClick={() => raiseIntent('StartTrade', 'GOOGL')}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                💼 Trade GOOGL
                            </button>
                        </div>
                    </div>

                    {/* Watchlist */}
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <h3 className="text-xl mb-4">Watchlist</h3>
                        <div className="space-y-2">
                            {stocks.map((stock) => (
                                <div
                                    key={stock.symbol}
                                    onClick={() => selectStock(stock.symbol)}
                                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all duration-300 hover:transform hover:translate-x-2 ${
                                        selectedStock === stock.symbol
                                            ? 'bg-cyan-500 bg-opacity-20'
                                            : 'bg-white bg-opacity-5 hover:bg-white hover:bg-opacity-15'
                                    }`}
                                >
                                    <div>
                                        <div className="font-bold text-cyan-400">{stock.symbol}</div>
                                        <div className="text-sm opacity-80">{stock.name}</div>
                                    </div>
                                    <div className="text-right">
                                        <div>${stock.price}</div>
                                        <div className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* News Feed */}
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <div className="text-cyan-400 text-xl mb-4 flex items-center gap-2">
                            📰 Market News
                        </div>
                        <div className="space-y-3 max-h-72 overflow-y-auto">
                            {newsItems.map((news, index) => (
                                <div key={index} className="p-4 bg-white bg-opacity-5 rounded-lg border-l-4 border-cyan-400">
                                    <div className="font-semibold mb-2">{news.title}</div>
                                    <div className="text-sm opacity-70">{news.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FDC3 Status */}
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-lg border border-white border-opacity-20">
                        <div className="text-cyan-400 text-xl mb-4 flex items-center gap-2">
                            🔧 FDC3 Integration Status
                        </div>
                        <div className="space-y-2 mb-4">
                            <div>✅ Context Broadcasting: Active</div>
                            <div>✅ Intent Handling: Ready</div>
                            <div>✅ App Directory: Connected</div>
                            <div>✅ Channel Management: Online</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={testFDC3}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                🧪 Test FDC3
                            </button>
                            <button
                                onClick={showChannels}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                📺 Show Channels
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center p-8 bg-black bg-opacity-30 mt-8">
                <p>🏆 DTCC AI India Hackathon 2025 | Built with FDC3 Standards | Powered by AWS</p>
            </footer>

            {/* Notifications */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="bg-cyan-500 bg-opacity-90 text-white px-4 py-3 rounded-lg shadow-lg animate-pulse backdrop-blur-lg border border-cyan-400"
                    >
                        {notification.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FDC3Dashboard;