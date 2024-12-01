import React from 'react';
import {
  FaCoins,
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaLock
} from 'react-icons/fa';

interface FeatureBenefitItem {
  icon: React.ComponentType; // Icon components are functional components
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const FeaturesAndBenefits = () => {
  const features: FeatureBenefitItem[] = [
    {
      icon: FaCoins,
      title: "Custom Stablecoins",
      description: "Create custom stablecoins easily",
      gradientFrom: "from-blue-400",
      gradientTo: "to-cyan-300"
    },
    {
      icon: FaShieldAlt,
      title: "Government Backed",
      description: "Backed by yield-bearing government bonds",
      gradientFrom: "from-purple-400",
      gradientTo: "to-blue-300"
    },
    {
      icon: FaBolt,
      title: "Solana Powered",
      description: "Operates on the secure and fast Solana blockchain",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-300"
    },
    {
      icon: FaChartLine,
      title: "Yield Earning",
      description: "Yield-earning opportunities for creators",
      gradientFrom: "from-blue-400",
      gradientTo: "to-purple-300"
    }
  ];

  const benefits: FeatureBenefitItem[] = [
    {
      icon: FaUsers,
      title: "Democratized Access",
      description: "Democratizes access to financial assets",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-300"
    },
    {
      icon: FaLock,
      title: "Secure Transactions",
      description: "Promotes secure, transparent on-chain transactions",
      gradientFrom: "from-purple-400",
      gradientTo: "to-blue-300"
    },
    {
      icon: FaGlobe,
      title: "Global Access",
      description: "Supports global accessibility",
      gradientFrom: "from-blue-400",
      gradientTo: "to-cyan-300"
    }
  ];

  const CardSection = ({ title, items }: { title: string, items: FeatureBenefitItem[] }) => (
    <div className="w-full lg:w-1/2 p-6">
      <div className="relative">
        <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          {title}
        </h3>
        {/* Decorative line */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"></div>
      </div>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="
              relative group
              bg-[#1a2227] rounded-lg
              shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.2),inset_2px_2px_6px_rgba(255,255,255,0.1)]
              transition-all duration-300
              hover:translate-y-[-2px]
              overflow-hidden
            "
          >
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer"></div>

            {/* Neumorphic inner content */}
            <div className="relative p-6 backdrop-blur-sm">
              {/* Neon icon */}
              <div className={`
                absolute -top-6 -right-6 w-24 h-24 opacity-10
                bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo}
                rounded-full blur-xl
              `}></div>

              <div className="flex items-start gap-4">
                <div className={`
                  p-3 rounded-lg
                  bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo}
                  shadow-lg flex-shrink-0
                `}>
                  <item.icon className="text-xl text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    {item.title}
                  </h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-[#37474F] to-[#263238] text-white py-16 relative">
      {/* Cyberpunk grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00f2fe 1px, transparent 1px), linear-gradient(90deg, #00f2fe 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Features & Benefits
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <CardSection title="Key Features" items={features} />
          <CardSection title="Key Benefits" items={benefits} />
        </div>
      </div>
    </div>
  );
};

// Add the shimmer animation
const styles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default FeaturesAndBenefits;
