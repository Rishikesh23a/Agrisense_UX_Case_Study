import { ArrowLeft, Thermometer, Droplets, Leaf, MapPin, ZoomIn, ZoomOut } from 'lucide-react';
import type { Screen } from '../App';

interface FieldMapProps {
  navigate: (screen: Screen) => void;
  onSelectSensor: (sensorId: string) => void;
}

const sensors = [
  { id: 's1', x: 25, y: 30, temp: 24, moisture: 42, status: 'warning' },
  { id: 's2', x: 50, y: 25, temp: 23, moisture: 58, status: 'safe' },
  { id: 's3', x: 75, y: 35, temp: 25, moisture: 55, status: 'safe' },
  { id: 's4', x: 30, y: 65, temp: 24, moisture: 48, status: 'safe' },
  { id: 's5', x: 65, y: 70, temp: 26, moisture: 38, status: 'warning' },
];

const zones = [
  { x: 10, y: 15, width: 35, height: 40, moisture: 'low', color: 'rgba(251, 146, 60, 0.2)' },
  { x: 45, y: 10, width: 40, height: 45, moisture: 'optimal', color: 'rgba(34, 197, 94, 0.2)' },
  { x: 20, y: 55, width: 30, height: 35, moisture: 'medium', color: 'rgba(234, 179, 8, 0.2)' },
  { x: 55, y: 60, width: 35, height: 30, moisture: 'low', color: 'rgba(251, 146, 60, 0.2)' },
];

export function FieldMap({ navigate, onSelectSensor }: FieldMapProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">Field Overview Map</h2>
        </div>
        <p className="text-green-50">North Field A - 12.5 acres</p>
      </div>

      <div className="p-6">
        {/* Map Controls */}
        <div className="flex gap-3 mb-4">
          <button className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          <button className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
            <ZoomOut className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1" />
          <button className="bg-green-600 text-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>My Location</span>
          </button>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="relative w-full aspect-square bg-gradient-to-br from-green-50 to-lime-50 rounded-xl overflow-hidden border-2 border-green-200">
            {/* Soil Moisture Zones */}
            {zones.map((zone, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: `${zone.width}%`,
                  height: `${zone.height}%`,
                  backgroundColor: zone.color,
                  border: '2px dashed rgba(0,0,0,0.1)',
                  borderRadius: '12px'
                }}
              />
            ))}

            {/* Sensor Nodes */}
            {sensors.map((sensor) => (
              <button
                key={sensor.id}
                onClick={() => onSelectSensor(sensor.id)}
                style={{
                  position: 'absolute',
                  left: `${sensor.x}%`,
                  top: `${sensor.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="group"
              >
                {/* Pulse Animation */}
                <div className={`absolute inset-0 ${sensor.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'} rounded-full animate-ping opacity-75`} />
                
                {/* Sensor Dot */}
                <div className={`relative w-12 h-12 ${sensor.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'} rounded-full shadow-lg flex items-center justify-center border-4 border-white`}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>

                {/* Hover Info */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-24 bg-gray-900 text-white px-4 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-4 h-4" />
                      <span>{sensor.temp}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="w-4 h-4" />
                      <span>{sensor.moisture}%</span>
                    </div>
                  </div>
                  <p className="text-white">Sensor {sensor.id.toUpperCase()}</p>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
                </div>
              </button>
            ))}

            {/* Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full border-t border-gray-200 opacity-30" style={{ top: `${(i + 1) * 20}%` }} />
              ))}
              {[...Array(5)].map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full border-l border-gray-200 opacity-30" style={{ left: `${(i + 1) * 20}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">Soil Moisture Legend</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-200 rounded-lg border-2 border-green-400" />
              <span className="text-gray-700">Optimal (45-65%)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-200 rounded-lg border-2 border-yellow-400" />
              <span className="text-gray-700">Medium (35-45%)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-orange-200 rounded-lg border-2 border-orange-400" />
              <span className="text-gray-700">Low (&lt;35%)</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">Sensor Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full" />
                <span className="text-gray-700">Normal Operation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full" />
                <span className="text-gray-700">Attention Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
