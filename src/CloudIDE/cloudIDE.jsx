import React, { useState, useRef, useEffect } from 'react';
import { Play, Save, Download, Upload, FileText, Database, Bot, Terminal, Code, BarChart3, Table, Settings, Folder, Plus, X, ChevronRight, ChevronDown, Send, Copy, Maximize2, Minimize2 } from 'lucide-react';

const colors = {
  primary: 'rgb(39, 58, 146)',    // Woori WON Blue
  secondary: 'rgb(0, 174, 239)',   // Woori WON SkyBlue
  tertiary: 'rgb(10, 0, 72)',      // Woori WON Navy
  quaternary: 'rgb(0, 174, 239)',  // Woori WON SkyBlue (lighter variant)
  accent1: 'rgb(10, 0, 72)',       // Woori WON Navy (dark accent)
  accent2: 'rgb(132, 136, 139)',   // Keep as neutral gray
  accent3: 'rgb(39, 58, 146)'      // Woori WON Blue (alternate)
};

const CloudIDE = () => {
  const [activeTab, setActiveTab] = useState('notebook1.py');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState('console');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [codeContent, setCodeContent] = useState(`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime

# 샘플 데이터 생성
dates = pd.date_range('2024-01-01', periods=100, freq='D')
prices = np.random.randn(100).cumsum() + 100

df = pd.DataFrame({
    'date': dates,
    'price': prices,
    'volume': np.random.randint(1000, 10000, 100)
})

print("데이터 로딩 완료")
df.head()`);
  
  const [consoleOutput, setConsoleOutput] = useState([
    { type: 'output', content: '데이터 로딩 완료' },
    { type: 'table', content: 'DataFrame with 100 rows and 3 columns' },
    { type: 'info', content: 'Python 3.9.7 | Snowflake connector ready' }
  ]);

  const [aiHistory, setAiHistory] = useState([
    { role: 'assistant', content: '안녕하세요! AI Code Assistant입니다. 코드 작성, 디버깅, 데이터 분석을 도와드릴 수 있습니다.' }
  ]);

  const [files] = useState([
    { name: 'notebook1.py', type: 'python', active: true },
    { name: 'data_analysis.py', type: 'python' },
    { name: 'portfolio_backtest.py', type: 'python' },
    { name: 'query.sql', type: 'sql' }
  ]);

  const [folderStructure] = useState([
    {
      name: 'projects',
      expanded: true,
      children: [
        { name: 'portfolio_analysis', type: 'folder', expanded: true, children: [
          { name: 'backtest.py', type: 'file' },
          { name: 'risk_analysis.py', type: 'file' }
        ]},
        { name: 'market_data', type: 'folder', children: [
          { name: 'fetcher.py', type: 'file' },
          { name: 'cleaner.py', type: 'file' }
        ]}
      ]
    },
    {
      name: 'shared_libraries',
      expanded: false,
      children: [
        { name: 'financial_utils.py', type: 'file' },
        { name: 'db_connector.py', type: 'file' }
      ]
    }
  ]);

  const executeCode = () => {
    setConsoleOutput(prev => [
      ...prev,
      { type: 'command', content: '>>> 코드 실행 중...' },
      { type: 'output', content: '데이터 로딩 완료' },
      { type: 'table', content: '       date      price    volume\n0  2024-01-01   99.50     3421\n1  2024-01-02  101.23     5670\n2  2024-01-03   98.77     4321\n3  2024-01-04  102.45     6789\n4  2024-01-05   99.88     2345' }
    ]);
  };

  const sendAiMessage = () => {
    if (aiMessage.trim()) {
      setAiHistory(prev => [
        ...prev,
        { role: 'user', content: aiMessage },
        { role: 'assistant', content: '코드를 분석했습니다. 다음과 같이 개선할 수 있습니다:\n\n```python\n# 데이터 시각화 추가\nplt.figure(figsize=(12, 6))\nplt.plot(df["date"], df["price"])\nplt.title("Price Trend Analysis")\nplt.show()\n```\n\n이 코드를 추가하면 가격 추이를 시각화할 수 있습니다.' }
      ]);
      setAiMessage('');
    }
  };

  const FileTreeItem = ({ item, level = 0 }) => {
    const [expanded, setExpanded] = useState(item.expanded || false);
    
    return (
      <div>
        <div 
          className="flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm"
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => item.children && setExpanded(!expanded)}
        >
          {item.children && (
            expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          )}
          {item.type === 'folder' ? <Folder size={14} className="mr-2" /> : <FileText size={14} className="mr-2" />}
          <span>{item.name}</span>
        </div>
        {item.children && expanded && (
          <div>
            {item.children.map((child, index) => (
              <FileTreeItem key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 text-white shadow-md"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="flex items-center space-x-4">
          <Code size={24} />
          <h1 className="text-xl font-bold">AI WorkSpace - Cloud IDE</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
            <Settings size={18} />
          </button>
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">김</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-12' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300`}>
          {!sidebarCollapsed && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">프로젝트 탐색기</h3>
                <button 
                  className="p-1 hover:bg-gray-100 rounded"
                  style={{ color: colors.secondary }}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="space-y-1">
                {folderStructure.map((item, index) => (
                  <FileTreeItem key={index} item={item} />
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-600 mb-2">데이터 카탈로그</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <Database size={14} className="mr-2" style={{ color: colors.tertiary }} />
                    <span>펀드 성과 데이터</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <Database size={14} className="mr-2" style={{ color: colors.tertiary }} />
                    <span>시장 지수 데이터</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <Database size={14} className="mr-2" style={{ color: colors.tertiary }} />
                    <span>ESG 평가 데이터</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className="flex items-center bg-gray-100 border-b border-gray-200">
            {files.map((file) => (
              <div
                key={file.name}
                className={`flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer ${
                  activeTab === file.name ? 'bg-white' : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(file.name)}
              >
                <FileText size={14} className="mr-2" />
                <span className="text-sm">{file.name}</span>
                <X size={12} className="ml-2 hover:bg-gray-200 rounded" />
              </div>
            ))}
            <button 
              className="p-2 hover:bg-gray-200 rounded"
              style={{ color: colors.secondary }}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <button 
                className="flex items-center px-3 py-1.5 rounded text-white text-sm font-medium hover:opacity-90"
                style={{ backgroundColor: colors.secondary }}
                onClick={executeCode}
              >
                <Play size={14} className="mr-1" />
                실행
              </button>
              <button className="flex items-center px-3 py-1.5 rounded border border-gray-300 text-sm hover:bg-gray-50">
                <Save size={14} className="mr-1" />
                저장
              </button>
              <button 
                className="flex items-center px-3 py-1.5 rounded text-white text-sm font-medium hover:opacity-90"
                style={{ backgroundColor: colors.tertiary }}
                onClick={() => setAiChatOpen(!aiChatOpen)}
              >
                <Bot size={14} className="mr-1" />
                AI Assistant
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Python 3.9.7</span>
              <span>•</span>
              <span>Snowflake 연결됨</span>
            </div>
          </div>

          <div className="flex flex-1">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-4 bg-white">
                <textarea
                  className="w-full h-full font-mono text-sm border-none outline-none resize-none"
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  style={{ fontFamily: 'Monaco, Consolas, monospace' }}
                />
              </div>
            </div>

            {/* AI Chat Panel */}
            {aiChatOpen && (
              <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
                <div 
                  className="flex items-center justify-between p-3 border-b border-gray-200"
                  style={{ backgroundColor: colors.primary, color: 'white' }}
                >
                  <h3 className="font-semibold">AI Code Assistant</h3>
                  <button onClick={() => setAiChatOpen(false)}>
                    <X size={16} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {aiHistory.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-gray-100 ml-6' 
                          : 'bg-blue-50 mr-6'
                      }`}
                    >
                      <div className="text-sm">{msg.content}</div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="AI에게 질문하거나 코드 도움을 요청하세요..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
                    />
                    <button 
                      className="px-3 py-2 rounded text-white"
                      style={{ backgroundColor: colors.secondary }}
                      onClick={sendAiMessage}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel */}
          <div className="h-64 border-t border-gray-200 bg-white">
            <div className="flex items-center border-b border-gray-200">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activePanel === 'console' 
                    ? 'border-b-2 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{ borderColor: activePanel === 'console' ? colors.tertiary : 'transparent' }}
                onClick={() => setActivePanel('console')}
              >
                <Terminal size={14} className="inline mr-1" />
                콘솔
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activePanel === 'output' 
                    ? 'border-b-2 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{ borderColor: activePanel === 'output' ? colors.tertiary : 'transparent' }}
                onClick={() => setActivePanel('output')}
              >
                <BarChart3 size={14} className="inline mr-1" />
                결과
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activePanel === 'data' 
                    ? 'border-b-2 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{ borderColor: activePanel === 'data' ? colors.tertiary : 'transparent' }}
                onClick={() => setActivePanel('data')}
              >
                <Table size={14} className="inline mr-1" />
                데이터 뷰어
              </button>
            </div>

            <div className="p-4 h-full overflow-y-auto">
              {activePanel === 'console' && (
                <div className="font-mono text-sm space-y-1">
                  {consoleOutput.map((output, index) => (
                    <div 
                      key={index} 
                      className={`${
                        output.type === 'command' ? 'text-blue-600' :
                        output.type === 'output' ? 'text-green-600' :
                        output.type === 'error' ? 'text-red-600' :
                        'text-gray-700'
                      }`}
                    >
                      {output.type === 'table' ? (
                        <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">
                          {output.content}
                        </pre>
                      ) : (
                        output.content
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {activePanel === 'output' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium mb-2">차트 결과</h4>
                    <div className="h-32 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-500">
                      [matplotlib 차트가 여기에 표시됩니다]
                    </div>
                  </div>
                </div>
              )}
              
              {activePanel === 'data' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium mb-2">DataFrame 뷰어</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-200 px-3 py-2">date</th>
                            <th className="border border-gray-200 px-3 py-2">price</th>
                            <th className="border border-gray-200 px-3 py-2">volume</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-200 px-3 py-2">2024-01-01</td>
                            <td className="border border-gray-200 px-3 py-2">99.50</td>
                            <td className="border border-gray-200 px-3 py-2">3421</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 px-3 py-2">2024-01-02</td>
                            <td className="border border-gray-200 px-3 py-2">101.23</td>
                            <td className="border border-gray-200 px-3 py-2">5670</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudIDE;