import { useState } from 'react';
import { ArrowLeft, Download, TrendingUp, BarChart3, Calendar } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import type { Screen } from '../App';

interface AnalyticsProps {
  navigate: (screen: Screen) => void;
}

const moistureData = [
  { date: 'Dec 5', fieldA: 55, fieldB: 48, fieldC: 52 },
  { date: 'Dec 6', fieldA: 53, fieldB: 46, fieldC: 50 },
  { date: 'Dec 7', fieldA: 50, fieldB: 44, fieldC: 48 },
  { date: 'Dec 8', fieldA: 47, fieldB: 42, fieldC: 46 },
  { date: 'Dec 9', fieldA: 45, fieldB: 40, fieldC: 44 },
  { date: 'Dec 10', fieldA: 44, fieldB: 38, fieldC: 43 },
  { date: 'Dec 11', fieldA: 42, fieldB: 38, fieldC: 42 },
];

const tempData = [
  { time: '6 AM', temp: 18 },
  { time: '9 AM', temp: 22 },
  { time: '12 PM', temp: 28 },
  { time: '3 PM', temp: 32 },
  { time: '6 PM', temp: 26 },
  { time: '9 PM', temp: 21 },
  { time: '12 AM', temp: 19 },
];

const heatmapData = [
  [45, 48, 52, 55, 58, 60, 62, 58],
  [42, 45, 49, 52, 56, 58, 60, 56],
  [38, 42, 46, 50, 54, 56, 58, 54],
  [35, 38, 42, 46, 50, 52, 54, 50],
  [32, 35, 38, 42, 46, 48, 50, 46],
  [30, 32, 35, 38, 42, 44, 46, 42],
];

export function Analytics({ navigate }: AnalyticsProps) {
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | 'year'>('week');

  const getColor = (value: number) => {
    if (value >= 55) return '#16a34a'; // green
    if (value >= 45) return '#eab308'; // yellow
    if (value >= 35) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">Analytics & History</h2>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Download className="w-6 h-6" />
          </button>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
          <button
            onClick={() => setSelectedRange('week')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              selectedRange === 'week'
                ? 'bg-white text-blue-600'
                : 'text-white'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedRange('month')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              selectedRange === 'month'
                ? 'bg-white text-blue-600'
                : 'text-white'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setSelectedRange('year')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              selectedRange === 'year'
                ? 'bg-white text-blue-600'
                : 'text-white'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-gray-900 mb-1">+12%</p>
            <p className="text-gray-600">Growth</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-900 mb-1">1,450</p>
            <p className="text-gray-600">Avg Yield</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-gray-900 mb-1">7 Days</p>
            <p className="text-gray-600">Period</p>
          </div>
        </div>

        {/* Multi-Field Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Multi-Field Soil Moisture Comparison</h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="fieldA" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  name="North Field A"
                  dot={{ fill: '#16a34a', r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fieldB" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="South Field B"
                  dot={{ fill: '#3b82f6', r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fieldC" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="East Field C"
                  dot={{ fill: '#f59e0b', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-green-700 mb-1">Field A</p>
              <p className="text-gray-900">42%</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-blue-700 mb-1">Field B</p>
              <p className="text-gray-900">38%</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-orange-700 mb-1">Field C</p>
              <p className="text-gray-900">42%</p>
            </div>
          </div>
        </div>

        {/* Temperature Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Daily Temperature Pattern</h3>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="temp" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-between p-4 bg-orange-50 rounded-xl">
            <div>
              <p className="text-orange-700 mb-1">Peak Temperature</p>
              <p className="text-gray-900">32°C at 3:00 PM</p>
            </div>
            <div className="text-right">
              <p className="text-orange-700 mb-1">Average</p>
              <p className="text-gray-900">24°C</p>
            </div>
          </div>
        </div>

        {/* Soil Moisture Heatmap */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Soil Moisture Heatmap - North Field A</h3>
          <p className="text-gray-600 mb-4">Distribution across field zones</p>
          
          <div className="grid grid-cols-8 gap-1 mb-4">
            {heatmapData.map((row, i) =>
              row.map((value, j) => (
                <div
                  key={`${i}-${j}`}
                  className="aspect-square rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: getColor(value) }}
                  title={`${value}%`}
                >
                  <span className="text-xs">{value}</span>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span className="text-gray-600">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded" />
              <span className="text-gray-600">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded" />
              <span className="text-gray-600">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-gray-600">Optimal</span>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">Export Data</h3>
          <p className="text-gray-600 mb-4">
            Download detailed reports and analytics data
          </p>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-gray-900">Weekly Report</p>
                  <p className="text-gray-600">PDF format with charts</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="text-gray-900">Raw Data Export</p>
                  <p className="text-gray-600">CSV format for analysis</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <p className="text-gray-900">Custom Report</p>
                  <p className="text-gray-600">Select date range & metrics</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}