import React from 'react';

interface StateTabProps {
  state: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  count: number;
}

export const StateTab: React.FC<StateTabProps> = ({ 
  state, 
  isActive, 
  onClick, 
  icon, 
  count 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-all duration-200
        ${isActive 
          ? 'bg-orange-500 text-white shadow-md transform translate-y-0' 
          : 'bg-blue-700 text-blue-200 hover:bg-blue-600 hover:text-white'
        }
      `}
    >
      {icon}
      <span>{state}</span>
      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
        {count}
      </span>
    </button>
  );
};