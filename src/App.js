import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Send, Play, BarChart3, Brain, Zap, GitBranch, Bot, Workflow, Cloud, Search, Users, Shield, FileText, PlayCircle, CheckCircle, ChevronDown, ChevronRight, ArrowRight, Database, Code, TrendingUp } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CodeCatalog from './CodeCatalog/codecatalog';
import DataCatalog from './DataCatalog/datacatalog';
import LLMAPI from './LLMAPI/llmapi';
import CloudIDE from './CloudIDE/cloudIDE';
import Main from './Main/main';
import AIWorkSpaceEcoSystem from './AI WorkSpaceEcoSystem.svg';
import WorkflowAutomation from './Automation/auto';


const colors = {
  primary: 'rgb(4, 59, 114)',
  secondary: 'rgb(245, 130, 32)',
  tertiary: 'rgb(0, 169, 206)',
  quaternary: 'rgb(240, 178, 107)',
  accent1: 'rgb(174, 99, 78)',
  accent2: 'rgb(132, 136, 139)',
  accent3: 'rgb(0, 134, 184)'
};


const AIWorkSpaceDemo = () => {
  const [activeSection, setActiveSection] = useState('concept');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [animatedCards, setAnimatedCards] = useState(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(new Set([0, 1, 2, 3, 4, 5]));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scenarios = [
    {
      id: 1,
      title: "운용부서: 맞춤형 포트폴리오 제안",
      department: "운용부서",
      description: "기관투자자의 요구사항에 따른 포트폴리오 커스터마이징",
      detail: "A 운용역이 연기금의 'ESG 점수 개선 + 반도체 섹터 20% 증량' 요청을 받아, 코드 카탈로그에서 기본 로직을 가져와 AI Code Assistant로 수정하고 백테스트까지 30분 만에 완료하는 시나리오"
    },
    {
      id: 2,
      title: "리스크관리: 이벤트 기반 분석",
      department: "리스크관리부서",
      description: "금리 인상 등 시장 이벤트 발생 시 즉시 위험 자산 식별",
      detail: "연준 금리 인상 발표 후, '듀레이션 5년 이상 채권 10% 이상 보유 펀드' 조건으로 자연어 질의를 통해 즉시 위험 펀드 리스트를 확보하고 운용역들에게 Teams 알림을 자동 발송"
    },
    {
      id: 3,
      title: "마케팅: 콘텐츠 자동화",
      department: "마케팅부서",
      description: "유튜브 콘텐츠의 메타데이터 추출 및 AI 검색엔진 연동",
      detail: "새로운 펀드 분석 영상을 업로드하면 자동으로 제목, 설명, 자막을 추출하여 LLM으로 검색 최적화 형태로 변환 후 DB 저장. 고객이 관련 키워드 검색 시 상위 노출"
    },
    {
      id: 4,
      title: "IT-현업 협업: Code as a Service",
      department: "IT-현업 협업",
      description: "기존 시스템 기능을 코드 형태로 현업에 제공",
      detail: "IT부서가 성과분석 시스템의 '기여도 분석' 기능을 코드 카탈로그에 패키지로 제공. 운용역이 이를 가져와 자체적으로 '섹터별 기여도' 기능을 추가하여 맞춤형 분석 도구로 발전"
    }
  ];

  const components = [
    {
      name: "데이터 카탈로그",
      icon: <Database className="w-6 h-6" />,
      description: "전사 공유 가능한 데이터를 Snowflake 기반 인프라에 통합하여 데이터 사일로를 해소하고, 검증된 내부 데이터 활용 촉진",
      color: colors.primary
    },
    {
      name: "코드 카탈로그",
      icon: <Code className="w-6 h-6" />,
      description: "업무 프로세스와 데이터 분석 노하우를 코드로 자산화하여 체계적으로 축적하고 관리함",
      color: colors.secondary
    },
    {
      name: "LLM기반 AI 어시스턴트",
      icon: <Bot className="w-6 h-6" />,
      description: "자연어로 질의하면 Python코드나 SQL쿼리로 자동 변환하여 데이터를 조회. 코드에 대한 기술적 장벽을 낮추는 역할",
      color: colors.tertiary
    },
    {
      name: "클라우드 IDE 및 실행환경",
      icon: <Cloud className="w-6 h-6" />,
      description: "웹 브라우저를 통해 바로 접속할 수 있는 코드 실행 및 개발환경. 개인이 직접 개발환경을 구성할 필요가 없음",
      color: colors.quaternary
    },
    {
      name: "워크플로우 자동화",
      icon: <Workflow className="w-6 h-6" />,
      description: "코드 카탈로그에 등록된 코드를 워크플로우 자동화 툴과 연계하여 반복적으로 수행가능",
      color: colors.accent3
    },
    {
      name: "통합 포털",
      icon: <GitBranch className="w-6 h-6" />,
      description: "모든 구성 요소들을 하나의 통합된 인터페이스로 연결하여 사용자가 원활하게 전환하며 업무를 수행할 수 있는 중앙 집중식 접근점 제공",
      color: colors.accent1
    }
  ];

  const problems = [
    { title: "IT 지원 업무 병목", description: "데이터 관련 요청이 IT/전문 인력에 집중되어 대응 지연 발생" },
    { title: "데이터 접근성 취약", description: "필요 데이터의 소재를 모르거나, 접근 권한이 없어 고비용 단말에 의존" },
    { title: "분석 환경 한계", description: "기존 Excel 중심 도구는 복잡한 금융 분석 및 확장성 한계" },
    { title: "기술 진입 장벽", description: "Python 등 전문 분석 도구에 대한 심리적·기술적 부담" },
    { title: "지식 자산의 사일로화", description: "분석 노하우가 부서별 고립(사일로화)되어 중복 발생 및 자산축적 안됨" },
    { title: "자동화 미비", description: "수작업 기반의 반복 업무로 인해 업무 효율성이 낮음" },
    { title: "협업 어려움", description: "데이터 권한 및 형식의 분절화로 부서 간 통합 분석 및 협업 어려움" }
  ];

  const solutions = [
    { title: "통합 데이터 인프라", description: "Snowflake 기반 데이터 사일로 해소" },
    { title: "AI 기반 데이터 디스커버리", description: "AI를 활용한 내부 데이터 탐색 및 활용" },
    { title: "자연어 인터페이스", description: "LLM을 통한 기술적 진입 장벽 완화" },
    { title: "코드/데이터 카탈로그", description: "조직 지식 자산의 체계적 축적 및 관리" },
    { title: "워크플로우 자동화", description: "반복 업무의 효율화 및 자동화 실현" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header style={{ backgroundColor: colors.primary }} className="text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">AI WorkSpace</h1>
          <p className="text-lg opacity-90">Data-Native 조직 전환을 위한 데이터 민주화 플랫폼</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'concept', label: '핵심 개념' },
              { id: 'problems', label: '문제점 & 해결책' },
              { id: 'components', label: '구성 요소' },
              { id: 'scenarios', label: '사용 시나리오' },
              { id: 'architecture', label: '시스템 아키텍처' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeSection === item.id 
                    ? 'border-orange-500 text-orange-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Core Concept Section */}
        {activeSection === 'concept' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                Data-Native 조직으로의 전환
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                전직원이 AI의 도움으로 데이터를 자유자재로 활용하는 
                'Data-Native' 조직으로 전환
              </p>
            </div>



            {/* Solution Statement */}
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Database className="w-8 h-8" style={{ color: colors.secondary }} />
                <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>
                  AI WorkSpace 솔루션
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                <strong>"데이터를 찾기 어렵고, 분석 역량은 제한적이고, 노하우가 축적되지 못하는"</strong> 구조적 문제를 해결하기 위해, 
                데이터 민주화 플랫폼을 지향하는 AI WorkSpace 프로젝트를 추진합니다.  
                정형 및 반정형데이터의 탐색과 활용에 중점을 두며, Microsoft Copilot과 함께 
                                 전사적인 AI기반 데이터 활용 생태계를 완성하고자 합니다.
              </p>
            </div>

            {/* Data Discovery Platform */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ borderLeft: `4px solid ${colors.tertiary}` }}>
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.tertiary }}>
                <Search className="w-6 h-6 mr-3" />
                데이터 디스커버리 플랫폼 역할
              </h3>
              <p className="text-gray-700 leading-relaxed">
                필요한 데이터를 사내에서 찾지 못해 외부 정보 단말기에 의존하던 문제를 해결하기 위해 
                AI WorkSpace는 강력한 <strong>'데이터 디스커버리 플랫폼(Data Discovery Platform)'</strong>의 역할을 수행합니다. 
                AI의 도움으로 내부 데이터를 쉽게 찾아 활용하는 새로운 업무방식을 제시합니다.
              </p>
            </div>
          </div>
        )}

        {/* Problems & Solutions Section */}
        {activeSection === 'problems' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.primary }}>
              현재 문제점과 해결 방안
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Problems */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3" style={{ color: colors.accent1 }} />
                  주요 문제점
                </h3>
                <div className="space-y-4">
                  {problems.map((problem, index) => (
                    <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: colors.accent1 }}>
                      <h4 className="font-semibold text-gray-800">{problem.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{problem.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" style={{ color: colors.secondary }} />
                  AI WorkSpace 해결 전략
                </h3>
                <div className="space-y-4">
                  {solutions.map((solution, index) => (
                    <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: colors.secondary }}>
                      <h4 className="font-semibold text-gray-800">{solution.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{solution.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            
          </div>
        )}

        {/* Components Section */}
        {activeSection === 'components' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.primary }}>
              AI WorkSpace 구성 요소
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {components.map((component, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                    animatedCards.has(index) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{
                    borderLeft: `4px solid ${component.color}`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-start mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ backgroundColor: `${component.color}20` }}
                    >
                      <div style={{ color: component.color }}>
                        {component.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-2">{component.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{component.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>



          </div>
        )}

        {/* Scenarios Section */}
        {activeSection === 'scenarios' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.primary }}>
              실제 사용 시나리오
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl hover:scale-105"
                  onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <PlayCircle className="w-6 h-6 mr-3" style={{ color: colors.secondary }} />
                      <h3 className="font-bold text-lg">{scenario.title}</h3>
                    </div>
                    {selectedScenario === scenario.id ? 
                      <ChevronDown className="w-5 h-5" style={{ color: colors.secondary }} /> : 
                      <ChevronRight className="w-5 h-5" style={{ color: colors.secondary }} />
                    }
                  </div>
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" 
                          style={{ backgroundColor: `${colors.tertiary}20`, color: colors.tertiary }}>
                      {scenario.department}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{scenario.description}</p>
                  
                  {selectedScenario === scenario.id && (
                    <div className="border-t pt-4 mt-4 transition-all">
                      <h4 className="font-semibold mb-2" style={{ color: colors.primary }}>상세 시나리오</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{scenario.detail}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Implementation Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
                추진 일정
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${colors.secondary}20` }}>
                    <span className="text-xl font-bold" style={{ color: colors.secondary }}>1</span>
                  </div>
                  <h4 className="font-bold mb-2">1단계 (1-3개월)</h4>
                  <p className="text-sm text-gray-600">인프라 구축 및 핵심 기능 개발</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${colors.tertiary}20` }}>
                    <span className="text-xl font-bold" style={{ color: colors.tertiary }}>2</span>
                  </div>
                  <h4 className="font-bold mb-2">2단계 (4-6개월)</h4>
                  <p className="text-sm text-gray-600">시범 운영 및 교육</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${colors.accent3}20` }}>
                    <span className="text-xl font-bold" style={{ color: colors.accent3 }}>3</span>
                  </div>
                  <h4 className="font-bold mb-2">3단계 (7-12개월)</h4>
                  <p className="text-sm text-gray-600">전사 확산 및 고도화</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Section */}
        {activeSection === 'architecture' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.primary }}>
              AI WorkSpace 시스템 아키텍처
            </h2>
            <div className="w-full flex flex-col md:flex-col justify-center items-center gap-8">
              <img
                src={require('./ai_workspace_architecture.svg').default}
                alt="AI WorkSpace Architecture"
                className="max-w-3xl w-full h-auto shadow-lg rounded-lg border"
                style={{ background: 'white' }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

function NavigationBar() {
  const location = useLocation();
  const navItems = [
    { to: '/', label: '소개' },
    { to: '/data', label: '데이터 카탈로그' },
    { to: '/code', label: '코드 카탈로그' },
    { to: '/llm', label: 'AI데이터 어시스턴트' },
    { to: '/cloudide', label: 'AI 클라우드 IDE' },
    { to: '/workflow', label: '워크플로우 자동화' },
  ];
  return (
    <nav className="bg-white shadow-sm border-b mb-6">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <span className="text-xl font-bold text-blue-900 mr-8">AI WorkSpace</span>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              location.pathname === item.to
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<AIWorkSpaceDemo />} />
        <Route path="/main" element={<Main />} />
        <Route path="/code" element={<CodeCatalog />} />
        <Route path="/data" element={<DataCatalog />} />
        <Route path="/llm" element={<LLMAPI />} />
        <Route path="/cloudide" element={<CloudIDE />} />
        <Route path="/workflow" element={<WorkflowAutomation />} />
      </Routes>
    </Router>
  );
}

export default App;