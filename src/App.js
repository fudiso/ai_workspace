import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Send, Play, BarChart3, Brain, Zap, GitBranch, Bot, Workflow, Cloud, Search, Users, Shield, FileText, PlayCircle, CheckCircle, ChevronDown, ChevronRight, ArrowRight, Database, Code, TrendingUp, AlertTriangle } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CodeCatalog from './CodeCatalog/codecatalog';
import DataCatalog from './DataCatalog/datacatalog';
import LLMAPI from './LLMAPI/llmapi';
import CloudIDE from './CloudIDE/cloudIDE';
import Main from './Main/main';
import AIWorkSpaceEcoSystem from './AI WorkSpaceEcoSystem.svg';
import WorkflowAutomation from './Automation/auto';


const colors = {
  primary: 'rgb(39, 58, 146)',    // Woori WON Blue
  secondary: 'rgb(0, 174, 239)',   // Woori WON SkyBlue
  tertiary: 'rgb(10, 0, 72)',      // Woori WON Navy
  quaternary: 'rgb(0, 174, 239)',  // Woori WON SkyBlue (lighter variant)
  accent1: 'rgb(10, 0, 72)',       // Woori WON Navy (dark accent)
  accent2: 'rgb(132, 136, 139)',   // Keep as neutral gray
  accent3: 'rgb(39, 58, 146)'      // Woori WON Blue (alternate)
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

  // 기존 scenarios 배열 전체 삭제 후 아래로 교체
  const scenarios = [
    {
      id: 1,
      title: "대체솔루션운용본부: 데일리 자료 작성 자동화",
      department: "대체솔루션운용본부",
      description: "매일 반복되는 KFP·블룸버그 데이터 수집 및 보고서 작성 업무를 AI 기반 자동화로 전환",
      detail: "매니저가 포털에서 자연어로 펀드 포지션·헤지비율을 질의하면, 시스템이 Snowflake에서 SQL/Python 코드를 자동 생성. 클라우드 IDE에서 Bloomberg API 연동 등 추가 분석 후, 완성 코드를 코드 카탈로그에 공유하고, 워크플로우 자동화로 매일 오전 8시 자동 실행 및 결과 파일을 팀즈/메일로 발송.",
      steps: [
        "데이터 질의 및 자동 코드 생성",
        "AI IDE에서 추가 분석 및 통합",
        "코드 카탈로그 공유",
        "워크플로우 자동화 등록 및 결과 발송"
      ]
    },
    {
      id: 2,
      title: "연금전략본부: 기관 투자자 맞춤형 포트폴리오",
      department: "연금전략본부",
      description: "기관 요청에 따라 ESG·섹터 조건을 반영한 맞춤형 포트폴리오를 신속하게 생성",
      detail: "운용역이 코드 카탈로그에서 기본 펀드 구성 코드를 불러와, AI Code Assistant에 자연어로 ESG·섹터 조건을 추가 요청. 수정된 코드를 클라우드 IDE에서 실행·검증 후, 맞춤형 포트폴리오 코드를 코드 카탈로그에 저장 및 자산화.",
      steps: [
        "코드 카탈로그에서 기본 코드 확보",
        "AI Code Assistant로 조건 추가 및 코드 수정",
        "클라우드 IDE에서 실행 및 결과 확인",
        "맞춤형 코드 저장 및 자산화"
      ]
    },
    {
      id: 3,
      title: "리스크관리부서: 이벤트 기반 리스크 현황 분석",
      department: "리스크관리부서",
      description: "시장 이벤트 발생 시, 자연어 질의로 즉시 위험 펀드 및 자산 현황 파악 및 대응",
      detail: "리스크 매니저가 LLM 채팅창에 자연어로 조건(예: 듀레이션 5년 이상 채권 10% 이상 보유 펀드)을 입력하면, 시스템이 관련 DB를 조회해 결과를 테이블로 제공. Copilot 연동으로 운용역에게 Teams 알림까지 자동화.",
      steps: [
        "자연어 질의로 조건 입력",
        "DB 조회 및 결과 테이블 제공",
        "Copilot 연동 Teams 알림 발송"
      ]
    },
    {
      id: 4,
      title: "마케팅부서: 콘텐츠 등록 및 AI 검색엔진 연동 자동화",
      department: "마케팅부서",
      description: "유튜브 영상 등 신규 콘텐츠 등록 시, AI가 자동으로 메타데이터 추출·DB 저장 및 검색엔진 연동",
      detail: "마케팅 담당자가 포털에서 워크플로우를 실행, URL 입력만으로 영상 제목·설명·스크립트가 자동 추출·분석되어 DB에 저장. 고객이 홈페이지에서 관련 키워드 검색 시, AI 검색엔진이 신규 콘텐츠를 상위 노출.",
      steps: [
        "콘텐츠 등록 및 워크플로우 실행",
        "AI 기반 메타데이터 추출 및 DB 저장",
        "AI 검색엔진 연동 및 상위 노출"
      ]
    },
    {
      id: 5,
      title: "IT-현업 협업: Code Component 제공 및 자체 확장",
      department: "IT-현업 협업",
      description: "IT가 제공한 코드 컴포넌트를 현업이 직접 확장·활용하고, 자산화 및 부서 공유까지 자율적으로 수행",
      detail: "IT가 성과분석 시스템의 '기여도 분석' 코드를 패키지로 제공. 운용역이 이를 가져와 자체적으로 섹터별 기여도 등 추가 분석 로직을 AI Code Assistant로 확장, 팀 내 공유 및 코드 카탈로그에 업로드.",
      steps: [
        "IT의 코드 컴포넌트 제공",
        "현업의 자체 확장 및 분석",
        "AI Code Assistant로 기능 추가",
        "코드 카탈로그 업로드 및 부서 공유"
      ]
    }
  ];

  const components = [
    {
      name: "데이터 카탈로그",
      icon: <Database className="w-6 h-6" />,
      description: "전사 공유 가능한 데이터를 Snowflake 기반 인프라에 통합하여 데이터 사일로를 해소하고, 검증된 내부 데이터 활용 촉진",
      color: colors.primary,
      techStack: ["Snowflake", "DataHub", "Apache Atlas"],
      path: "/data"
    },
    {
      name: "코드 카탈로그",
      icon: <Code className="w-6 h-6" />,
      description: "업무 프로세스와 데이터 분석 노하우를 코드로 자산화하여 체계적으로 축적하고 관리함",
      color: colors.secondary,
      techStack: ["GitLab", "GitHub", "Docker"],
      path: "/code"
    },
    {
      name: "LLM기반 AI 어시스턴트",
      icon: <Bot className="w-6 h-6" />,
      description: "자연어로 질의하면 Python코드나 SQL쿼리로 자동 변환하여 데이터를 조회. 코드에 대한 기술적 장벽을 낮추는 역할",
      color: colors.tertiary,
      techStack: ["OpenAI API", "MCP", "LangChain"],
      path: "/llm"
    },
    {
      name: "클라우드 IDE 및 실행환경",
      icon: <Cloud className="w-6 h-6" />,
      description: "웹 브라우저를 통해 바로 접속할 수 있는 코드 실행 및 개발환경. 개인이 직접 개발환경을 구성할 필요가 없음",
      color: colors.quaternary,
      techStack: ["VS Code Server", "JupyterHub", "Kubernetes"],
      path: "/cloudide"
    },
    {
      name: "워크플로우 자동화",
      icon: <Workflow className="w-6 h-6" />,
      description: "코드 카탈로그에 등록된 코드를 워크플로우 자동화 툴과 연계하여 반복적으로 수행가능",
      color: colors.accent3,
      techStack: ["n8n", "Apache Airflow", "Teams API"],
      path: "/workflow"
    },
    {
      name: "통합 포털",
      icon: <GitBranch className="w-6 h-6" />,
      description: "모든 구성 요소들을 하나의 통합된 인터페이스로 연결하여 사용자가 원활하게 전환하며 업무를 수행할 수 있는 중앙 집중식 접근점 제공",
      color: colors.accent1,
      techStack: ["React", "Node.js", "nginx"],
      path: "/"
    }
  ];

  const problems = [
    { 
      title: "IT 지원 업무 병목", 
      description: "데이터 관련 요청이 IT/전문 인력에 집중되어 대응 지연 발생",
      severity: "high"
    },
    { 
      title: "데이터 접근성 취약", 
      description: "내부 데이터의 존재를 모르거나 접근 권한 부재로 인한 활용도 저하",
      severity: "high"
    },
    { 
      title: "분석 환경 한계", 
      description: "Excel 기반 수작업 방식은 복잡한 금융 분석과 대용량 데이터 처리에서 정확성·확장성 한계",
      severity: "medium"
    },
    { 
      title: "기술 진입 장벽", 
      description: "Python 등 전문 분석 도구에 대한 심리적·기술적 부담으로 활용 저조",
      severity: "medium"
    },
    { 
      title: "지식 자산의 사일로화", 
      description: "분석 노하우가 개인·부서 차원에 머물러 조직 전체 자산으로 축적되지 못함",
      severity: "high"
    },
    { 
      title: "자동화 미비", 
      description: "수작업 기반의 반복 업무로 인해 업무 효율성이 낮고 실수 발생 위험 증가",
      severity: "medium"
    }
  ];

  const solutions = [
    { title: "통합 데이터 인프라", description: "GDP(그룹데이터플랫폼) 및 클라우드 DB 기반 데이터 사일로 해소" },
    { title: "AI 기반 데이터 디스커버리", description: "AI를 활용한 내부 데이터 탐색 및 활용" },
    { title: "자연어 인터페이스", description: "LLM을 통한 기술적 진입 장벽 완화" },
    { title: "코드/데이터 카탈로그", description: "조직 지식 자산의 체계적 축적 및 관리" },
    { title: "워크플로우 자동화", description: "반복 업무의 효율화 및 자동화 실현" }
  ];

  const buildingStrategies = [
    {
      title: "지주 주도 아키텍처 설계 및 자회사 맞춤 구현",
      description: "지주에서 통합 방법론과 아키텍처를 정립하고, 각 자회사별 맞춤형 구현을 통한 효율적 AI 플랫폼 구축",
      details: [
        "지주 주도로 방법론, 전략, 아키텍처 구조, 베스트 프렉티스를 정립 (필요시 전문 컨설팅 활용)",
        "각 자회사별 고유한 사정과 환경에 맞는 맞춤형 구현 방식 적용",
        "상용 AI플랫폼(Palantir, Dataiku 등) 장점을 반영하되, 오픈소스를 우선적으로 고려하여 비용 효율성과 유연성 확보",
        "전문 기술업체 및 웹 개발 파트너와 협업하여 핵심기능을 빠르게 구현",
        "그룹의 기술 역량 강화 및 지속적인 자체 개발 역량 확보"
    ]
    },
    {
      title: "변화관리 전략 및 조직 역할 재정의",
      description: "사용자 진화 여정을 설계하고 조직 내 역할을 재정의",
      details: [
        "일반 사용자 → 분석자산 소비자 → 생산자 → 전문가로의 진화 여정",
        "기존 업무시스템 담당부서는 시스템 화면을 중심으로 재사용 가능한 분석자산의 생산자 역할로 전환",
      ]
    },
    {
      title: "지속 가능한 운영 및 거버넌스",
      description: "고품질 데이터와 분석 코드의 체계적 관리 및 품질 보증",
      details: [
        "중앙 저장소 기반의 분석 자산 관리 체계 구축",
        "단계별 캠페인 및 핵심 사용자 발굴 전략",
        "경영진 대상 정기적 성과 리포팅 체계 확립"
      ]
    }
  ];

  const userJourney = [
    {
      stage: "일반 사용자",
      description: "기본적인 데이터 조회 및 활용",
      capabilities: ["자연어 질의", "기본 데이터 조회", "결과 확인"],
      color: colors.primary
    },
    {
      stage: "분석자산 소비자",
      description: "기존 분석 자산을 활용한 업무 수행",
      capabilities: ["코드 카탈로그 활용", "기존 분석 도구 사용", "결과 해석"],
      color: colors.secondary
    },
    {
      stage: "생산자 (파워유저)",
      description: "분석 자산을 생성하고 공유",
      capabilities: ["코드 작성", "분석 자산 생성", "워크플로우 구성"],
      color: colors.tertiary
    },
    {
      stage: "전문가",
      description: "고급 분석 및 플랫폼 확장",
      capabilities: ["복잡한 분석 모델", "플랫폼 기능 확장", "조직 내 멘토링"],
      color: colors.quaternary
    }
  ];

  const roiData = [
    {
      category: "비용 절감",
      metrics: [
        { item: "외부 정보 단말기 의존도 감소", value: "30-50%" },
        { item: "IT 지원 요청 감소", value: "40%" },
        { item: "중복 분석 업무 제거", value: "25%" }
      ]
    },
    {
      category: "업무 효율성",
      metrics: [
        { item: "데이터 분석 시간 단축", value: "60%" },
        { item: "반복 업무 자동화", value: "80%" },
        { item: "의사결정 속도 향상", value: "50%" }
      ]
    },
    {
      category: "조직 역량",
      metrics: [
        { item: "데이터 활용 인력 확대", value: "300%" },
        { item: "분석 자산 축적", value: "지속적 증가" },
        { item: "부서간 협업 증대", value: "200%" }
      ]
    }
  ];

  const detailedTimeline = [
    {
      phase: "1단계",
      period: "1-3개월",
      title: "핵심 데이터 접근성 확보",
      objective: "가장 시급한 '데이터 조회' 문제를 해결하여 빠른 성공 경험(Quick-Win)을 제공하고 프로젝트 지지자 확보",
      tasks: [
        "Snowflake 기반 데이터 인프라 연동",
        "LLM 기반 자연어 조회 API 핵심 기능 프로토타입 개발",
        "기본 웹 포털 구축"
      ],
      color: colors.primary
    },
    {
      phase: "2단계",
      period: "4-6개월",
      title: "분석 자산화 및 환경 제공",
      objective: "고품질 데이터와 코드의 재사용성을 높이고, 심화 분석이 가능한 기반 마련",
      tasks: [
        "데이터/코드 카탈로그 시스템 구축",
        "Power User를 위한 클라우드 기반 코드 실행 환경 제공",
        "AI Code Assistant 기능 고도화"
      ],
      color: colors.secondary
    },
    {
      phase: "3단계",
      period: "7-12개월",
      title: "현업 적용 및 피드백 기반 고도화",
      objective: "실제 업무에 적용하며 사용성을 검증하고, 업무 자동화를 통해 체감 효용성 극대화",
      tasks: [
        "운용, 리스크 등 핵심 부서 대상 시범 운영",
        "워크플로우 자동화 툴(n8n 등) 도입 및 연계",
        "사용자 교육 및 지원 체계 구축"
      ],
      color: colors.tertiary
    },
    {
      phase: "4단계",
      period: "12개월-",
      title: "전사 확대 및 문화 내재화",
      objective: "AI WorkSpace 활용을 전사적인 업무 방식으로 정착",
      tasks: [
        "전사 부서를 대상으로 플랫폼 확대 적용",
        "우수 활용 사례 발굴 및 공유를 통한 조직 문화 내재화",
        "지속적인 플랫폼 발전 및 고도화"
      ],
      color: colors.quaternary
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header style={{ backgroundColor: colors.primary }} className="text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">AI WorkSpace</h1>
          <p className="text-lg opacity-90">AI-Native 조직으로의 전환</p>
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
              { id: 'strategy', label: '구축 전략' },
              { id: 'scenarios', label: '사용 시나리오' },
              { id: 'timeline', label: '추진 일정' },
              { id: 'roi', label: 'ROI & 효과' },
              { id: 'architecture', label: '시스템 아키텍처' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeSection === item.id 
                    ? 'border-blue-600 text-blue-700' 
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
            {/* Hero Section - 프로젝트 비전 */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full transform translate-x-8 -translate-y-8 opacity-50"></div>
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                  AI-Native 조직으로의 전환
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  전 구성원이 AI의 도움으로 데이터를 자유자재로 활용하는 
                  <span className="font-semibold text-blue-600">'AI-Native'</span> 조직으로 전환
                </p>
              </div>
            </div>

            {/* 통일된 카드 그리드 레이아웃 */}
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 핵심 문제의식 카드 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-sky-400"></div>
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-sky-100 rounded-lg mb-4">
                    <AlertTriangle className="w-6 h-6" style={{ color: colors.secondary }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: colors.secondary }}>
                    핵심 문제
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "데이터를 찾기 어렵고, 분석 역량은 제한적이고, 노하우가 축적되지 못하는" 구조적 문제
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      해결 필요
                    </span>
                  </div>
                </div>
              </div>

              {/* AI WorkSpace 솔루션 카드 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg mb-4">
                    <Database className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                    AI WorkSpace 솔루션
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    AI 기반 데이터 <strong>디스커버리 / 분석 / 자동화</strong> 로 구조적 문제 해결
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      핵심 솔루션
                    </span>
                  </div>
                </div>
              </div>

              {/* AI WorkSpace 핵심 기능 카드*/}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-2 bg-gradient-to-r from-cyan-400 to-teal-400"></div>
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-lg mb-4">
                    <Search className="w-6 h-6" style={{ color: colors.tertiary }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: colors.tertiary }}>
                    AI WorkSpace 핵심 기능
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong>자연어 질의, AI 코드 생성, 자동화</strong>를 통해 
                    누구나 쉽게 데이터를 활용할 수 있는 통합 플랫폼
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                      핵심 기능
                    </span>
                  </div>
                </div>
              </div>
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
                    <div 
                      key={index} 
                      className="border-l-4 pl-4 py-3 rounded-r-lg"
                      style={{ 
                        borderColor: problem.severity === 'high' ? '#ef4444' : colors.accent1,
                        backgroundColor: problem.severity === 'high' ? '#fef2f2' : 'transparent'
                      }}
                    >
                      <div className="flex items-center mb-1">
                        <h4 className="font-semibold text-gray-800">{problem.title}</h4>
                        {problem.severity === 'high' && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                            심각
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{problem.description}</p>
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
                <Link
                  key={index}
                  to={component.path}
                  className={`block bg-white rounded-lg shadow-lg p-6 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer ${
                    animatedCards.has(index) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{
                    borderLeft: `4px solid ${component.color}`
                  }}
                >
                  <div className="flex items-start mb-1">
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
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{component.description}</p>
                      <div className="flex flex-wrap gap-2 mb-0.5">
                        {component.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: `${component.color}15`,
                              color: component.color
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>



          </div>
        )}

        {/* Building Strategy Section */}
        {activeSection === 'strategy' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.primary }}>
              구축 전략
            </h2>
            
            <div className="space-y-6">
              {buildingStrategies.map((strategy, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  style={{ borderLeft: `4px solid ${colors.secondary}` }}
                >
                  <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                    {strategy.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{strategy.description}</p>
                  <ul className="space-y-2">
                    {strategy.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" 
                             style={{ backgroundColor: colors.secondary }}></div>
                        <p className="text-sm text-gray-600">{detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* User Journey Map */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
                사용자 진화 여정
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {userJourney.map((stage, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: stage.color }}
                    >
                      {index + 1}
                    </div>
                    <h4 className="font-bold mb-2" style={{ color: stage.color }}>
                      {stage.stage}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                    <div className="space-y-1">
                      {stage.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="text-xs px-2 py-1 rounded" 
                             style={{ backgroundColor: `${stage.color}10`, color: stage.color }}>
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                      <h4 className="font-semibold mb-3" style={{ color: colors.primary }}>프로세스 단계</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        {scenario.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="text-center">
                            <div 
                              className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: colors.secondary }}
                            >
                              {stepIndex + 1}
                            </div>
                            <p className="text-xs text-gray-600">{step}</p>
                          </div>
                        ))}
                      </div>
                      <h4 className="font-semibold mb-2" style={{ color: colors.primary }}>상세 시나리오</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{scenario.detail}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>


          </div>
        )}

        {/* Timeline Section */}
        {activeSection === 'timeline' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.primary }}>
              상세 추진 일정
            </h2>
            
            <div className="space-y-8">
              {detailedTimeline.map((phase, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  style={{ borderLeft: `4px solid ${phase.color}` }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                      style={{ backgroundColor: phase.color }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                        {phase.phase} ({phase.period})
                      </h3>
                      <h4 className="text-lg font-medium" style={{ color: phase.color }}>
                        {phase.title}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2" style={{ color: colors.primary }}>목표</h5>
                    <p className="text-gray-700 text-sm">{phase.objective}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2" style={{ color: colors.primary }}>주요 진행사항</h5>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start">
                          <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" 
                               style={{ backgroundColor: phase.color }}></div>
                          <p className="text-sm text-gray-600">{task}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Win Highlight */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 mr-3" style={{ color: colors.secondary }} />
                <h3 className="text-xl font-bold" style={{ color: colors.primary }}>Quick-Win 전략</h3>
              </div>
              <p className="text-gray-700">
                1단계에서 <strong>가장 시급한 '데이터 조회' 문제를 해결</strong>하여 빠른 성공 경험을 제공하고, 
                조직 내 프로젝트 지지자를 확보하는 것이 핵심 전략입니다. 
                이를 통해 이후 단계의 성공적인 추진을 위한 기반을 마련합니다.
              </p>
            </div>
          </div>
        )}

        {/* ROI Section */}
        {activeSection === 'roi' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                예상 ROI 및 기대 효과
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-4xl mx-auto">
                <p className="text-sm text-yellow-800">
                  <strong>※ 참고사항:</strong> 아래 제시된 수치는 일반적인 디지털 전환 프로젝트 사례를 참고한 예상치입니다. 
                  실제 ROI는 조직의 현황, 도입 규모, 사용자 적응도 등에 따라 달라질 수 있으며, 
                  정확한 효과 측정을 위해서는 시범 운영 기간의 데이터를 기반으로 한 재평가가 필요합니다.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {roiData.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  style={{ borderTop: `4px solid ${[colors.primary, colors.secondary, colors.tertiary][index]}` }}
                >
                  <h3 className="text-xl font-bold mb-4 text-center" 
                      style={{ color: [colors.primary, colors.secondary, colors.tertiary][index] }}>
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{metric.item}</span>
                        <span className="font-bold" 
                              style={{ color: [colors.primary, colors.secondary, colors.tertiary][index] }}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Savings Highlight */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
                주요 기대 효과
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-blue-700 text-center">
                  아래 효과들은 성공적인 구축 및 활용을 전제로 한 기대 효과이며, 실제 결과는 조직의 특성과 적용 정도에 따라 차이가 있을 수 있습니다.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold" style={{ color: colors.secondary }}>
                    기대 비용 절감 효과
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 mr-2 mt-0.5" style={{ color: colors.secondary }} />
                      <span className="text-sm">외부 정보 단말기(블룸버그, Factset) 의존도 감소 기대</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 mr-2 mt-0.5" style={{ color: colors.secondary }} />
                      <span className="text-sm">IT 지원 요청 감소를 통한 운영비용 절약 기대</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 mr-2 mt-0.5" style={{ color: colors.secondary }} />
                      <span className="text-sm">중복 분석 업무 제거를 통한 인력 효율성 증대 기대</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold" style={{ color: colors.tertiary }}>
                    기대 전략적 가치
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Brain className="w-5 h-5 mr-2 mt-0.5" style={{ color: colors.tertiary }} />
                      <span className="text-sm">Data-Native 조직으로의 디지털 전환 가속화 기대</span>
                    </li>
                    <li className="flex items-start">
                      <Brain className="w-5 h-5 mr-2 mt-0.5" style={{ color: colors.tertiary }} />
                      <span className="text-sm">조직 전체의 데이터 활용 역량 및 분석 문화 확산 기대</span>
                    </li>
                    <li className="flex items-start">
                      <Brain className="w-5 h-5 mr-2 mt-0.5" style={{ color: colors.tertiary }} />
                      <span className="text-sm">데이터 기반 신속한 의사결정 체계 구축 기대</span>
                    </li>
                  </ul>
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