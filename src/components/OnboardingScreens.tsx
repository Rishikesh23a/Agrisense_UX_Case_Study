import { useState } from 'react';
import { ChevronRight, Sprout, Brain, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingScreensProps {
  onComplete: () => void;
}

const screens = [
  {
    image: 'https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU1NDk3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Real-time Smart Farming',
    description: 'Monitor your farm 24/7 with IoT sensors and get instant updates on crop health, soil conditions, and environmental factors.',
    icon: Sprout,
    gradient: 'from-green-100 via-green-50 to-white'
  },
  {
    image: 'https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBkcm9uZSUyMHNlbnNvcnxlbnwxfHx8fDE3NjU1NDk3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'AI-driven Insights & Automation',
    description: 'Leverage artificial intelligence to optimize irrigation, predict pest outbreaks, and automate farm operations.',
    icon: Brain,
    gradient: 'from-emerald-100 via-green-50 to-white'
  },
  {
    image: 'https://images.unsplash.com/photo-1686008674009-876c599f1fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBJb1R8ZW58MXx8fHwxNzY1NDY5ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Grow More With Data',
    description: 'Make informed decisions with comprehensive analytics, yield predictions, and actionable insights to maximize productivity.',
    icon: TrendingUp,
    gradient: 'from-green-100 via-lime-50 to-white'
  }
];

export function OnboardingScreens({ onComplete }: OnboardingScreensProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const current = screens[currentIndex];
  const Icon = current.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${current.gradient} flex flex-col transition-all duration-500`}>
      {/* Skip Button */}
      <div className="flex justify-end p-6">
        <button
          onClick={handleSkip}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Illustration */}
        <div className="relative w-full max-w-md mb-12">
          <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-30" />
          <ImageWithFallback
            src={current.image}
            alt={current.title}
            className="relative w-full h-80 object-cover rounded-3xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 bg-green-600 p-4 rounded-2xl shadow-lg">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-md">
          <h1 className="text-gray-900 mb-4">
            {current.title}
          </h1>
          <p className="text-gray-600">
            {current.description}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 pb-12">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-green-600'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all hover:shadow-xl"
        >
          <span>{currentIndex === screens.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
