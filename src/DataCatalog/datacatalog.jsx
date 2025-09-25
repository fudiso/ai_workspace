import React, { useState } from 'react';
import { Search, Database, Code, Download, Eye, Filter, Tag, Clock, Users, ArrowRight, BarChart3, TrendingUp, FileText, Globe } from 'lucide-react';

const DataCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedData, setSelectedData] = useState(null);

  const colors = {
    primary: 'rgb(39, 58, 146)',    // Woori WON Blue
    secondary: 'rgb(0, 174, 239)',   // Woori WON SkyBlue
    tertiary: 'rgb(10, 0, 72)',      // Woori WON Navy
    quaternary: 'rgb(0, 174, 239)',  // Woori WON SkyBlue (lighter variant)
    accent1: 'rgb(10, 0, 72)',       // Woori WON Navy (dark accent)
    accent2: 'rgb(132, 136, 139)',   // Keep as neutral gray
    accent3: 'rgb(39, 58, 146)'      // Woori WON Blue (alternate)
  };

  const categories = [
    { id: 'all', name: '전체', count: 25 },
    { id: 'customer', name: '고객분석', count: 6 },
    { id: 'product', name: '상품현황', count: 4 },
    { id: 'consumption', name: '소비행태', count: 5 },
    { id: 'risk', name: '리스크관리', count: 3 },
    { id: 'pi_assets', name: 'PI자산', count: 4 },
    { id: 'market', name: '시장데이터', count: 3 }
  ];

  const dataItems = [
    {
      id: 1,
      title: "PI 자산 포트폴리오 통합 데이터",
      description: "우리은행 PI(자기자본투자) 자산 포트폴리오의 종목별, 섹터별 구성현황 및 리스크 지표",
      category: "pi_assets",
      source: "우리은행 투자금융부",
      updateFreq: "일일",
      records: "2.5K",
      methodology: "포트폴리오 밸류에이션, 리스크 측정, 신용등급 매핑",
      tags: ["PI자산", "포트폴리오", "투자"],
      icon: <TrendingUp className="w-5 h-5" />,
      lastUpdated: "2025-08-11 08:30",
      relatedCodes: ["pi_portfolio_analysis.py", "asset_risk_monitoring.py", "credit_rating_tracker.py"],
      quality: 96,
      governance: "투자정보 보안등급 적용, 내부용 데이터"
    },
    {
      id: 2,
      title: "신용평가사 등급 정보 통합 DB",
      description: "한신평, 나이스평가정보, S&P 등 주요 신용평가사의 기업 신용등급 변화 추이",
      category: "pi_assets",
      source: "한신평, 나이스평가정보, S&P, 무디스",
      updateFreq: "일일",
      records: "850K",
      methodology: "등급변화 감지 알고리즘, 다중평가사 점수 통합, 등급 히스토리 관리",
      tags: ["신용등급", "평가사", "등급변화"],
      icon: <BarChart3 className="w-5 h-5" />,
      lastUpdated: "2025-08-11 07:15",
      relatedCodes: ["credit_rating_monitor.py", "rating_change_alert.py", "multi_agency_analysis.py"],
      quality: 98,
      governance: "신용평가사 라이선스 계약 준수"
    },
    {
      id: 3,
      title: "PI 자산 뉴스 및 공시 정보",
      description: "PI 포트폴리오 보유 종목의 실시간 뉴스, 공시, ESG 이슈 텍스트 데이터",
      category: "pi_assets",
      source: "네이버뉴스, 다트, 블룸버그, ESG 전문기관",
      updateFreq: "실시간",
      records: "1.2M",
      methodology: "뉴스 크롤링, 감성분석, 키워드 추출, 공시 자동분류",
      tags: ["뉴스분석", "공시정보", "ESG"],
      icon: <FileText className="w-5 h-5" />,
      lastUpdated: "2025-08-11 12:45",
      relatedCodes: ["news_sentiment_analysis.py", "dart_disclosure_parser.py", "esg_issue_tracker.py"],
      quality: 92,
      governance: "저작권 준수, 개인정보 제거"
    },
    {
      id: 4,
      title: "카드 해외결제 트렌드 분석",
      description: "우리카드 고객의 국가별, 업종별, 시점별 해외결제 패턴 및 환율 민감도 분석",
      category: "consumption",
      source: "우리카드",
      updateFreq: "일일",
      records: "15.8M",
      methodology: "지역별 소비패턴 클러스터링, 환율영향도 분석, 계절성 모델링",
      tags: ["해외결제", "환율민감도", "여행패턴"],
      icon: <Globe className="w-5 h-5" />,
      lastUpdated: "2025-08-11 10:30",
      relatedCodes: ["overseas_spending.py", "fx_sensitivity.py", "travel_pattern.py"],
      quality: 98,
      governance: "가맹점별 개인식별정보 마스킹, 통계분석용 집계 데이터"
    },
    {
      id: 5,
      title: "국내 카드소비 트렌드 Big Data",
      description: "업종별, 지역별, 연령대별 카드소비 트렌드 및 경제지표와의 상관관계 분석",
      category: "consumption",
      source: "우리카드",
      updateFreq: "일일",
      records: "180M",
      methodology: "업종분류체계 표준화, 지역별 소비지수 산출, 거시경제 영향도 분석",
      tags: ["소비트렌드", "업종분석", "경제지표"],
      icon: <BarChart3 className="w-5 h-5" />,
      lastUpdated: "2025-08-11 11:45",
      relatedCodes: ["consumption_trend.py", "sector_analysis.py", "economic_correlation.py"],
      quality: 95,
      governance: "개인 거래내역 비식별화, 업종별 집계 통계 제공"
    },
    {
      id: 6,
      title: "그룹 디지털 채널 이용 행태",
      description: "모바일뱅킹, HTS, 카드앱, 보험앱 등 그룹사 디지털 채널의 통합 이용패턴 분석",
      category: "consumption",
      source: "우리은행, 우리투자증권, 우리카드, 동양/ABL생명",
      updateFreq: "실시간",
      records: "95M",
      methodology: "디지털 터치포인트 매핑, 채널별 전환율 분석, UX 개선점 도출",
      tags: ["디지털채널", "앱이용", "채널전환"],
      icon: <Database className="w-5 h-5" />,
      lastUpdated: "2025-08-11 12:00",
      relatedCodes: ["digital_behavior.py", "channel_analytics.py", "ux_optimization.py"],
      quality: 93,
      governance: "앱 이용로그 익명화, 개인식별정보 제거"
    },
    {
      id: 7,
      title: "그룹 신용위험 통합 모니터링",
      description: "그룹 전체 고객의 신용등급, 연체율, 부실징후 통합 모니터링 대시보드",
      category: "risk",
      source: "우리은행, 우리카드",
      updateFreq: "일일",
      records: "6.8M",
      methodology: "그룹통합 신용평점 모델, Early Warning System, 포트폴리오 리스크 측정",
      tags: ["신용위험", "연체예측", "통합모니터링"],
      icon: <FileText className="w-5 h-5" />,
      lastUpdated: "2025-08-11 08:30",
      relatedCodes: ["credit_risk_modeling.py", "delinquency_prediction.py", "portfolio_risk.py"],
      quality: 97,
      governance: "신용정보법 준수, 그룹 내부 공유 승인"
    },
    {
      id: 8,
      title: "연금/보험 가입자 라이프스테이지 분석",
      description: "생명보험 가입자의 생애주기별 보험니즈 변화 및 추가 보장상품 수요 예측",
      category: "product",
      source: "동양/ABL생명",
      updateFreq: "월간",
      records: "3.2M",
      methodology: "라이프스테이지 세분화, 보험니즈 예측모델, 상품추천 알고리즘",
      tags: ["라이프스테이지", "보험니즈", "상품추천"],
      icon: <TrendingUp className="w-5 h-5" />,
      lastUpdated: "2025-08-01 16:00",
      relatedCodes: ["lifecycle_analysis.py", "insurance_needs.py", "product_recommendation.py"],
      quality: 91,
      governance: "보험업법 준수, 계약자 동의 기반 활용"
    },
    {
      id: 9,
      title: "그룹 부동산 담보대출 포트폴리오",
      description: "은행 주택담보대출의 지역별, 가격대별 분포 및 부동산 시장과의 연관성 분석",
      category: "risk",
      source: "우리은행",
      updateFreq: "주간",
      records: "890K",
      methodology: "담보가치 평가모델, 지역별 리스크 산출, 시장충격 시나리오 분석",
      tags: ["담보대출", "부동산리스크", "포트폴리오"],
      icon: <BarChart3 className="w-5 h-5" />,
      lastUpdated: "2025-08-05 14:20",
      relatedCodes: ["mortgage_analysis.py", "property_risk.py", "scenario_testing.py"],
      quality: 94,
      governance: "개인정보 마스킹, 통계분석 목적 활용"
    },
    {
      id: 10,
      title: "그룹 통합 고객 360도 프로파일",
      description: "은행·증권·카드·생명보험 전 계열사 거래 고객의 비식별화된 통합 프로파일 및 생애가치 분석",
      category: "customer",
      source: "우리은행, 우리투자증권, 우리카드, 동양/ABL생명",
      updateFreq: "일일",
      records: "8.2M",
      methodology: "k-익명성 적용 비식별화, 그룹사별 고객 매칭 알고리즘, CLV 모델링",
      tags: ["통합고객", "생애가치", "비식별화"],
      icon: <Users className="w-5 h-5" />,
      lastUpdated: "2025-08-11 09:00",
      relatedCodes: ["customer_360_analysis.py", "clv_modeling.py", "cross_sell_opportunity.py"],
      quality: 96,
      governance: "개인정보보호법 준수, 금융위 가이드라인 적용"
    },
    {
      id: 11,
      title: "그룹사별 VIP 고객 행동 분석",
      description: "자산 1억원 이상 우수고객의 그룹사 간 이동패턴, 상품선호도, 충성도 분석",
      category: "customer",
      source: "우리은행, 우리투자증권, 우리카드, 동양/ABL생명",
      updateFreq: "주간",
      records: "450K",
      methodology: "RFM 모델 기반 고객세분화, 이탈예측 모델, 상품추천 알고리즘",
      tags: ["VIP고객", "이동패턴", "충성도"],
      icon: <TrendingUp className="w-5 h-5" />,
      lastUpdated: "2025-08-07 15:30",
      relatedCodes: ["vip_migration_analysis.py", "loyalty_scoring.py", "churn_prediction.py"],
      quality: 94,
      governance: "자산등급별 마스킹, 고객동의 기반 활용"
    },
    {
      id: 12,
      title: "상품 해지/해약 고객 행동 인사이트",
      description: "예금, 적금, 보험, 펀드 등 주요 상품 해지고객의 해지 전후 행동패턴 및 대안상품 선택 분석",
      category: "product",
      source: "우리은행, 우리투자증권, 동양/ABL생명",
      updateFreq: "일일",
      records: "2.1M",
      methodology: "해지사유 텍스트 마이닝, 고객여정 분석, 대안상품 연관성 분석",
      tags: ["해지분석", "고객여정", "상품전환"],
      icon: <BarChart3 className="w-5 h-5" />,
      lastUpdated: "2025-08-11 08:15",
      relatedCodes: ["churn_analysis.py", "product_migration.py", "retention_strategy.py"],
      quality: 92,
      governance: "해지사유 개인정보 제거, 통계적 분석용 데이터"
    },
    {
      id: 13,
      title: "PI 자산 재무지표 Time Series",
      description: "PI 포트폴리오 보유기업의 과거 5년간 재무비율, 성장성, 수익성 지표 시계열 데이터",
      category: "pi_assets",
      source: "KIS Value, FnGuide, 자체 산출",
      updateFreq: "분기",
      records: "125K",
      methodology: "재무비율 표준화, 이상치 탐지, 동종업계 벤치마킹",
      tags: ["재무지표", "시계열", "벤치마킹"],
      icon: <TrendingUp className="w-5 h-5" />,
      lastUpdated: "2025-08-01 16:30",
      relatedCodes: ["financial_ratio_analysis.py", "peer_benchmarking.py", "trend_analysis.py"],
      quality: 95,
      governance: "재무정보 공개원칙 준수"
    },
    {
      id: 14,
      title: "시장 지수 및 환율 실시간 데이터",
      description: "KOSPI, KOSDAQ, 주요 해외지수, 환율 등 시장 지표의 실시간 및 과거 데이터",
      category: "market",
      source: "한국거래소, 블룸버그, 로이터",
      updateFreq: "실시간",
      records: "50M",
      methodology: "API 연동, 데이터 정합성 검증, 지연시간 최소화",
      tags: ["시장지수", "환율", "실시간"],
      icon: <Globe className="w-5 h-5" />,
      lastUpdated: "2025-08-11 15:30",
      relatedCodes: ["market_data_stream.py", "fx_rate_monitor.py", "index_correlation.py"],
      quality: 99,
      governance: "거래소 데이터 이용약관 준수"
    },
    {
      id: 15,
      title: "보험상품 계약자 라이프사이클 데이터",
      description: "동양/ABL생명 보험계약자의 생애주기별 보험가입 패턴 및 해지 예측 모델 데이터",
      category: "product",
      source: "동양/ABL생명",
      updateFreq: "월간",
      records: "4.8M",
      methodology: "생애주기 세분화, 계약유지율 분석, 해지예측 모델링",
      tags: ["보험계약", "라이프사이클", "해지예측"],
      icon: <Users className="w-5 h-5" />,
      lastUpdated: "2025-08-01 10:00",
      relatedCodes: ["lifecycle_modeling.py", "churn_prediction.py", "retention_analysis.py"],
      quality: 93,
      governance: "보험업법 및 개인정보보호법 준수"
    }
  ];

  const filteredData = selectedCategory === 'all' 
    ? dataItems 
    : dataItems.filter(item => item.category === selectedCategory);

  const DataCard = ({ data }) => (
    <div 
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 hover:scale-105"
      style={{ borderLeftColor: colors.secondary }}
      onClick={() => setSelectedData(data)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: colors.tertiary + '20', color: colors.tertiary }}
            >
              {data.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{data.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{data.description}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span 
              className="px-2 py-1 text-xs rounded-full text-white"
              style={{ backgroundColor: colors.quaternary }}
            >
              {data.updateFreq}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Database className="w-4 h-4 mr-2" />
            <span>{data.records} records</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{data.lastUpdated}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs rounded-full text-white"
              style={{ backgroundColor: colors.accent2 }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Data Quality:</span>
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    width: `${data.quality}%`, 
                    backgroundColor: data.quality >= 95 ? colors.secondary : colors.tertiary 
                  }}
                ></div>
              </div>
              <span className="font-semibold">{data.quality}%</span>
            </div>
          </div>
          <button 
            className="flex items-center text-sm font-medium text-white px-3 py-1 rounded-md hover:opacity-80 transition-opacity"
            style={{ backgroundColor: colors.primary }}
          >
            상세보기 <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const DetailModal = ({ data, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div 
          className="p-6 border-b"
          style={{ backgroundColor: colors.primary + '10' }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: colors.tertiary + '20', color: colors.tertiary }}
              >
                {data.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>
                <p className="text-gray-600 mt-1">{data.description}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-lg mb-3" style={{ color: colors.primary }}>
                데이터 정보
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">데이터 소스:</span>
                  <span className="font-medium text-sm">{data.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">업데이트 주기:</span>
                  <span className="font-medium">{data.updateFreq}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">총 레코드 수:</span>
                  <span className="font-medium">{data.records}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">마지막 업데이트:</span>
                  <span className="font-medium">{data.lastUpdated}</span>
                </div>
                {data.governance && (
                  <div className="pt-2 border-t">
                    <span className="text-gray-600 block mb-1">데이터 거버너스:</span>
                    <span className="text-sm text-gray-700">{data.governance}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3" style={{ color: colors.primary }}>
                처리 방법론
              </h3>
              <p className="text-gray-700 leading-relaxed">{data.methodology}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3" style={{ color: colors.primary }}>
              관련 코드 카탈로그
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.relatedCodes.map((code, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  style={{ borderColor: colors.tertiary + '40' }}
                >
                  <div className="flex items-center space-x-3">
                    <Code className="w-4 h-4" style={{ color: colors.tertiary }} />
                    <span className="font-medium">{code}</span>
                  </div>
                  <button 
                    className="text-xs px-2 py-1 rounded text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    실행
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button 
              className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: colors.accent2, color: colors.accent2 }}
            >
              <Eye className="w-4 h-4 mr-2" />
              데이터 미리보기
            </button>
            <button 
              className="flex items-center px-4 py-2 rounded-lg text-white hover:opacity-80 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              <Download className="w-4 h-4 mr-2" />
              샘플 다운로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="text-white p-6"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">데이터 카탈로그</h1>
          <p className="text-blue-100">데이터 자산을 체계적으로 활용</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="데이터셋 검색 (예: 재무제표, ESG, 주가 등)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              필터
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'text-white'
                  : 'text-gray-600 bg-white hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? colors.secondary : undefined
              }}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 데이터셋</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>25</p>
              </div>
              <Database className="w-8 h-8" style={{ color: colors.secondary }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">그룹 고객수</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>8.2M</p>
              </div>
              <Users className="w-8 h-8" style={{ color: colors.tertiary }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">일일 분석 건수</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>3,847</p>
              </div>
              <BarChart3 className="w-8 h-8" style={{ color: colors.quaternary }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">데이터 품질점수</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>94%</p>
              </div>
              <TrendingUp className="w-8 h-8" style={{ color: colors.accent1 }} />
            </div>
          </div>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredData.map((data) => (
            <DataCard key={data.id} data={data} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedData && (
        <DetailModal 
          data={selectedData} 
          onClose={() => setSelectedData(null)} 
        />
      )}
    </div>
  );
};

export default DataCatalog;