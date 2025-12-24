import { useState } from 'react';
import { 
  ArrowLeft, 
  Globe, 
  Moon, 
  Sun, 
  Leaf, 
  Smartphone, 
  Bell, 
  Shield, 
  WifiOff,
  ChevronRight,
  User,
  HelpCircle,
  LogOut
} from 'lucide-react';
import type { Screen } from '../App';
import { useLanguage } from '../context/LanguageContext';

interface SettingsProps {
  navigate: (screen: Screen) => void;
}

export function Settings({ navigate }: SettingsProps) {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = useState('light');
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">{t('settings.title')}</h2>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white mb-1">John Farmer</p>
            <p className="text-gray-300">farmer@smartfarm.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Language Selection */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-900">{t('settings.language')}</h3>
            </div>
          </div>
          
          <div className="p-2">
            {['English', 'Hindi', 'Marathi'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  language === lang
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{lang}</span>
                {language === lang && (
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-purple-600" />
              <h3 className="text-gray-900">{t('settings.theme')}</h3>
            </div>
          </div>
          
          <div className="p-2">
            <button
              onClick={() => setTheme('light')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl mb-2 transition-all ${
                theme === 'light'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span className="flex-1 text-left">{t('settings.lightMode')}</span>
              {theme === 'light' && (
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl mb-2 transition-all ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span className="flex-1 text-left">{t('settings.darkMode')}</span>
              {theme === 'dark' && (
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-800 rounded-full" />
                </div>
              )}
            </button>

            <button
              onClick={() => setTheme('nature')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                theme === 'nature'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Leaf className="w-5 h-5" />
              <span className="flex-1 text-left">{t('settings.natureGreen')}</span>
              {theme === 'nature' && (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-gray-900">{t('settings.appSettings')}</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {/* Notifications */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-gray-900">{t('settings.notifications')}</p>
                  <p className="text-gray-500">{t('settings.notificationsDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  notifications ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    notifications ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Offline Mode */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <WifiOff className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-gray-900">{t('settings.offlineMode')}</p>
                  <p className="text-gray-500">{t('settings.offlineModeDesc')}</p>
                </div>
              </div>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  offlineMode ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    offlineMode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Device Management */}
            <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-gray-900">{t('settings.deviceManagement')}</p>
                  <p className="text-gray-500">{t('settings.deviceManagementDesc')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* App Permissions */}
            <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <p className="text-gray-900">{t('settings.appPermissions')}</p>
                  <p className="text-gray-500">{t('settings.appPermissionsDesc')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Other Options */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="text-gray-900">{t('settings.helpSupport')}</p>
                <p className="text-gray-500">{t('settings.helpSupportDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="text-gray-900">{t('settings.privacyPolicy')}</p>
                <p className="text-gray-500">{t('settings.privacyPolicyDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-red-50 text-red-600 py-4 rounded-2xl hover:bg-red-100 transition-all flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          <span>{t('settings.logout')}</span>
        </button>

        {/* App Version */}
        <p className="text-center text-gray-400 mt-6">
          SmartFarm v2.1.0
        </p>
      </div>
    </div>
  );
}