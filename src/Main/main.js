import React, { useState } from 'react';
import { Search, Code, Database, Bot, Workflow, Terminal, FileText, Users, ArrowRight, Play, BookOpen, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: 'rgb(4, 59, 114)',
  secondary: 'rgb(245, 130, 32)',
  tertiary: 'rgb(0, 169, 206)',
  quaternary: 'rgb(240, 178, 107)',
  accent1: 'rgb(174, 99, 78)',
  accent2: 'rgb(132, 136, 139)',
  accent3: 'rgb(0, 134, 184)'
};

const AIWorkSpace = () => {
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI 데이터 질의',
      description: '자연어로 데이터를 조회하고 분석하세요',
      color: colors.tertiary,
      action: 'chat'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: '코드 카탈로그',
      description: '검증된 분석 코드를 검색하고 재사용하세요',
      color: colors.secondary,
      action: 'catalog'
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: '클라우드 IDE',
      description: '브라우저에서 바로 코딩 환경을 시작하세요',
      color: colors.accent3,
      action: 'ide'
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: '워크플로우 자동화',
      description: '반복 업무를 자동화하고 스케줄링하세요',
      color: colors.accent1,
      action: 'workflow'
    }
  ];

  const recentActivities = [
    { type: 'code', title: '글로벌 성장주 펀드 백테스트', user: '김운용', time: '2시간 전' },
    { type: 'query', title: 'ESG 점수 B등급 이하 종목 조회', user: '이분석', time: '3시간 전' },
    { type: 'workflow', title: '일일 펀드 성과 리포트 자동화', user: '박매니저', time: '5시간 전' },
    { type: 'catalog', title: '상관관계 분석 템플릿 공유', user: '최개발', time: '1일 전' }
  ];

  const popularTemplates = [
    { name: '포트폴리오 백테스팅', downloads: 142, category: '운용' },
    { name: '리스크 지표 계산', downloads: 98, category: '리스크' },
    { name: '시장 데이터 수집', downloads: 76, category: '분석' },
    { name: 'ESG 점수 필터링', downloads: 65, category: '운용' }
  ];

  const handleChatSubmit = () => {
    console.log('Chat query:', chatInput);
    setChatInput('');
    navigate('/llm');
  };

  const handleQuickAction = (action) => {
    if (action === 'chat') {
      navigate('/llm');
    } else if (action === 'catalog') {
      navigate('/code');
    } else if (action === 'ide') {
      navigate('/cloudide');
    } else {
      console.log('Quick action:', action);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header style={{ backgroundColor: colors.primary }} className="text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">AI WorkSpace</h1>
              <span className="text-sm opacity-75">Code-Native 플랫폼</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">김운용님 환영합니다</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - AI Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border-l-4 hover:shadow-lg transition-shadow duration-300" style={{ borderLeftColor: colors.tertiary }}>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Bot className="w-6 h-6" style={{ color: colors.tertiary }} />
                  <h2 className="text-xl font-semibold">AI 데이터 어시스턴트</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="예: 최근 1년간 코스피 지수와 해외주식형 펀드 수익률의 상관관계를 분석해줘"
                      className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: colors.tertiary }}
                      rows={3}
                    />
                  </div>
                  <button
                    onClick={handleChatSubmit}
                    className="w-full text-white py-3 px-6 rounded-lg font-medium transition-opacity hover:opacity-90 flex items-center justify-center space-x-2"
                    style={{ backgroundColor: colors.tertiary }}
                  >
                    <Search className="w-5 h-5" />
                    <span>분석 실행</span>
                  </button>
                </div>

                {/* Sample Queries */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">빠른 질의 예시</h3>
                  <div className="space-y-2">
                    {[
                      "듀레이션 5년 이상 채권 보유 비중이 10% 이상인 펀드 리스트",
                      "ESG B등급 이하 종목을 제외한 포트폴리오 구성",
                      "반도체 섹터 최근 3개월 수익률 분석"
                    ].map((query, index) => (
                      <button
                        key={index}
                        onClick={() => setChatInput(query)}
                        className="text-left w-full p-2 text-sm bg-gray-50 rounded border hover:bg-gray-100 transition-colors"
                      >
                        "{query}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="bg-white rounded-lg shadow-md border-l-4 p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
                  style={{ borderLeftColor: action.color }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: `${action.color}15` }}>
                      <div style={{ color: action.color }}>
                        {action.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                      <div className="mt-3 flex items-center text-sm font-medium" style={{ color: action.color }}>
                        <span>시작하기</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-md border-l-4" style={{ borderLeftColor: colors.secondary }}>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5" style={{ color: colors.secondary }} />
                  <h3 className="font-semibold">최근 활동</h3>
                </div>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === 'code' && <Code className="w-4 h-4 text-blue-500" />}
                        {activity.type === 'query' && <Search className="w-4 h-4 text-green-500" />}
                        {activity.type === 'workflow' && <Workflow className="w-4 h-4 text-purple-500" />}
                        {activity.type === 'catalog' && <BookOpen className="w-4 h-4 text-orange-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Templates */}
            <div className="bg-white rounded-lg shadow-md border-l-4" style={{ borderLeftColor: colors.quaternary }}>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5" style={{ color: colors.quaternary }} />
                  <h3 className="font-semibold">인기 템플릿</h3>
                </div>
                <div className="space-y-3">
                  {popularTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{template.name}</p>
                        <p className="text-xs text-gray-500">{template.category}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {template.downloads} 다운로드
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="w-full mt-4 py-2 text-sm font-medium rounded border hover:bg-gray-50"
                  style={{ borderColor: colors.quaternary, color: colors.quaternary }}
                >
                  전체 카탈로그 보기
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md border-l-4" style={{ borderLeftColor: colors.accent3 }}>
              <div className="p-6">
                <h3 className="font-semibold mb-4">오늘의 현황</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">활성 사용자</span>
                    <span className="font-semibold">47명</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">실행된 분석</span>
                    <span className="font-semibold">128건</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">코드 카탈로그</span>
                    <span className="font-semibold">245개</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">자동화 워크플로우</span>
                    <span className="font-semibold">34개</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Main = () => {
  return AIWorkSpace();
};

export default Main;