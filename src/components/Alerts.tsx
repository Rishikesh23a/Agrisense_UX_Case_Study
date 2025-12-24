import { ArrowLeft, AlertTriangle, AlertCircle, CheckCircle, Droplets, Thermometer, Bug, Battery } from 'lucide-react';
import type { Screen } from '../App';

interface AlertsProps {
  navigate: (screen: Screen) => void;
}

const alerts = [
  {
    id: 1,
    type: 'critical',
    icon: Droplets,
    title: 'Low Soil Moisture',
    message: 'Soil moisture in North Field A has dropped to 42%, below optimal range.',
    time: '15 minutes ago',
    recommendation: 'Schedule irrigation within 6-8 hours to prevent crop stress.'
  },
  {
    id: 2,
    type: 'warning',
    icon: Thermometer,
    title: 'High Temperature Alert',
    message: 'Temperature in greenhouse exceeding 32°C, above recommended range.',
    time: '1 hour ago',
    recommendation: 'Activate ventilation fans and consider shade netting.'
  },
  {
    id: 3,
    type: 'warning',
    icon: Bug,
    title: 'Pest Risk Elevated',
    message: 'Weather conditions favorable for aphid population growth.',
    time: '3 hours ago',
    recommendation: 'Inspect crops and consider preventive organic pesticide application.'
  },
  {
    id: 4,
    type: 'safe',
    icon: CheckCircle,
    title: 'pH Level Normalized',
    message: 'Soil pH has returned to optimal range (6.8) after lime treatment.',
    time: '5 hours ago',
    recommendation: 'Continue monitoring. Next test recommended in 7 days.'
  },
  {
    id: 5,
    type: 'warning',
    icon: Battery,
    title: 'Sensor Battery Low',
    message: 'Sensor S3 battery level at 15%, replacement needed soon.',
    time: '1 day ago',
    recommendation: 'Order replacement battery or schedule maintenance visit.'
  },
  {
    id: 6,
    type: 'safe',
    icon: Droplets,
    title: 'Irrigation Completed',
    message: 'Automated irrigation cycle finished successfully in South Field B.',
    time: '2 days ago',
    recommendation: 'Water distribution was even. Next cycle scheduled for tomorrow 6 AM.'
  }
];

export function Alerts({ navigate }: AlertsProps) {
  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const warningCount = alerts.filter(a => a.type === 'warning').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">Alerts & Notifications</h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-white mb-2">{criticalCount}</p>
            <p className="text-white opacity-90">Critical</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-white mb-2">{warningCount}</p>
            <p className="text-white opacity-90">Warning</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-white mb-2">{alerts.length - criticalCount - warningCount}</p>
            <p className="text-white opacity-90">Safe</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-2 shadow-lg">
          <button className="flex-1 py-3 bg-green-600 text-white rounded-xl transition-all">
            All
          </button>
          <button className="flex-1 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-all">
            Critical
          </button>
          <button className="flex-1 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-all">
            Warnings
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            const isCritical = alert.type === 'critical';
            const isWarning = alert.type === 'warning';
            const isSafe = alert.type === 'safe';

            const borderColor = isCritical ? 'border-l-red-500' : isWarning ? 'border-l-orange-500' : 'border-l-green-500';
            const bgColor = isCritical ? 'bg-red-50' : isWarning ? 'bg-orange-50' : 'bg-green-50';
            const iconBg = isCritical ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-green-500';
            const textColor = isCritical ? 'text-red-700' : isWarning ? 'text-orange-700' : 'text-green-700';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl shadow-sm border-l-4 ${borderColor} overflow-hidden hover:shadow-md transition-shadow`}
              >
                <div className="p-5">
                  <div className="flex gap-4 mb-3">
                    <div className={`${iconBg} p-3 rounded-xl h-fit`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-gray-900">{alert.title}</p>
                        {isCritical && (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        )}
                        {isWarning && (
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                        )}
                        {isSafe && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">
                        {alert.message}
                      </p>
                      <p className="text-gray-400">
                        {alert.time}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className={`${bgColor} rounded-xl p-4 mt-4`}>
                    <p className={`${textColor} mb-1`}>
                      Recommendation
                    </p>
                    <p className="text-gray-700">
                      {alert.recommendation}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex border-t border-gray-100">
                  <button className="flex-1 py-4 text-gray-600 hover:bg-gray-50 transition-colors">
                    Dismiss
                  </button>
                  <button className="flex-1 py-4 text-green-600 hover:bg-green-50 transition-colors border-l border-gray-100">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear All Button */}
        <button className="w-full mt-6 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl hover:border-gray-300 transition-all">
          Mark All as Read
        </button>
      </div>
    </div>
  );
}
