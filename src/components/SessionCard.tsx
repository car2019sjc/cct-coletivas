import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Session } from '../types';

interface SessionCardProps {
  session: Session;
  onClick: () => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Pequeno delay para garantir que o DOM está estável
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getDescriptionInfo = (description: string) => {
    const isEmpty = !description || description.trim() === '';
    const isDefault = description === 'Descrição não informada';
    const isNotFound = description === 'Informação não localizada';
    const hasRealContent = !isEmpty && !isDefault && !isNotFound;
    
    let badgeColor = '';
    
    if (hasRealContent) {
      badgeColor = 'bg-green-100 text-green-800';
    } else if (isNotFound) {
      badgeColor = 'bg-yellow-100 text-yellow-800';
    } else {
      badgeColor = 'bg-gray-100 text-gray-600';
    }
    
    return { badgeColor, hasRealContent };
  };

  const handleClick = () => {
    try {
      if (cardRef.current && isReady) {
        onClick();
      }
    } catch (error) {
      console.error('Erro ao clicar no card:', error);
    }
  };

  if (!session || !session.id || !isReady) {
    return (
      <div className="group bg-gray-800 rounded-xl border border-gray-700 opacity-50 animate-pulse">
        <div className="bg-gradient-to-r from-gray-700 to-gray-750 px-4 py-3 border-b border-gray-600">
          <div className="h-4 bg-gray-600 rounded"></div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="h-6 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const descInfo = getDescriptionInfo(session.descricao);

  return (
    <div 
      ref={cardRef}
      className="group bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Header com estado */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-750 px-4 py-3 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">
            {session.estado}
          </span>
          {descInfo.hasRealContent && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${descInfo.badgeColor}`}>
              ✓
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        {/* Título da sessão */}
        <div className="mb-6">
          <h3 className="font-semibold text-white text-base leading-tight">
            {session.sessao}
          </h3>
        </div>

        {/* Footer com ação */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-400 font-medium">
            Ver detalhes
          </span>
          <ChevronRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </div>
    </div>
  );
};