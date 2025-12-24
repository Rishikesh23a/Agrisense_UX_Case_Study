import { useState } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Leaf, 
  FlaskConical, 
  Sun, 
  ChevronDown,
  MapPin,
  Zap,
  BarChart3,
  Menu,
  Bell,
  Cloud,
  Wind,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import type { Screen } from '../App';
import { useLanguage } from '../context/LanguageContext';

interface DashboardProps {
  navigate: (screen: Screen) => void;
  onSelectSensor: (sensorId: string) => void;
}

export function Dashboard({ navigate, onSelectSensor }: DashboardProps) {
  const { t } = useLanguage();
  const [selectedField, setSelectedField] = useState('North Field A');

  const sensorData = [
    { 
      id: 'temp',
      nameKey: 'sensor.temperature',
      value: '24.5°C', 
      icon: Thermometer, 
      status: 'safe',
      trend: '+2.1%',
      range: '20-30°C'
    },
    { 
      id: 'humidity',
      nameKey: 'sensor.humidity',
      value: '68%', 
      icon: Droplets, 
      status: 'safe',
      trend: '-1.5%',
      range: '60-80%'
    },
    { 
      id: 'soil',
      nameKey: 'sensor.soilMoisture',
      value: '42%', 
      icon: Leaf, 
      status: 'warning',
      trend: '-8.3%',
      range: '45-65%'
    },
    { 
      id: 'ph',
      nameKey: 'sensor.phLevel',
      value: '6.8', 
      icon: FlaskConical, 
      status: 'safe',
      trend: '+0.2',
      range: '6.5-7.5'
    },
    { 
      id: 'light',
      nameKey: 'sensor.lightIntensity',
      value: '850 lux', 
      icon: Sun, 
      status: 'safe',
      trend: '+15%',
      range: '800-1000 lux'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-white">{t('dashboard.title')}</h2>
          <button 
            onClick={() => navigate('alerts')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Field Selector */}
        <button className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <div className="text-left">
              <p className="text-white opacity-80">{t('dashboard.currentField')}</p>
              <p className="text-white">{selectedField}</p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 -mt-4">
        {/* Weather Widget */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <Cloud className="w-12 h-12" />
              <div>
                <p className="text-white opacity-90 mb-1">{t('dashboard.todayWeather')}</p>
                <p className="text-white">{t('dashboard.partlyCloudy')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white mb-1">28°C</p>
              <div className="flex items-center gap-2 text-white opacity-90">
                <Wind className="w-4 h-4" />
                <span>12 km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestion Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 shadow-lg mb-6 flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white mb-1">{t('dashboard.aiRecommendation')}</p>
            <p className="text-white text-sm opacity-90">
              {t('dashboard.aiMessage')}
            </p>
          </div>
        </div>

        {/* Sensor Cards Grid */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">{t('dashboard.liveSensorData')}</h3>
          <div className="grid grid-cols-2 gap-4">
            {sensorData.map((sensor) => {
              const Icon = sensor.icon;
              const isWarning = sensor.status === 'warning';
              
              return (
                <button
                  key={sensor.id}
                  onClick={() => onSelectSensor(sensor.id)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${isWarning ? 'bg-orange-100' : 'bg-green-100'} p-3 rounded-xl`}>
                      <Icon className={`w-5 h-5 ${isWarning ? 'text-orange-600' : 'text-green-600'}`} />
                    </div>
                    {isWarning ? (
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{t(sensor.nameKey)}</p>
                  <p className="text-gray-900 mb-1">{sensor.value}</p>
                  <div className="flex items-center gap-1 text-gray-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>{sensor.trend}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">{t('dashboard.quickActions')}</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate('fieldMap')}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-xl mb-2 mx-auto w-fit">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-gray-900 text-center">{t('dashboard.farmMap')}</p>
            </button>
            
            <button
              onClick={() => navigate('automation')}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-purple-100 p-3 rounded-xl mb-2 mx-auto w-fit">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-gray-900 text-center">{t('dashboard.automation')}</p>
            </button>
            
            <button
              onClick={() => navigate('insights')}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-orange-100 p-3 rounded-xl mb-2 mx-auto w-fit">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-gray-900 text-center">{t('dashboard.insights')}</p>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-green-600">
            <div className="bg-green-100 p-2 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <span>{t('dashboard.home')}</span>
          </button>
          
          <button 
            onClick={() => navigate('analytics')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <BarChart3 className="w-5 h-5" />
            <span>{t('dashboard.analytics')}</span>
          </button>
          
          <button 
            onClick={() => navigate('automation')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Zap className="w-5 h-5" />
            <span>{t('dashboard.control')}</span>
          </button>
          
          <button 
            onClick={() => navigate('settings')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Menu className="w-5 h-5" />
            <span>{t('dashboard.settings')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}