import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Plus, 
  Settings, 
  Calendar, 
  Database, 
  Mail, 
  FileText, 
  Code, 
  Zap, 
  Clock, 
  Search,
  Download,
  Upload,
  MessageSquare,
  BarChart3,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Copy,
  Save,
  Share2,
  RefreshCw
} from 'lucide-react';
import technicalAnalysistool from './technicalAnalysistool.png';
import FTnews from './FTnews.png';
import riskAlarm from './risk_alarm.png';

const WorkflowAutomation = () => {
  // 색상 팔레트 정의
  const colors = {
    primary: 'rgb(39, 58, 146)',    // Woori WON Blue
    secondary: 'rgb(0, 174, 239)',   // Woori WON SkyBlue
    tertiary: 'rgb(10, 0, 72)',      // Woori WON Navy
    quaternary: 'rgb(0, 174, 239)',  // Woori WON SkyBlue (lighter variant)
    accent1: 'rgb(10, 0, 72)',       // Woori WON Navy (dark accent)
    accent2: 'rgb(132, 136, 139)',   // Keep as neutral gray
    accent3: 'rgb(39, 58, 146)'      // Woori WON Blue (alternate)
  };

  const [activeTab, setActiveTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCodeCatalog, setShowCodeCatalog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);

  // 샘플 워크플로우 데이터
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: '일일 포트폴리오 성과 리포트',
      description: '매일 오전 8시 포트폴리오 성과를 분석하여 운용역들에게 이메일 발송',
      status: 'running',
      lastRun: '2025-06-27 08:00',
      nextRun: '2025-06-28 08:00',
      triggers: ['스케줄: 매일 08:00'],
      actions: ['Snowflake 데이터 조회', 'Python 분석 실행', '이메일 발송'],
      category: '운용',
      author: '김운용',
      executions: 142
    },
    {
      id: 2,
      name: '유튜브 콘텐츠 AI 검색 최적화',
      description: '신규 유튜브 영상 업로드 시 자동으로 메타데이터를 추출하여 AI 검색엔진에 등록',
      status: 'paused',
      lastRun: '2025-06-26 14:30',
      nextRun: '-',
      triggers: ['웹훅: 유튜브 업로드'],
      actions: ['스크립트 추출', 'LLM 메타데이터 생성', 'DB 저장'],
      category: '마케팅',
      author: '이마케팅',
      executions: 28
    },
    {
      id: 3,
      name: '리스크 알림 시스템',
      description: '특정 리스크 임계값 초과 시 즉시 관련 부서에 Teams 알림 발송',
      status: 'running',
      lastRun: '2025-06-27 15:22',
      nextRun: '실시간 모니터링',
      triggers: ['데이터 변화 감지'],
      actions: ['리스크 계산', 'Teams 알림', '담당자 배정'],
      category: '리스크',
      author: '박리스크',
      executions: 67
    },
    {
      id: 4,
      name: '예적금잔액 및 특수채권 상계처리',
      description: '예금잔액 조회부터 AI 판단을 통한 상계처리까지 자동화된 백오피스 업무 프로세스',
      status: 'running',
      lastRun: '2025-08-11 09:30',
      nextRun: '매일 09:00',
      triggers: ['스케줄: 매일 09:00', '상계요청 접수시'],
      actions: ['예금잔액 일괄조회', 'AI LLM 상계가능여부 판단', '상계통지서 자동발송', '상계실행 처리'],
      category: '백오피스',
      author: '김백오피스',
      executions: 89
    },
    {
      id: 5,
      name: '자금지시서 기반 펀드운용 자동화',
      description: '운용지시 메일 수신부터 펀드 매매 실행까지의 전체 프로세스를 자동화',
      status: 'running',
      lastRun: '2025-08-11 14:15',
      nextRun: '실시간 모니터링',
      triggers: ['운용지시 메일 수신', '계좌이체신청서 접수'],
      actions: ['메일수신 및 분류', '계좌이체신청서 작성', '수탁사 메일송부', '전표작성 및 제출', '펀드매수매도 처리', '거래서류 송부'],
      category: '운용',
      author: '이펀드운용',
      executions: 156
    }
  ]);

  // 코드 카탈로그 샘플 데이터
  const codeComponents = [
    {
      id: 1,
      name: '포트폴리오 성과 분석',
      description: '펀드별 수익률, 샤프지수, MDD 계산',
      category: '금융분석',
      language: 'Python',
      author: '김운용',
      usage: 45,
      code: 'def calculate_performance(fund_data): ...'
    },
    {
      id: 2,
      name: 'ESG 점수 필터링',
      description: 'ESG 등급 기준으로 종목 필터링',
      category: '데이터처리',
      language: 'SQL',
      author: '이분석',
      usage: 23,
      code: 'SELECT * FROM holdings WHERE esg_score >= ...'
    },
    {
      id: 3,
      name: '이메일 리포트 생성',
      description: 'HTML 형태의 이메일 리포트 템플릿',
      category: '리포팅',
      language: 'Python',
      author: 'IT팀',
      usage: 78,
      code: 'def generate_email_report(data): ...'
    }
  ];

  // 워크플로우 실행 로그
  const executionLogs = [
    { id: 1, workflow: '일일 포트폴리오 성과 리포트', status: 'success', startTime: '2025-08-11 08:00:00', duration: '45초', message: '성공적으로 완료' },
    { id: 2, workflow: '예적금잔액 및 특수채권 상계처리', status: 'success', startTime: '2025-08-11 09:30:15', duration: '3분52초', message: 'AI 판단 완료, 상계통지서 발송' },
    { id: 3, workflow: '자금지시서 기반 펀드운용 자동화', status: 'success', startTime: '2025-08-11 14:15:22', duration: '2분1초', message: '거래서류 송부 완료' },
    { id: 4, workflow: '리스크 알림 시스템', status: 'success', startTime: '2025-08-11 15:22:15', duration: '12초', message: '알림 발송 완료' },
    { id: 5, workflow: '유튜브 콘텐츠 AI 검색 최적화', status: 'error', startTime: '2025-08-10 14:30:22', duration: '8초', message: 'API 호출 실패' },
    { id: 6, workflow: '일일 포트폴리오 성과 리포트', status: 'success', startTime: '2025-08-10 08:00:00', duration: '52초', message: '성공적으로 완료' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      running: { bg: 'bg-green-100', text: 'text-green-800', label: '실행중' },
      paused: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '일시정지' },
      error: { bg: 'bg-red-100', text: 'text-red-800', label: '오류' },
      success: { bg: 'bg-green-100', text: 'text-green-800', label: '성공' }
    };
    
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: '알 수 없음' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {getStatusIcon(status)}
        <span className="ml-1">{config.label}</span>
      </span>
    );
  };

  const WorkflowCard = ({ workflow }) => (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
      style={{ borderLeft: `4px solid ${colors.secondary}` }}
      onClick={() => setSelectedWorkflow(workflow)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
            {getStatusBadge(workflow.status)}
          </div>
          <p className="text-gray-600 text-sm mb-3">{workflow.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              마지막 실행: {workflow.lastRun}
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
              실행 횟수: {workflow.executions}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            onClick={(e) => {e.stopPropagation(); /* 실행/정지 로직 */}}
          >
            {workflow.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">트리거</h4>
          <div className="flex flex-wrap gap-2">
            {workflow.triggers.map((trigger, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs" style={{ backgroundColor: `${colors.tertiary}20`, color: colors.tertiary }}>
                <Zap className="w-3 h-3 mr-1" />
                {trigger}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">액션</h4>
          <div className="flex flex-wrap gap-2">
            {workflow.actions.map((action, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs" style={{ backgroundColor: `${colors.quaternary}20`, color: colors.accent1 }}>
                {action.includes('데이터') && <Database className="w-3 h-3 mr-1" />}
                {action.includes('이메일') && <Mail className="w-3 h-3 mr-1" />}
                {action.includes('Python') && <Code className="w-3 h-3 mr-1" />}
                {action.includes('Teams') && <MessageSquare className="w-3 h-3 mr-1" />}
                {!action.includes('데이터') && !action.includes('이메일') && !action.includes('Python') && !action.includes('Teams') && <FileText className="w-3 h-3 mr-1" />}
                {action}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CreateWorkflowModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>새 워크플로우 생성</h2>
          <button 
            onClick={() => setShowCreateModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 기본 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>기본 정보</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">워크플로우 이름</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ focusRingColor: colors.tertiary }}
                  placeholder="예: 일일 리스크 모니터링"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-24"
                  style={{ focusRingColor: colors.tertiary }}
                  placeholder="워크플로우의 목적과 기능을 설명해주세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ focusRingColor: colors.tertiary }}>
                  <option>운용</option>
                  <option>리스크</option>
                  <option>마케팅</option>
                  <option>백오피스</option>
                  <option>기타</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI 어시스턴트 */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>AI 워크플로우 어시스턴트</h3>
            <div className="bg-gray-50 rounded-lg p-4 h-64">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5" style={{ color: colors.tertiary }} />
                <span className="font-medium">워크플로우 구성 도움받기</span>
              </div>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-32 mb-3"
                style={{ focusRingColor: colors.tertiary }}
                placeholder="어떤 워크플로우를 만들고 싶은지 설명해주세요. 예: '매일 아침 포트폴리오 수익률을 계산해서 운용팀에게 이메일로 보내고 싶어요'"
              />
              <button 
                className="w-full px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.tertiary }}
              >
                AI로 워크플로우 생성
              </button>
            </div>
          </div>
        </div>

        {/* 워크플로우 구성 */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>워크플로우 구성</h3>
          
          {/* 트리거 설정 */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3">1. 트리거 (언제 실행할까요?)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <Calendar className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">스케줄</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <Database className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">데이터 변화</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <Mail className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">이메일 수신</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <Zap className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">웹훅</span>
              </button>
            </div>
          </div>

          {/* 액션 설정 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium">2. 액션 (무엇을 실행할까요?)</h4>
              <button 
                onClick={() => setShowCodeCatalog(true)}
                className="px-3 py-1 text-sm rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: colors.secondary, color: 'white' }}
              >
                <Code className="w-4 h-4" />
                코드 카탈로그에서 가져오기
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <Database className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">데이터 조회</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <Code className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">Python 실행</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <Mail className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">이메일 발송</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center gap-2">
                <FileText className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">문서 생성</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={() => setShowCreateModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button 
            className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.secondary }}
          >
            워크플로우 생성
          </button>
        </div>
      </div>
    </div>
  );

  const CodeCatalogModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>코드 카탈로그</h2>
          <button 
            onClick={() => setShowCodeCatalog(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ focusRingColor: colors.tertiary }}
              placeholder="코드 컴포넌트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {codeComponents.map(component => (
            <div key={component.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{component.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{component.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded">{component.category}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{component.language}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>작성자: {component.author}</span>
                <span>사용: {component.usage}회</span>
              </div>
              
              <div className="bg-gray-50 rounded p-2 mb-3">
                <code className="text-xs text-gray-700">{component.code}</code>
              </div>
              
              <button 
                className="w-full px-3 py-2 text-white rounded-md hover:opacity-90 transition-opacity text-sm"
                style={{ backgroundColor: colors.secondary }}
              >
                워크플로우에 추가
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="text-white shadow-lg" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8" />
              <h1 className="text-xl font-bold">AI WorkSpace - 워크플로우 자동화</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: colors.secondary }}
              >
                <Plus className="w-4 h-4" />
                새 워크플로우
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'workflows', label: '워크플로우', icon: Zap },
              { id: 'executions', label: '실행 로그', icon: BarChart3 },
              { id: 'schedule', label: '스케줄 관리', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'border-current text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={activeTab === tab.id ? { color: colors.tertiary, borderColor: colors.tertiary } : {}}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'workflows' && (
          <div>
            {/* 필터 및 검색 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 w-80"
                    style={{ focusRingColor: colors.tertiary }}
                    placeholder="워크플로우 검색..."
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ focusRingColor: colors.tertiary }}>
                  <option>모든 카테고리</option>
                  <option>운용</option>
                  <option>리스크</option>
                  <option>마케팅</option>
                  <option>백오피스</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ focusRingColor: colors.tertiary }}>
                  <option>모든 상태</option>
                  <option>실행중</option>
                  <option>일시정지</option>
                  <option>오류</option>
                </select>
              </div>
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                새로고침
              </button>
            </div>

            {/* 워크플로우 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {workflows.map(workflow => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'executions' && (
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">실행 로그</h3>
                <p className="text-sm text-gray-500">워크플로우 실행 기록 및 상태</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">워크플로우</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시작 시간</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">실행 시간</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메시지</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {executionLogs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{log.workflow}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(log.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.startTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 스케줄 캘린더 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">스케줄 캘린더</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
                    <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 5; // 6월 시작 조정
                      const isToday = day === 27;
                      const hasSchedule = [1, 3, 8, 15, 22, 27, 28, 29].includes(day);
                      
                      return (
                        <div 
                          key={i} 
                          className={`h-10 flex items-center justify-center text-sm rounded cursor-pointer transition-colors ${
                            day <= 0 || day > 30 
                              ? 'text-gray-300' 
                              : isToday 
                                ? 'bg-blue-500 text-white font-medium'
                                : hasSchedule
                                  ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                                  : 'hover:bg-gray-100'
                          }`}
                        >
                          {day > 0 && day <= 30 ? day : ''}
                          {hasSchedule && day > 0 && day <= 30 && (
                            <div className="w-1 h-1 bg-orange-500 rounded-full ml-1"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 오늘의 스케줄 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">오늘의 스케줄 (6월 27일)</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">일일 포트폴리오 성과 리포트</div>
                      <div className="text-xs text-gray-500">08:00 - 완료</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">리스크 알림 시스템</div>
                      <div className="text-xs text-gray-500">15:22 - 완료</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">주간 리스크 리포트</div>
                      <div className="text-xs text-gray-500">18:00 - 예정</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 스케줄 설정 */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">스케줄 설정</h3>
              <div className="space-y-4">
                {workflows.filter(w => w.nextRun !== '-' && w.nextRun !== '실시간 모니터링').map(workflow => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{workflow.name}</div>
                      <div className="text-sm text-gray-500">다음 실행: {workflow.nextRun}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        {workflow.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 워크플로우 상세 모달 */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>{selectedWorkflow.name}</h2>
                {getStatusBadge(selectedWorkflow.status)}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Copy className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedWorkflow(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>워크플로우 정보</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                    <p className="text-gray-600">{selectedWorkflow.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {selectedWorkflow.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
                      <p className="text-gray-600">{selectedWorkflow.author}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">마지막 실행</label>
                      <p className="text-gray-600">{selectedWorkflow.lastRun}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">다음 실행</label>
                      <p className="text-gray-600">{selectedWorkflow.nextRun}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">실행 횟수</label>
                    <p className="text-gray-600">{selectedWorkflow.executions}회</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>실행 통계</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-green-600">성공률 (지난 30일)</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">42초</div>
                    <div className="text-sm text-blue-600">평균 실행 시간</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-2xl font-bold" style={{ color: colors.secondary }}>2.1GB</div>
                    <div className="text-sm" style={{ color: colors.secondary }}>처리된 데이터량</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>워크플로우 구성</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium mb-3">WorkFlow Job</h4>
                  {/* 일일 포트폴리오 성과 리포트 이미지 */}
                  {selectedWorkflow.name === '일일 포트폴리오 성과 리포트' && (
                    <div className="flex justify-center mb-4">
                      <img src={technicalAnalysistool} alt="기술적분석툴" className="max-h-32 rounded shadow cursor-pointer" onClick={() => { setModalImageSrc(technicalAnalysistool); setShowImageModal(true); }} />
                    </div>
                  )}
                  {/* 유튜브 콘텐츠 AI 검색 최적화 이미지 */}
                  {selectedWorkflow.name === '유튜브 콘텐츠 AI 검색 최적화' && (
                    <div className="flex justify-center mb-4">
                      <img src={FTnews} alt="FTnews" className="max-h-32 rounded shadow cursor-pointer" onClick={() => { setModalImageSrc(FTnews); setShowImageModal(true); }} />
                    </div>
                  )}
                  {/* 리스크 알림 시스템 이미지 */}
                  {selectedWorkflow.name === '리스크 알림 시스템' && (
                    <div className="flex justify-center mb-4">
                      <img src={riskAlarm} alt="리스크 알림 시스템" className="max-h-32 rounded shadow cursor-pointer" onClick={() => { setModalImageSrc(riskAlarm); setShowImageModal(true); }} />
                    </div>
                  )}
                  <div className="space-y-2">
                    {selectedWorkflow.triggers.map((trigger, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Zap className="w-4 h-4" style={{ color: colors.tertiary }} />
                        <span className="text-sm">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-3">액션</h4>
                  
                  <div className="space-y-2">
                    {selectedWorkflow.actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        {action.includes('데이터') && <Database className="w-4 h-4" style={{ color: colors.quaternary }} />}
                        {action.includes('이메일') && <Mail className="w-4 h-4" style={{ color: colors.quaternary }} />}
                        {action.includes('Python') && <Code className="w-4 h-4" style={{ color: colors.quaternary }} />}
                        {action.includes('Teams') && <MessageSquare className="w-4 h-4" style={{ color: colors.quaternary }} />}
                        {!action.includes('데이터') && !action.includes('이메일') && !action.includes('Python') && !action.includes('Teams') && <FileText className="w-4 h-4" style={{ color: colors.quaternary }} />}
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => setSelectedWorkflow(null)}
              >
                닫기
              </button>
              <button 
                className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: selectedWorkflow.status === 'running' ? colors.accent2 : colors.secondary }}
              >
                {selectedWorkflow.status === 'running' ? '일시정지' : '실행'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 모달들 */}
      {showCreateModal && <CreateWorkflowModal />}
      {showCodeCatalog && <CodeCatalogModal />}

      {/* 이미지 전체보기 모달 */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowImageModal(false)}>
          <div className="bg-white rounded-lg p-4 max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img src={modalImageSrc} alt="전체 이미지" className="max-h-[90vh] max-w-[95vw] w-auto rounded shadow-lg" />
            <button className="mt-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50" onClick={() => setShowImageModal(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowAutomation;