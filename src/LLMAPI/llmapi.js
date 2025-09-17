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

  // 가상의 데이터 - PI 자산 관련
  const chartData = [
    { date: '2024-06', pi_asset_value: 5650, credit_score: 85, risk_level: 3.2 },
    { date: '2024-07', pi_asset_value: 5720, credit_score: 84, risk_level: 3.4 },
    { date: '2024-08', pi_asset_value: 5680, credit_score: 83, risk_level: 3.6 },
    { date: '2024-09', pi_asset_value: 5750, credit_score: 82, risk_level: 3.8 },
    { date: '2024-10', pi_asset_value: 5800, credit_score: 81, risk_level: 4.0 },
    { date: '2024-11', pi_asset_value: 5850, credit_score: 80, risk_level: 4.2 },
    { date: '2024-12', pi_asset_value: 5900, credit_score: 79, risk_level: 4.5 },
    { date: '2025-01', pi_asset_value: 5920, credit_score: 78, risk_level: 4.7 },
    { date: '2025-02', pi_asset_value: 5880, credit_score: 77, risk_level: 4.9 },
    { date: '2025-03', pi_asset_value: 5950, credit_score: 76, risk_level: 5.1 },
    { date: '2025-04', pi_asset_value: 6000, credit_score: 75, risk_level: 5.3 },
    { date: '2025-05', pi_asset_value: 6050, credit_score: 74, risk_level: 5.5 }
  ];

  const correlationData = [
    { name: '신용점수 vs 자산가치', correlation: -0.72 },
    { name: '신용점수 vs 리스크수준', correlation: -0.89 },
    { name: '자산가치 vs 리스크수준', correlation: 0.65 }
  ];

  const sampleCode = `# PI 자산 이슈 모니터링 SQL
sql_query = """
SELECT
    p.asset_code,
    p.asset_name,
    p.current_value,
    cr.credit_rating,
    cr.rating_change,
    cr.rating_date,
    n.news_sentiment,
    n.risk_score
FROM pi_portfolio p
LEFT JOIN credit_ratings cr ON p.asset_code = cr.asset_code
LEFT JOIN news_analysis n ON p.asset_code = n.asset_code
WHERE cr.rating_date >= DATEADD(month, -1, CURRENT_DATE())
    AND (cr.rating_change < 0 OR n.risk_score > 3.0)
ORDER BY cr.rating_date DESC, n.risk_score DESC;
"""

# Connect to Snowflake and fetch data
df = snowflake.get_data(sql_query)

# 신용등급 하향 자산 필터링
downgraded_assets = df[df['rating_change'] < 0]

# 부정적 뉴스 자산 필터링
negative_news_assets = df[df['risk_score'] > 3.0]

# 시각화
import matplotlib.pyplot as plt
import seaborn as sns

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# 신용등급 변화 차트
ax1.bar(downgraded_assets['asset_name'], downgraded_assets['rating_change'],
        color='red', alpha=0.7)
ax1.set_title('PI 자산 신용등급 하향 현황')
ax1.set_xlabel('자산명')
ax1.set_ylabel('등급 변화')
ax1.tick_params(axis='x', rotation=45)

# 리스크 점수 차트
ax2.scatter(df['current_value'], df['risk_score'],
           c=df['rating_change'], cmap='RdYlGn_r', s=100, alpha=0.7)
ax2.set_title('자산가치 vs 리스크 점수')
ax2.set_xlabel('현재 자산가치 (억원)')
ax2.set_ylabel('리스크 점수')

plt.tight_layout()
plt.show()

print("✅ PI 자산 이슈 모니터링 완료!")
print(f"📊 신용등급 하향 자산: {len(downgraded_assets)}개")
print(f"⚠️  높은 리스크 자산: {len(negative_news_assets)}개")`;

  const correlationCode = `# PI 자산 상관관계 분석
import numpy as np

# 상관관계 매트릭스 계산
correlation_matrix = df[['current_value', 'credit_rating', 'risk_score']].corr()

print("🔍 PI 자산 상관관계 분석 결과:")
print("=" * 50)
print(f"자산가치 ↔ 신용등급: {correlation_matrix.loc['current_value', 'credit_rating']:.3f}")
print(f"자산가치 ↔ 리스크점수: {correlation_matrix.loc['current_value', 'risk_score']:.3f}")
print(f"신용등급 ↔ 리스크점수: {correlation_matrix.loc['credit_rating', 'risk_score']:.3f}")

# 히트맵 생성
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix,
           annot=True,
           cmap='RdYlBu_r',
           center=0,
           square=True,
           fmt='.3f',
           cbar_kws={"shrink": .8})
plt.title('PI 자산 지표간 상관관계 히트맵')
plt.tight_layout()
plt.show()

# 리스크 임계값 초과 자산 추천
high_risk_assets = df[df['risk_score'] > 4.0]
print(f"\\n⚠️ 주의 필요 자산 ({len(high_risk_assets)}개):")
for _, asset in high_risk_assets.iterrows():
    print(f"- {asset['asset_name']}: 리스크점수 {asset['risk_score']:.1f}")`;

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
            "현재 보유 PI 자산 중 최근 1개월간 신용등급이 하향된 자산 리스트 보여줘" 라고 입력해보세요
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
                    <Line type="monotone" dataKey="pi_asset_value" stroke={colors.secondary} strokeWidth={3} name="PI 자산가치 (억원)" />
                    <Line type="monotone" dataKey="credit_score" stroke={colors.tertiary} strokeWidth={3} name="신용점수" />
                    <Line type="monotone" dataKey="risk_level" stroke={colors.accent3} strokeWidth={3} name="리스크 수준" />
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
                      신용등급과 리스크수준 간 강한 음의 상관관계가 확인됩니다 (-0.89)
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