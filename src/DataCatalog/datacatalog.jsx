import React, { useState } from 'react';
import { Search, Database, Code, Download, Eye, Filter, Tag, Clock, Users, ArrowRight, BarChart3, TrendingUp, FileText, Globe } from 'lucide-react';

const DataCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedData, setSelectedData] = useState(null);

  const colors = {
    primary: 'rgb(4, 59, 114)',
    secondary: 'rgb(245, 130, 32)',
    tertiary: 'rgb(0, 169, 206)',
    quaternary: 'rgb(240, 178, 107)',
    accent1: 'rgb(174, 99, 78)',
    accent2: 'rgb(132, 136, 139)',
    accent3: 'rgb(0, 134, 184)'
  };

  const categories = [
    { id: 'all', name: '전체', count: 24 },
    { id: 'financial', name: '재무데이터', count: 8 },
    { id: 'market', name: '시장데이터', count: 6 },
    { id: 'portfolio', name: '포트폴리오', count: 5 },
    { id: 'risk', name: '리스크', count: 3 },
    { id: 'esg', name: 'ESG/지속가능', count: 2 }
  ];

  const dataItems = [
    {
      id: 1,
      title: "글로벌 기업 표준화 재무제표",
      description: "S&P 500, KOSPI 200 등 주요 지수 구성종목의 연결재무제표 표준화 데이터",
      category: "financial",
      source: "Bloomberg Terminal, DART, SEC EDGAR",
      updateFreq: "일일",
      records: "12.5M",
      methodology: "IFRS/GAAP 표준화 변환 후 시계열 정합성 검증",
      tags: ["재무제표", "표준화", "글로벌"],
      icon: <BarChart3 className="w-5 h-5" />,
      lastUpdated: "2025-06-25 09:00",
      relatedCodes: ["financial_ratio_analysis.py", "peer_comparison.py"],
      quality: 95
    },
    {
      id: 2,
      title: "실시간 주식/채권 가격 피드",
      description: "전 세계 주요 거래소의 실시간 가격, 거래량, 호가 정보",
      category: "market",
      source: "Reuters Eikon, Bloomberg API, KRX DataHub",
      updateFreq: "실시간",
      records: "2.8B",
      methodology: "거래시간 기준 품질검증, 이상치 필터링 적용",
      tags: ["실시간", "가격데이터", "거래량"],
      icon: <TrendingUp className="w-5 h-5" />,
      lastUpdated: "2025-06-25 14:32",
      relatedCodes: ["price_analysis.py", "volatility_calc.py"],
      quality: 98
    },
    {
      id: 3,
      title: "대체투자 성과분석 데이터셋",
      description: "헤지펀드, 사모펀드, 부동산펀드 등 대체투자 상품의 성과 및 위험지표",
      category: "portfolio",
      source: "HFR Database, Preqin, 내부 투자데이터",
      updateFreq: "월간",
      records: "450K",
      methodology: "벤치마크 대비 성과 분석, 리스크 조정 수익률 계산",
      tags: ["대체투자", "성과분석", "위험지표"],
      icon: <Database className="w-5 h-5" />,
      lastUpdated: "2025-06-20 16:00",
      relatedCodes: ["alternative_analysis.py", "performance_attribution.py"],
      quality: 92
    },
    {
      id: 4,
      title: "ESG 평가 및 지속가능성 지표",
      description: "MSCI, Sustainalytics, 국내 ESG 평가기관의 종합 ESG 점수 및 세부 지표",
      category: "esg",
      source: "MSCI ESG, Sustainalytics, KCGS",
      updateFreq: "분기",
      records: "85K",
      methodology: "다중 평가기관 점수 가중평균, 섹터별 표준화",
      tags: ["ESG", "지속가능성", "평가점수"],
      icon: <Globe className="w-5 h-5" />,
      lastUpdated: "2025-06-15 10:00",
      relatedCodes: ["esg_screening.py", "sustainability_score.py"],
      quality: 88
    },
    {
      id: 5,
      title: "거시경제 및 금리 시나리오",
      description: "주요국 중앙은행 정책금리, GDP, 인플레이션 전망 및 시나리오 분석",
      category: "market",
      source: "IMF, OECD, 한국은행, Fed Economic Data",
      updateFreq: "주간",
      records: "125K",
      methodology: "계절조정, 전망치 vs 실제치 추적분석",
      tags: ["거시경제", "금리", "시나리오"],
      icon: <BarChart3 className="w-5 h-5" />,
      lastUpdated: "2025-06-24 15:30",
      relatedCodes: ["macro_analysis.py", "scenario_modeling.py"],
      quality: 94
    },
    {
      id: 6,
      title: "신용평가 및 부도확률 모델링",
      description: "기업 신용등급, PD(부도확률), LGD(손실률) 모델링 데이터",
      category: "risk",
      source: "Moody's, S&P, Fitch, 내부 신용평가 모델",
      updateFreq: "일일",
      records: "890K",
      methodology: "Merton 모델 기반 PD 추정, 역사적 부도율 캘리브레이션",
      tags: ["신용위험", "부도확률", "등급"],
      icon: <FileText className="w-5 h-5" />,
      lastUpdated: "2025-06-25 08:45",
      relatedCodes: ["credit_risk.py", "pd_modeling.py"],
      quality: 91
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
                  <span className="font-medium">{data.source}</span>
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
          <h1 className="text-3xl font-bold mb-2">AI WorkSpace - Data Catalog</h1>
          <p className="text-blue-100">전사 데이터 자산을 체계적으로 관리하고 활용하세요</p>
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
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>24</p>
              </div>
              <Database className="w-8 h-8" style={{ color: colors.secondary }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 사용자</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>156</p>
              </div>
              <Users className="w-8 h-8" style={{ color: colors.tertiary }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">일일 쿼리</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>1,247</p>
              </div>
              <BarChart3 className="w-8 h-8" style={{ color: colors.quaternary }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 품질점수</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>93%</p>
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