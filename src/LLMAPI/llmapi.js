import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Send, Play, BarChart3, TrendingUp } from 'lucide-react';

const AIWorkSpaceDemo = () => {
  // 컬러 팔레트 정의 (RGB to CSS)
  const colors = {
    primary: 'rgb(39, 58, 146)',    // Woori WON Blue
    secondary: 'rgb(0, 174, 239)',   // Woori WON SkyBlue
    tertiary: 'rgb(10, 0, 72)',      // Woori WON Navy
    quaternary: 'rgb(0, 174, 239)',  // Woori WON SkyBlue (lighter variant)
    accent1: 'rgb(10, 0, 72)',       // Woori WON Navy (dark accent)
    accent2: 'rgb(132, 136, 139)',   // Keep as neutral gray
    accent3: 'rgb(39, 58, 146)'      // Woori WON Blue (alternate)
  };

  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [showCorrelation, setShowCorrelation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 가상의 데이터
  const chartData = [
    { date: '2024-06', kospi: 2650, euro_rate: 1450, fund_price: 1820 },
    { date: '2024-07', kospi: 2720, euro_rate: 1470, fund_price: 1845 },
    { date: '2024-08', kospi: 2680, euro_rate: 1440, fund_price: 1830 },
    { date: '2024-09', kospi: 2750, euro_rate: 1480, fund_price: 1860 },
    { date: '2024-10', kospi: 2800, euro_rate: 1500, fund_price: 1880 },
    { date: '2024-11', kospi: 2850, euro_rate: 1520, fund_price: 1905 },
    { date: '2024-12', kospi: 2900, euro_rate: 1540, fund_price: 1920 },
    { date: '2025-01', kospi: 2920, euro_rate: 1560, fund_price: 1930 },
    { date: '2025-02', kospi: 2880, euro_rate: 1530, fund_price: 1910 },
    { date: '2025-03', kospi: 2950, euro_rate: 1580, fund_price: 1950 },
    { date: '2025-04', kospi: 3000, euro_rate: 1600, fund_price: 1970 },
    { date: '2025-05', kospi: 3050, euro_rate: 1620, fund_price: 1995 }
  ];

  const correlationData = [
    { name: 'KOSPI vs EUR', correlation: 0.85 },
    { name: 'KOSPI vs Fund', correlation: 0.92 },
    { name: 'EUR vs Fund', correlation: 0.78 }
  ];

  const sampleCode = `# SQL to fetch data from Snowflake
sql_query = """
SELECT 
    date,
    euro_rate,
    kospi_index,
    fund_return
FROM aianalytics.market_data 
WHERE date >= '2024-06-01'
ORDER BY date;
"""

# Connect to Snowflake and fetch data
df = snowflake.get_data(sql_query)

# Data preprocessing
df['date'] = pd.to_datetime(df['date'])
df = df.set_index('date')

# Create visualization
import matplotlib.pyplot as plt
import seaborn as sns

fig, ax = plt.subplots(figsize=(12, 6))

# Plot multiple lines
ax.plot(df.index, df['kospi_index'], label='KOSPI Index', linewidth=2)
ax.plot(df.index, df['euro_rate'], label='EUR/KRW Rate', linewidth=2)
ax.plot(df.index, df['fund_return'], label='Fund Return (%)', linewidth=2)

ax.set_title('Financial Data Trends - Last 12 Months')
ax.set_xlabel('Date')
ax.set_ylabel('Value')
ax.legend()
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("✅ Data successfully retrieved and visualized!")
print(f"📊 Total records: {len(df)}")
print(f"📈 KOSPI range: {df['kospi_index'].min():.0f} - {df['kospi_index'].max():.0f}")`;

  const correlationCode = `# Correlation Analysis
import numpy as np

# Calculate correlation matrix
correlation_matrix = df[['kospi_index', 'euro_rate', 'fund_return']].corr()

print("🔍 Correlation Analysis Results:")
print("=" * 40)
print(f"KOSPI ↔ EUR Rate: {correlation_matrix.loc['kospi_index', 'euro_rate']:.3f}")
print(f"KOSPI ↔ Fund Return: {correlation_matrix.loc['kospi_index', 'fund_return']:.3f}")
print(f"EUR Rate ↔ Fund Return: {correlation_matrix.loc['euro_rate', 'fund_return']:.3f}")

# Create heatmap
plt.figure(figsize=(8, 6))
sns.heatmap(correlation_matrix, 
           annot=True, 
           cmap='RdYlBu_r', 
           center=0,
           square=True,
           fmt='.3f')
plt.title('Correlation Heatmap - Financial Indicators')
plt.tight_layout()
plt.show()`;

  const typeWriter = (text, callback) => {
    let i = 0;
    setGeneratedCode('');
    
    const type = () => {
      if (i < text.length) {
        setGeneratedCode(prev => prev + text.charAt(i));
        i++;
        setTimeout(type, 1);
      } else {
        setTimeout(callback, 500);
      }
    };
    type();
  };

  const handleAnalyze = () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    setShowChart(false);
    setShowCorrelation(false);
    setCurrentStep(1);
    
    // 코드 생성 시뮬레이션
    setTimeout(() => {
      typeWriter(sampleCode, () => {
        setIsGenerating(false);
        setCurrentStep(2);
        setTimeout(() => {
          setShowChart(true);
          setCurrentStep(3);
        }, 1000);
      });
    }, 500);
  };

  const handleCorrelationAnalysis = () => {
    setCurrentStep(4);
    setShowCorrelation(false);
    
    setTimeout(() => {
      typeWriter(correlationCode, () => {
        setTimeout(() => {
          setShowCorrelation(true);
        }, 1000);
      });
    }, 500);
  };

  const handleReset = () => {
    setUserInput('');
    setGeneratedCode('');
    setShowChart(false);
    setShowCorrelation(false);
    setCurrentStep(0);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white p-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8" style={{ color: colors.tertiary }} />
                <h1 className="text-2xl font-bold text-white">AI 데이터 어시스턴트</h1>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.tertiary + '20', color: colors.tertiary }}>
                AI WorkSpace
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* 안내문구 */}
        <div className="text-center mb-8 mt-8">
          <p className="text-lg mb-2" style={{ color: colors.accent2 }}>
            자연어로 질문하고 즉시 데이터 분석 결과를 확인해보세요
          </p>
          <p className="text-sm" style={{ color: colors.accent2, opacity: 0.8 }}>
            "최근 1년 유로화, 코스피, 펀드 수익률 데이터 보여줘" 라고 입력해보세요
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask anything about your data..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isGenerating || !userInput.trim()}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              style={{ backgroundColor: colors.secondary }}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  분석 중...
                </>
              ) : (
                <>
                  <Send size={20} />
                  분석
                </>
              )}
            </button>
            {currentStep > 0 && (
              <button
                onClick={handleReset}
                className="px-4 py-3 text-white rounded-lg hover:opacity-90 font-medium"
                style={{ backgroundColor: colors.accent3 }}
              >
                초기화
              </button>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[
                { step: 1, label: '자연어 해석', icon: '🤖' },
                { step: 2, label: '코드 생성', icon: '💻' },
                { step: 3, label: '데이터 시각화', icon: '📊' }
              ].map(({ step, label, icon }) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl ${
                    currentStep >= step ? 'text-white' : 'bg-gray-100 text-gray-400'
                  }`} style={currentStep >= step ? { backgroundColor: colors.tertiary } : {}}>
                    {icon}
                  </div>
                  <span className={`ml-2 font-medium ${
                    currentStep >= step ? '' : 'text-gray-400'
                  }`} style={currentStep >= step ? { color: colors.primary } : {}}>
                    {label}
                  </span>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-4 rounded ${
                      currentStep > step ? '' : 'bg-gray-200'
                    }`} style={currentStep > step ? { backgroundColor: colors.tertiary } : {}}>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Generation Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Play style={{ color: colors.accent3 }} size={20} />
              <h3 className="text-xl font-semibold" style={{ color: colors.primary }}>자동 생성된 코드</h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                {generatedCode || (
                  <span className="text-gray-500">
                    질문을 입력하면 Python/SQL 코드가 자동으로 생성됩니다...
                  </span>
                )}
              </pre>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 style={{ color: colors.secondary }} size={20} />
              <h3 className="text-xl font-semibold" style={{ color: colors.primary }}>분석 결과</h3>
            </div>
            <div className="h-96">
              {showChart && !showCorrelation ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="kospi" stroke={colors.secondary} strokeWidth={3} name="KOSPI 지수" />
                    <Line type="monotone" dataKey="euro_rate" stroke={colors.tertiary} strokeWidth={3} name="유로화 환율" />
                    <Line type="monotone" dataKey="fund_price" stroke={colors.accent3} strokeWidth={3} name="펀드 기준가격" />
                  </LineChart>
                </ResponsiveContainer>
              ) : showCorrelation ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>상관관계 분석 결과</h4>
                    <div className="space-y-3">
                      {correlationData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium" style={{ color: colors.primary }}>{item.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-3">
                              <div 
                                className="h-3 rounded-full"
                                style={{ 
                                  width: `${item.correlation * 100}%`,
                                  background: `linear-gradient(to right, ${colors.tertiary}, ${colors.secondary})`
                                }}
                              ></div>
                            </div>
                            <span className="text-lg font-bold" style={{ color: colors.primary }}>{item.correlation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm mt-4" style={{ color: colors.accent3 }}>
                      강한 양의 상관관계가 확인됩니다 (0.78 ~ 0.92)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
                    <p>분석 결과가 여기에 표시됩니다</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        {showChart && currentStep === 3 && !showCorrelation && (
          <div className="mt-8 rounded-xl p-6" style={{
            background: `linear-gradient(to right, 
              rgba(4, 59, 114, 0.05), 
              rgba(0, 169, 206, 0.05))`
          }}>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                🤖 AI 추가 분석 제안
              </h4>
              <p className="mb-4" style={{ color: colors.accent3 }}>
                데이터 간의 관계를 더 자세히 알아볼까요?
              </p>
              <button
                onClick={handleCorrelationAnalysis}
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 font-medium flex items-center gap-2 mx-auto"
                style={{
                  background: `linear-gradient(to right, ${colors.secondary}, ${colors.tertiary})`
                }}
              >
                <TrendingUp size={20} />
                상관관계 분석하기
              </button>
            </div>
          </div>
        )}

        {/* Features Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">🗣️</div>
            <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>자연어 질의</h3>
            <p className="text-sm" style={{ color: colors.accent3 }}>
              복잡한 SQL을 몰라도 일상 언어로 데이터를 조회할 수 있습니다
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>즉시 코드 생성</h3>
            <p className="text-sm" style={{ color: colors.accent3 }}>
              AI가 Python과 SQL 코드를 자동으로 생성하여 학습 효과도 제공합니다
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>스마트 시각화</h3>
            <p className="text-sm" style={{ color: colors.accent3 }}>
              데이터 특성에 맞는 최적의 차트가 자동으로 생성됩니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWorkSpaceDemo;