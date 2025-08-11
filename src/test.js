import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Code, Database, Bot, Workflow, Cloud, Search, Users, TrendingUp, Shield, FileText, PlayCircle } from 'lucide-react';

const colors = {
  primary: 'rgb(39, 58, 146)',    // Woori WON Blue
  secondary: 'rgb(0, 174, 239)',   // Woori WON SkyBlue
  tertiary: 'rgb(10, 0, 72)',      // Woori WON Navy
  quaternary: 'rgb(0, 174, 239)',  // Woori WON SkyBlue (lighter variant)
  accent1: 'rgb(10, 0, 72)',       // Woori WON Navy (dark accent)
  accent2: 'rgb(132, 136, 139)',   // Keep as neutral gray
  accent3: 'rgb(39, 58, 146)'      // Woori WON Blue (alternate)
};

const AIWorkSpaceOverview = () => {
  const [activeSection, setActiveSection] = useState('concept');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [animatedCards, setAnimatedCards] = useState(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(new Set([0, 1, 2, 3, 4, 5, 6, 7]));
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
      name: "통합 포털",
      icon: <Search className="w-6 h-6" />,
      description: "Streamlit 기반 웹 인터페이스",
      color: colors.primary
    },
    {
      name: "LLM 챗봇",
      icon: <Bot className="w-6 h-6" />,
      description: "자연어를 SQL/Python 코드로 변환",
      color: colors.secondary
    },
    {
      name: "데이터 카탈로그",
      icon: <Database className="w-6 h-6" />,
      description: "Snowflake 기반 통합 데이터 저장소",
      color: colors.tertiary
    },
    {
      name: "코드 카탈로그",
      icon: <Code className="w-6 h-6" />,
      description: "검증된 분석 코드 공유 시스템",
      color: colors.quaternary
    },
    {
      name: "AI Code Assistant",
      icon: <Bot className="w-6 h-6" />,
      description: "Cursor 등을 통한 코드 자동 생성",
      color: colors.accent1
    },
    {
      name: "클라우드 환경",
      icon: <Cloud className="w-6 h-6" />,
      description: "VS Code Server 기반 실행 환경",
      color: colors.accent2
    },
    {
      name: "워크플로우 자동화",
      icon: <Workflow className="w-6 h-6" />,
      description: "n8n 기반 프로세스 자동화",
      color: colors.accent3
    },
    {
      name: "금융모델 프레임워크",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "백테스팅, 스트레스 테스트 표준화",
      color: colors.primary
    }
  ];

  const problems = [
    { title: "데이터 접근 병목", description: "IT 부서 집중으로 인한 대응 지연" },
    { title: "기술 진입 장벽", description: "비개발자의 Python 활용 부담" },
    { title: "분석 지식 파편화", description: "부서별 사일로화로 중복 작업" },
    { title: "자동화 미비", description: "분석 결과의 운영 시스템 연동 부족" }
  ];

  const solutions = [
    { title: "통합 데이터 인프라", description: "Snowflake 기반 사일로 해소" },
    { title: "LLM 자연어 인터페이스", description: "진입 장벽 완화" },
    { title: "코드/데이터 카탈로그", description: "조직 지식 자산 체계화" },
    { title: "워크플로우 자동화", description: "반복 업무 효율화" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header style={{ backgroundColor: colors.primary }} className="text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">AI WorkSpace</h1>
          <p className="text-lg opacity-90">모든 구성원의 Code-Native 조직 전환 프로젝트</p>
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
              { id: 'scenarios', label: '사용 시나리오' }
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
                High-Code 접근법으로 진정한 디지털 전환
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                No-code/Low-code를 넘어서, 모든 임직원이 코딩을 엑셀처럼 활용하는 
                'Code-Native' 조직으로의 혁신적 전환
              </p>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6" style={{ backgroundColor: `${colors.primary}10` }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                  상용 플랫폼 vs AI WorkSpace
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: colors.quaternary }}>
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">평가 기준</th>
                      <th className="px-6 py-4 text-left font-semibold">상용 플랫폼 (Palantir, Dataiku)</th>
                      <th className="px-6 py-4 text-left font-semibold">AI WorkSpace</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">핵심 철학</td>
                      <td className="px-6 py-4">플랫폼 중심 (Platform-Centric)</td>
                      <td className="px-6 py-4 font-semibold" style={{ color: colors.secondary }}>
                        코드 중심 (Code-Centric)
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">유연성 & 확장성</td>
                      <td className="px-6 py-4">제한적 - 플랫폼 기능 내에서만 구현</td>
                      <td className="px-6 py-4 font-semibold" style={{ color: colors.secondary }}>
                        무한함 - 모든 오픈소스 라이브러리 활용 가능
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">기술 종속성</td>
                      <td className="px-6 py-4">높음 - 벤더 Lock-in</td>
                      <td className="px-6 py-4 font-semibold" style={{ color: colors.secondary }}>
                        매우 낮음 - 표준 기술 기반
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">조직 역량 내재화</td>
                      <td className="px-6 py-4">툴 활용 능력</td>
                      <td className="px-6 py-4 font-semibold" style={{ color: colors.secondary }}>
                        핵심 디지털 역량 - 조직의 무형 자산화
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vision Statement */}
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Code className="w-8 h-8" style={{ color: colors.secondary }} />
                <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>
                  프로젝트 비전
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                단순한 업무 자동화를 넘어, <strong>모든 임직원이 코딩을 엑셀과 같은 기본 역량으로 활용</strong>하는 
                조직으로 전환합니다. 가장 유연하고 강력한 도구인 '코드' 자체를 조직의 핵심 경쟁력으로 
                내재화하여 진정한 디지털 전환을 실현합니다.
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
                  해결 전략
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

            {/* Key Benefits */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
                기대 효과
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${colors.secondary}20` }}>
                    <TrendingUp className="w-8 h-8" style={{ color: colors.secondary }} />
                  </div>
                  <h4 className="font-bold mb-2">즉시 효과</h4>
                  <p className="text-sm text-gray-600">분석 작업 시간 단축<br />IT 부서 업무 부담 감소</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${colors.tertiary}20` }}>
                    <Users className="w-8 h-8" style={{ color: colors.tertiary }} />
                  </div>
                  <h4 className="font-bold mb-2">중기 효과</h4>
                  <p className="text-sm text-gray-600">전 직원 데이터 분석 역량 내재화<br />부서 간 시너지 증대</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${colors.accent3}20` }}>
                    <Code className="w-8 h-8" style={{ color: colors.accent3 }} />
                  </div>
                  <h4 className="font-bold mb-2">장기 효과</h4>
                  <p className="text-sm text-gray-600">Code-Native 조직 전환 완성<br />지속가능한 디지털 자산 축적</p>
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="flex items-center mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${component.color}20` }}
                    >
                      <div style={{ color: component.color }}>
                        {component.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800">{component.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{component.description}</p>
                </div>
              ))}
            </div>

            {/* Architecture Flow */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
                시스템 구성도
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-3" 
                       style={{ backgroundColor: `${colors.primary}20` }}>
                    <Search className="w-12 h-12" style={{ color: colors.primary }} />
                  </div>
                  <p className="font-semibold">통합 포털</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-3" 
                       style={{ backgroundColor: `${colors.secondary}20` }}>
                    <Bot className="w-12 h-12" style={{ color: colors.secondary }} />
                  </div>
                  <p className="font-semibold">LLM 처리</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-3" 
                       style={{ backgroundColor: `${colors.tertiary}20` }}>
                    <Database className="w-12 h-12" style={{ color: colors.tertiary }} />
                  </div>
                  <p className="font-semibold">데이터 처리</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-3" 
                       style={{ backgroundColor: `${colors.accent3}20` }}>
                    <Cloud className="w-12 h-12" style={{ color: colors.accent3 }} />
                  </div>
                  <p className="font-semibold">실행 환경</p>
                </div>
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

export default AIWorkSpaceOverview;