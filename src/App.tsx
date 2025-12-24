import { useState } from 'react';
import { OnboardingScreens } from './components/OnboardingScreens';
import { LoginSignup } from './components/LoginSignup';
import { Dashboard } from './components/Dashboard';
import { FieldMap } from './components/FieldMap';
import { SensorDetails } from './components/SensorDetails';
import { Alerts } from './components/Alerts';
import { AIInsights } from './components/AIInsights';
import { AutomationControl } from './components/AutomationControl';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { LanguageProvider } from './context/LanguageContext';

export type Screen = 
  | 'onboarding' 
  | 'login' 
  | 'dashboard' 
  | 'fieldMap' 
  | 'sensorDetails' 
  | 'alerts' 
  | 'insights' 
  | 'automation' 
  | 'analytics' 
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('dashboard');
  };

  const handleSelectSensor = (sensorId: string) => {
    setSelectedSensor(sensorId);
    navigate('sensorDetails');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreens onComplete={() => navigate('login')} />;
      case 'login':
        return <LoginSignup onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard navigate={navigate} onSelectSensor={handleSelectSensor} />;
      case 'fieldMap':
        return <FieldMap navigate={navigate} onSelectSensor={handleSelectSensor} />;
      case 'sensorDetails':
        return <SensorDetails navigate={navigate} sensorId={selectedSensor} />;
      case 'alerts':
        return <Alerts navigate={navigate} />;
      case 'insights':
        return <AIInsights navigate={navigate} />;
      case 'automation':
        return <AutomationControl navigate={navigate} />;
      case 'analytics':
        return <Analytics navigate={navigate} />;
      case 'settings':
        return <Settings navigate={navigate} />;
      default:
        return <Dashboard navigate={navigate} onSelectSensor={handleSelectSensor} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        {renderScreen()}
      </div>
    </LanguageProvider>
  );
}