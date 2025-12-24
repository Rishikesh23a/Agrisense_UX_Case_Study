import { useState } from 'react';
import { ArrowLeft, TrendingUp, Bell, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Screen } from '../App';

interface SensorDetailsProps {
  navigate: (screen: Screen) => void;
  sensorId: string | null;
}

const chartData24h = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 48 },
  { time: '08:00', value: 52 },
  { time: '12:00', value: 47 },
  { time: '16:00', value: 43 },
  { time: '20:00', value: 42 },
  { time: '24:00', value: 42 },
];

const chartDataWeekly = [
  { time: 'Mon', value: 48 },
  { time: 'Tue', value: 50 },
  { time: 'Wed', value: 47 },
  { time: 'Thu', value: 45 },
  { time: 'Fri', value: 43 },
  { time: 'Sat', value: 42 },
  { time: 'Sun', value: 42 },
];

const chartDataMonthly = [
  { time: 'Week 1', value: 52 },
  { time: 'Week 2', value: 49 },
  { time: 'Week 3', value: 47 },
  { time: 'Week 4', value: 42 },
];

export function SensorDetails({ navigate, sensorId }: SensorDetailsProps) {
  const [timeRange, setTimeRange] = useState<'24h' | 'weekly' | 'monthly'>('24h');
  const [alertThreshold, setAlertThreshold] = useState(35);

  const getChartData = () => {
    switch (timeRange) {
      case '24h': return chartData24h;
      case 'weekly': return chartDataWeekly;
      case 'monthly': return chartDataMonthly;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">Sensor Details</h2>
        </div>

        {/* Big Value Display */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-3">
            <Droplets className="w-12 h-12 text-white mr-4" />
            <div className="text-left">
              <p className="text-white opacity-80 mb-1">Soil Moisture</p>
              <p className="text-white">42%</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-white">
            <TrendingUp className="w-4 h-4" />
            <span>-8.3% from yesterday</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 px-6 rounded-2xl mx-auto w-fit">
          <Bell className="w-5 h-5" />
          <span>Below Optimal Range</span>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* AI Prediction */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-white mb-3">AI Prediction</h3>
          <p className="text-white opacity-90">
            Based on current trends, soil moisture will reach critical levels (&lt;30%) in approximately 18 hours. Immediate irrigation recommended.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTimeRange('24h')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              timeRange === '24h'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              timeRange === 'weekly'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              timeRange === 'monthly'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Trend Analysis</h3>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
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
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Smart Recommendations</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="bg-blue-500 p-2 rounded-lg h-fit">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 mb-1">Irrigation</p>
                <p className="text-gray-600">
                  Schedule watering for 2 hours within the next 6-8 hours. Apply 15mm of water evenly across the zone.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-green-50 rounded-xl">
              <div className="bg-green-500 p-2 rounded-lg h-fit">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 mb-1">Fertilizer</p>
                <p className="text-gray-600">
                  Current moisture level is suitable for nitrogen fertilizer application. Consider applying 50kg/acre.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="bg-orange-500 p-2 rounded-lg h-fit">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 mb-1">Pest Control</p>
                <p className="text-gray-600">
                  Low moisture combined with high temperatures increases pest risk. Monitor for aphids and spider mites.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Threshold Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">Alert Threshold</h3>
          <p className="text-gray-600 mb-4">
            Set custom alert when soil moisture drops below:
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <input
              type="range"
              min="20"
              max="50"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl min-w-[4rem] text-center">
              {alertThreshold}%
            </div>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl shadow-lg transition-all">
            Save Threshold
          </button>
        </div>
      </div>
    </div>
  );
}