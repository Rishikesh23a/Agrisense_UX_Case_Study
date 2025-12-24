import { useState } from 'react';
import { ArrowLeft, Droplets, Sprout, Fan, Lightbulb, Clock, Zap, Settings } from 'lucide-react';
import type { Screen } from '../App';

interface AutomationControlProps {
  navigate: (screen: Screen) => void;
}

interface Device {
  id: string;
  name: string;
  icon: any;
  isOn: boolean;
  autoMode: boolean;
  schedule?: string;
  status: string;
}

export function AutomationControl({ navigate }: AutomationControlProps) {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'pump',
      name: 'Water Pump',
      icon: Droplets,
      isOn: false,
      autoMode: true,
      schedule: 'Daily 6:00 AM',
      status: 'Next run in 4h 23m'
    },
    {
      id: 'valve',
      name: 'Irrigation Valve',
      icon: Droplets,
      isOn: true,
      autoMode: false,
      status: 'Running - Zone A'
    },
    {
      id: 'sprayer',
      name: 'Fertilizer Sprayer',
      icon: Sprout,
      isOn: false,
      autoMode: true,
      schedule: 'Weekly Mon 7:00 AM',
      status: 'Scheduled for Dec 16'
    },
    {
      id: 'fan',
      name: 'Greenhouse Fan',
      icon: Fan,
      isOn: true,
      autoMode: true,
      schedule: 'Auto when >30°C',
      status: 'Running - High speed'
    },
    {
      id: 'light',
      name: 'Grow Lights',
      icon: Lightbulb,
      isOn: false,
      autoMode: true,
      schedule: 'Daily 6:00 PM - 10:00 PM',
      status: 'Starts in 8h 12m'
    }
  ]);

  const toggleDevice = (id: string) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, isOn: !d.isOn } : d
    ));
  };

  const toggleAutoMode = (id: string) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, autoMode: !d.autoMode } : d
    ));
  };

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
          <h2 className="text-white">Automation Control</h2>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-white mb-1">{devices.filter(d => d.isOn).length}</p>
            <p className="text-white opacity-90">Active</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-white mb-1">{devices.filter(d => d.autoMode).length}</p>
            <p className="text-white opacity-90">Auto Mode</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-white mb-1">{devices.length}</p>
            <p className="text-white opacity-90">Devices</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Quick Controls */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg mb-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6" />
            <h3 className="text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-all">
              Start All
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-all">
              Stop All
            </button>
          </div>
        </div>

        {/* Device Controls */}
        <div className="space-y-4">
          {devices.map((device) => {
            const Icon = device.icon;
            
            return (
              <div key={device.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Device Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`${device.isOn ? 'bg-green-100' : 'bg-gray-100'} p-4 rounded-xl`}>
                        <Icon className={`w-6 h-6 ${device.isOn ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="text-gray-900 mb-1">{device.name}</p>
                        <p className={`${device.isOn ? 'text-green-600' : 'text-gray-500'}`}>
                          {device.status}
                        </p>
                      </div>
                    </div>

                    {/* ON/OFF Toggle */}
                    <button
                      onClick={() => toggleDevice(device.id)}
                      className={`relative w-16 h-8 rounded-full transition-all ${
                        device.isOn ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                          device.isOn ? 'translate-x-8' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Auto Mode Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                    <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${device.autoMode ? 'text-purple-600' : 'text-gray-400'}`} />
                      <div>
                        <p className="text-gray-900">Auto Mode</p>
                        {device.schedule && (
                          <p className="text-gray-500">{device.schedule}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAutoMode(device.id)}
                      className={`relative w-14 h-7 rounded-full transition-all ${
                        device.autoMode ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                          device.autoMode ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Timer Schedule */}
                  {device.schedule && (
                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <p className="text-gray-900">Timer Schedule</p>
                          <p className="text-gray-600">{device.schedule}</p>
                        </div>
                      </div>
                      <Settings className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex border-t border-gray-100">
                  <button className="flex-1 py-4 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Schedule</span>
                  </button>
                  <button className="flex-1 py-4 text-gray-600 hover:bg-gray-50 transition-colors border-l border-gray-100 flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Device Button */}
        <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
          <Zap className="w-5 h-5" />
          <span>Add New Device</span>
        </button>
      </div>
    </div>
  );
}
