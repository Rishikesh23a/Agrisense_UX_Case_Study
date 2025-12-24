import { ArrowLeft, TrendingUp, Droplets, Bug, Zap, Leaf, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Screen } from '../App';

interface AIInsightsProps {
  navigate: (screen: Screen) => void;
}

const yieldData = [
  { month: 'Jan', yield: 850 },
  { month: 'Feb', yield: 920 },
  { month: 'Mar', yield: 1100 },
  { month: 'Apr', yield: 1350 },
  { month: 'May', yield: 1500 },
  { month: 'Jun', yield: 1650 },
];

const resourceData = [
  { name: 'Optimized', value: 68, color: '#16a34a' },
  { name: 'Can Improve', value: 32, color: '#f59e0b' },
];

export function AIInsights({ navigate }: AIInsightsProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">AI Insights</h2>
        </div>
        <p className="text-purple-100">
          Predictive analytics and smart recommendations powered by AI
        </p>
      </div>

      <div className="px-6 -mt-4">
        {/* Crop Growth Prediction */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Leaf className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Crop Growth Prediction</h3>
              <p className="text-white mb-4 opacity-90">
                Based on current conditions, your wheat crop is progressing 12% faster than average seasonal growth.
              </p>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white opacity-90">Expected Harvest</span>
                  <span className="text-white">June 15, 2025</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '78%' }} />
                </div>
                <p className="text-white opacity-90 mt-2">78% Growth Stage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Yield Forecast */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Yield Forecast</h3>
              <p className="text-gray-600">Projected monthly production</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-gray-700 mb-1">Predicted Total Yield</p>
            <p className="text-gray-900">1,650 kg/acre</p>
            <div className="flex items-center gap-2 text-green-600 mt-2">
              <TrendingUp className="w-4 h-4" />
              <span>+18% compared to last season</span>
            </div>
          </div>

          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="yield" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pest & Disease Probability */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Bug className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Pest/Disease Risk</h3>
              <p className="text-gray-600">Next 7 days probability</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Aphids</span>
                <span className="text-orange-600">Medium (45%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Fungal Infection</span>
                <span className="text-green-600">Low (15%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Root Rot</span>
                <span className="text-green-600">Low (8%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 mt-4">
            <p className="text-orange-700 mb-1">Prevention Tip</p>
            <p className="text-gray-700">
              Current humidity levels favor aphid activity. Consider applying neem oil spray as a preventive measure.
            </p>
          </div>
        </div>

        {/* Smart Irrigation Schedule */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 p-3 rounded-xl">
              <Droplets className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Smart Irrigation Schedule</h3>
              <p className="text-gray-600">AI-optimized watering plan</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { day: 'Today', time: '6:00 AM', duration: '2h 15m', amount: '15mm', status: 'upcoming' },
              { day: 'Tomorrow', time: '5:30 AM', duration: '2h 30m', amount: '18mm', status: 'scheduled' },
              { day: 'Dec 14', time: '6:00 AM', duration: '2h', amount: '14mm', status: 'scheduled' },
            ].map((schedule, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${schedule.status === 'upcoming' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <div>
                    <p className="text-gray-900">{schedule.day}</p>
                    <p className="text-gray-600">{schedule.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">{schedule.duration}</p>
                  <p className="text-gray-600">{schedule.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Optimization */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Energy & Water Optimization</h3>
              <p className="text-gray-600">Current efficiency score</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {resourceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 mb-2">68% Optimized</p>
              <p className="text-gray-600">
                Your resource usage is above average. Small improvements in irrigation timing could save 12% more water.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-green-700 mb-1">Water Saved</p>
              <p className="text-gray-900">1,250 L</p>
              <p className="text-gray-600">This month</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-blue-700 mb-1">Energy Saved</p>
              <p className="text-gray-900">48 kWh</p>
              <p className="text-gray-600">This month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}