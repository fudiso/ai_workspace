import React, { useState } from 'react';
import { Search, Star, Download, Play, Eye, GitBranch, Clock, User, Tag, Filter, Grid, List, Code, Database, TrendingUp, Shield, BarChart3, PieChart, Calendar, FileText, Zap, BookOpen } from 'lucide-react';

const colors = {
  primary: 'rgb(39, 58, 146)',    // Woori WON Blue
  secondary: 'rgb(0, 174, 239)',   // Woori WON SkyBlue
  tertiary: 'rgb(10, 0, 72)',      // Woori WON Navy
  quaternary: 'rgb(0, 174, 239)',  // Woori WON SkyBlue (lighter variant)
  accent1: 'rgb(10, 0, 72)',       // Woori WON Navy (dark accent)
  accent2: 'rgb(132, 136, 139)',   // Keep as neutral gray
  accent3: 'rgb(39, 58, 146)'      // Woori WON Blue (alternate)
};

const CodeCatalog = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCode, setSelectedCode] = useState(null);

  const categories = [
    { id: 'all', name: '전체', icon: Grid, count: 32 },
    { id: 'portfolio', name: '포트폴리오', icon: PieChart, count: 8 },
    { id: 'risk', name: '리스크관리', icon: Shield, count: 10 },
    { id: 'performance', name: '성과분석', icon: TrendingUp, count: 5 },
    { id: 'market', name: '시장데이터', icon: BarChart3, count: 5 },
    { id: 'automation', name: '자동화', icon: Zap, count: 4 }
  ];

  const codeLibrary = [
    {
      id: 1,
      title: 'PI 자산 이슈 모니터링 시스템',
      description: 'PI 포트폴리오 자산의 신용등급 변화, 부정적 뉴스 자동 감지 및 알림',
      category: 'risk',
      author: '김운용',
      department: '리스크총괄부',
      tags: ['PI자산', '이슈모니터링', '신용등급'],
      lastUpdated: '2025-08-11',
      usage: 156,
      rating: 4.8,
      language: 'Python + SQL',
      runtime: '~15초',
      status: 'verified',
      complexity: 'intermediate'
    },
    {
      id: 2,
      title: 'ESG 등급 기반 종목 필터링 엔진',
      description: '설정된 ESG 기준에 따라 투자 유니버스에서 종목을 자동 선별하는 고급 알고리즘',
      category: 'portfolio',
      author: '박지속',
      department: '운용본부',
      tags: ['ESG', '필터링', '지속가능투자'],
      lastUpdated: '2024-12-18',
      usage: 89,
      rating: 4.9,
      language: 'Python',
      runtime: '~5초',
      status: 'verified',
      complexity: 'intermediate'
    },
    {
      id: 3,
      title: '멀티팩터 리스크 모델 백테스트',
      description: 'Fama-French 3팩터 모델 기반 포트폴리오 리스크 측정 및 백테스트 프레임워크',
      category: 'risk',
      author: '이리스크',
      department: '리스크관리팀',
      tags: ['백테스트', '팩터모델', 'VaR'],
      lastUpdated: '2024-12-15',
      usage: 67,
      rating: 4.7,
      language: 'Python',
      runtime: '~30초',
      status: 'verified',
      complexity: 'advanced'
    },
    {
      id: 4,
      title: '기업 재무제표 자동수집 API',
      description: '외부 데이터 제공업체 API를 통한 상장기업 재무데이터 자동 수집 및 정규화',
      category: 'market',
      author: '정데이터',
      department: '데이터팀',
      tags: ['API', '재무데이터', '자동수집'],
      lastUpdated: '2024-12-10',
      usage: 156,
      rating: 4.6,
      language: 'Python',
      runtime: '~10초',
      status: 'verified',
      complexity: 'intermediate'
    },
    {
      id: 5,
      title: '포트폴리오 성과 기여도 분해',
      description: 'Brinson 모델 기반 포트폴리오 성과를 자산배분, 종목선택, 상호작용 효과로 분해',
      category: 'performance',
      author: '강성과',
      department: '운용본부',
      tags: ['성과분석', 'Brinson', '기여도'],
      lastUpdated: '2024-12-08',
      usage: 93,
      rating: 4.8,
      language: 'Python',
      runtime: '~15초',
      status: 'verified',
      complexity: 'advanced'
    },
    {
      id: 6,
      title: '일일 리밸런싱 주문 자동생성',
      description: '목표 포트폴리오와 현재 보유 현황을 비교하여 최적 리밸런싱 주문을 자동 생성',
      category: 'automation',
      author: '조자동',
      department: '운용본부',
      tags: ['리밸런싱', '주문생성', '최적화'],
      lastUpdated: '2024-12-05',
      usage: 74,
      rating: 4.9,
      language: 'Python',
      runtime: '~8초',
      status: 'verified',
      complexity: 'advanced'
    },
    {
      id: 7,
      title: '실시간 포트폴리오 구성종목 조회',
      description: '펀드별 실시간 보유종목 및 비중 데이터를 Snowflake에서 추출하는 표준화된 쿼리',
      category: 'portfolio',
      author: '김운용',
      department: '운용본부',
      tags: ['실시간', '포트폴리오', 'SQL'],
      lastUpdated: '2024-12-20',
      usage: 142,
      rating: 4.8,
      language: 'Python + SQL',
      runtime: '~2초',
      status: 'verified',
      complexity: 'beginner'
    },
    {
      id: 8,
      title: '신용등급 변동 감지 알고리즘',
      description: '다중 신용평가사 등급 변화를 실시간 감지하고 리스크 임계값 계산',
      category: 'risk',
      author: '이리스크',
      department: '리스크관리팀',
      tags: ['신용등급', '실시간감지', '임계값'],
      lastUpdated: '2025-08-10',
      usage: 89,
      rating: 4.7,
      language: 'Python',
      runtime: '~3초',
      status: 'verified',
      complexity: 'advanced'
    },
    {
      id: 9,
      title: '고객 세그먼트 분석 엔진',
      description: '고객의 신용등급, 소비패턴, 연령대별 세분화 및 상품 추천 로직',
      category: 'market',
      author: '박마케팅',
      department: '상품마케팅팀',
      tags: ['고객세분화', '상품추천', '마케팅'],
      lastUpdated: '2025-08-09',
      usage: 123,
      rating: 4.6,
      language: 'Python',
      runtime: '~12초',
      status: 'verified',
      complexity: 'intermediate'
    },
    {
      id: 10,
      title: '해외결제 패턴 분석',
      description: '카드 해외결제 데이터의 국가별, 업종별 트렌드 및 환율 민감도 분석',
      category: 'market',
      author: '정데이터',
      department: '데이터팀',
      tags: ['해외결제', '환율분석', '소비트렌드'],
      lastUpdated: '2025-08-08',
      usage: 67,
      rating: 4.5,
      language: 'Python + SQL',
      runtime: '~8초',
      status: 'verified',
      complexity: 'beginner'
    },
    {
      id: 11,
      title: '포트폴리오 리스크 시나리오 분석',
      description: '시장 급변 시 포트폴리오 듀레이션 기반 리스크 측정 및 예상 손실률 계산',
      category: 'risk',
      author: '최리스크',
      department: '리스크관리팀',
      tags: ['시나리오분석', '듀레이션', '손실률'],
      lastUpdated: '2025-08-07',
      usage: 45,
      rating: 4.9,
      language: 'Python',
      runtime: '~5초',
      status: 'verified',
      complexity: 'advanced'
    },
    {
      id: 12,
      title: '보험상품 콘텐츠 자동 등록',
      description: '유튜브 영상 메타데이터 추출 및 AI 챗봇용 FAQ 자동 생성',
      category: 'automation',
      author: '이콘텐츠',
      department: '상품기획팀',
      tags: ['콘텐츠등록', '메타데이터', 'AI챗봇'],
      lastUpdated: '2025-08-06',
      usage: 34,
      rating: 4.4,
      language: 'Python',
      runtime: '~20초',
      status: 'verified',
      complexity: 'intermediate'
    },
    {
      id: 13,
      title: '뉴스 감성분석 엔진',
      description: 'PI 자산 관련 뉴스 텍스트의 감성분석 및 리스크 점수 산출',
      category: 'risk',
      author: '김텍스트',
      department: '데이터팀',
      tags: ['감성분석', '뉴스분석', '텍스트마이닝'],
      lastUpdated: '2025-08-05',
      usage: 78,
      rating: 4.6,
      language: 'Python',
      runtime: '~6초',
      status: 'verified',
      complexity: 'intermediate'
    },
    {
      id: 14,
      title: 'Teams 알림 자동발송 시스템',
      description: '임계값 초과 시 관련 부서 Teams 채널로 자동 알림 및 담당자 배정',
      category: 'automation',
      author: '박알림',
      department: 'IT팀',
      tags: ['Teams연동', '자동알림', '업무배정'],
      lastUpdated: '2025-08-04',
      usage: 92,
      rating: 4.7,
      language: 'Python',
      runtime: '~2초',
      status: 'verified',
      complexity: 'beginner'
    },
    {
      id: 15,
      title: '실시간 시장데이터 스트리밍',
      description: '한국거래소, 블룸버그 API 연동 실시간 시장지수 및 환율 데이터 수집',
      category: 'market',
      author: '강시장',
      department: '데이터팀',
      tags: ['실시간데이터', 'API연동', '시장지수'],
      lastUpdated: '2025-08-03',
      usage: 156,
      rating: 4.8,
      language: 'Python',
      runtime: '~1초',
      status: 'verified',
      complexity: 'advanced'
    },
    {
      id: 16,
      title: '재무지표 이상치 탐지',
      description: 'PI 자산 기업의 재무비율 급변 감지 및 동종업계 벤치마킹',
      category: 'risk',
      author: '이재무',
      department: '투자금융부',
      tags: ['이상치탐지', '재무분석', '벤치마킹'],
      lastUpdated: '2025-08-02',
      usage: 67,
      rating: 4.5,
      language: 'Python + SQL',
      runtime: '~10초',
      status: 'verified',
      complexity: 'intermediate'
    },
    {
      id: 17,
      title: '워크플로우 실행결과 리포팅',
      description: '자동화 워크플로우 실행 결과를 Excel 형태로 가공 및 이메일 발송',
      category: 'automation',
      author: '조리포트',
      department: 'IT팀',
      tags: ['리포팅', 'Excel생성', '이메일발송'],
      lastUpdated: '2025-08-01',
      usage: 45,
      rating: 4.3,
      language: 'Python',
      runtime: '~7초',
      status: 'verified',
      complexity: 'beginner'
    }
  ];

  const filteredCodes = codeLibrary.filter(code => {
    const matchesCategory = selectedCategory === 'all' || code.category === selectedCategory;
    const matchesSearch = code.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getComplexityColor = (complexity) => {
    switch(complexity) {
      case 'beginner': return {backgroundColor: 'rgba(174, 99, 78, 0.1)', color: 'rgb(174, 99, 78)'};
      case 'intermediate': return {backgroundColor: 'rgba(245, 130, 32, 0.1)', color: 'rgb(245, 130, 32)'};
      case 'advanced': return {backgroundColor: 'rgba(4, 59, 114, 0.1)', color: 'rgb(4, 59, 114)'};
      default: return {backgroundColor: 'rgba(132, 136, 139, 0.1)', color: 'rgb(132, 136, 139)'};
    }
  };

  const getComplexityText = (complexity) => {
    switch(complexity) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return '미정';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white p-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Code className="w-8 h-8" style={{ color: colors.tertiary }} />
                <h1 className="text-2xl font-bold text-white">코드 카탈로그</h1>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.tertiary + '20', color: colors.tertiary }}>
                AI WorkSpace
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2" style={{ backgroundColor: colors.secondary }}>
                <GitBranch className="w-4 h-4" />
                <span>새 코드 등록</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="코드 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                  style={{ '--tw-ring-color': colors.tertiary }}
                  onFocus={(e) => e.target.style.setProperty('--tw-ring-color', colors.tertiary)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                카테고리
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'border' : 'hover:bg-gray-50'
                      }`}
                      style={selectedCategory === category.id ? {
                        backgroundColor: colors.tertiary + '20',
                        color: colors.primary,
                        borderColor: colors.tertiary + '40'
                      } : {}}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" style={{ color: colors.tertiary }} />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">총 코드</span>
                  <span className="font-semibold">32개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">이번 주 신규</span>
                  <span className="font-semibold" style={{ color: colors.accent1 }}>+3개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">평균 활용도</span>
                  <span className="font-semibold" style={{ color: colors.secondary }}>87%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredCodes.length}개의 코드를 찾았습니다
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">정렬:</span>
                    <select className="border border-gray-200 rounded px-3 py-1 text-sm">
                      <option>최신순</option>
                      <option>인기순</option>
                      <option>평점순</option>
                      <option>사용빈도순</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'text-white' : 'text-gray-400'}`}
                    style={viewMode === 'grid' ? { backgroundColor: colors.secondary } : {}}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'text-white' : 'text-gray-400'}`}
                    style={viewMode === 'list' ? { backgroundColor: colors.secondary } : {}}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Code Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
              {filteredCodes.map((code) => (
                <div
                  key={code.id}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 hover:scale-105"
                  style={{ borderLeftColor: colors.secondary }}
                  onClick={() => setSelectedCode(code)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{code.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{code.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {code.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-4">
                      <Star className="w-4 h-4 fill-current" style={{ color: colors.secondary }} />
                      <span className="text-sm font-medium">{code.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{code.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{code.runtime}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs`} style={getComplexityColor(code.complexity)}>
                      {getComplexityText(code.complexity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Database className="w-4 h-4" />
                      <span>{code.language}</span>
                      <span>•</span>
                      <span>{code.usage}회 사용</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Play className="w-4 h-4" style={{ color: colors.tertiary }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code Detail Modal */}
      {selectedCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b" style={{ backgroundColor: colors.primary + '10' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedCode.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedCode.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>작성자: {selectedCode.author} ({selectedCode.department})</span>
                    <span>•</span>
                    <span>마지막 업데이트: {selectedCode.lastUpdated}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCode(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">기술 정보</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">언어</span>
                        <span className="text-sm font-medium">{selectedCode.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">실행시간</span>
                        <span className="text-sm font-medium">{selectedCode.runtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">난이도</span>
                        <span className={`text-sm px-2 py-1 rounded-full`} style={getComplexityColor(selectedCode.complexity)}>
                          {getComplexityText(selectedCode.complexity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">사용 통계</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">사용 횟수</span>
                        <span className="text-sm font-medium">{selectedCode.usage}회</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">평점</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current" style={{ color: colors.secondary }} />
                          <span className="text-sm font-medium">{selectedCode.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">코드 미리보기</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`# ${selectedCode.title}
# 작성자: ${selectedCode.author}
# 설명: ${selectedCode.description}

import pandas as pd
import numpy as np
from datetime import datetime

def get_portfolio_composition(fund_code: str, as_of_date: str = None):
    """
    포트폴리오 구성종목 조회 함수
    """
    if as_of_date is None:
        as_of_date = datetime.now().strftime('%Y-%m-%d')
    
    query = f"""
    SELECT 
        stock_code,
        stock_name,
        weight,
        market_value,
        sector
    FROM portfolio_holdings 
    WHERE fund_code = '{fund_code}' 
    AND as_of_date = '{as_of_date}'
    ORDER BY weight DESC
    """
    
    return pd.read_sql(query, conn)

# 사용 예시
result = get_portfolio_composition('GF001', '2024-12-20')
print(result.head())`}</pre>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center" style={{ color: colors.primary }}>
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  문서 보기
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center" style={{ color: colors.primary }}>
                  <Download className="w-4 h-4 inline mr-2" />
                  다운로드
                </button>
                <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center" style={{ backgroundColor: colors.secondary }}>
                  <Play className="w-4 h-4 inline mr-2" />
                  실행 환경에서 열기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeCatalog;