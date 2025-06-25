import React, { useEffect } from 'react';
import { X, Calendar, FileText, MapPin, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Session } from '../types';

interface SessionDetailModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SessionDetailModal: React.FC<SessionDetailModalProps> = ({ 
  session, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen || !session) return null;

  const formatDate = (dateString: string) => {
    try {
      // Verifica se é um período de vigência (contém 'a' entre datas)
      if (dateString.includes(' a ')) {
        return dateString; // Retorna o período formatado como está
      }
      
      // Tenta formatar como data simples
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Se não for uma data válida, retorna o valor original
      }
      
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString; // Em caso de erro, retorna o valor original
    }
  };

  const getDescriptionStatus = (description: string) => {
    const isEmpty = !description || description.trim() === '';
    const isDefault = description === 'Descrição não informada';
    const isNotFound = description === 'Informação não localizada';
    const hasRealContent = !isEmpty && !isDefault && !isNotFound;
    
    return {
      isEmpty,
      isDefault,
      isNotFound,
      hasRealContent,
      displayText: hasRealContent ? description : 
                   isNotFound ? 'Esta informação não foi localizada na convenção coletiva atual.' :
                   'Descrição detalhada não disponível para esta sessão.'
    };
  };

  const descStatus = getDescriptionStatus(session.descricao);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-700 rounded-md">
              <FileText className="h-6 w-6 text-blue-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{session.sessao}</h2>
              <p className="text-blue-200 text-sm">{session.estado}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors p-2 hover:bg-blue-700 rounded-md"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-300 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium text-sm">
                  {session.data.includes(' a ') ? 'Período de Vigência' : 'Data'}
                </span>
              </div>
              <p className="text-white font-semibold">
                {formatDate(session.data)}
              </p>
            </div>

            <div className="bg-orange-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-orange-300 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium text-sm">Estado</span>
              </div>
              <p className="text-white font-semibold">
                {session.estado}
              </p>
            </div>
          </div>

          {/* Description Status Indicator */}
          <div className={`p-4 rounded-lg border-l-4 ${
            descStatus.hasRealContent 
              ? 'bg-green-900/20 border-green-500'
              : descStatus.isNotFound
              ? 'bg-yellow-900/20 border-yellow-500'
              : 'bg-gray-700 border-gray-500'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {descStatus.hasRealContent && <CheckCircle className="h-5 w-5 text-green-600" />}
              {descStatus.isNotFound && <AlertCircle className="h-5 w-5 text-yellow-600" />}
              {!descStatus.hasRealContent && !descStatus.isNotFound && <Info className="h-5 w-5 text-gray-600" />}
              <span className={`font-medium ${
                descStatus.hasRealContent 
                  ? 'text-green-200'
                  : descStatus.isNotFound
                  ? 'text-yellow-200'
                  : 'text-gray-200'
              }`}>
                {descStatus.hasRealContent ? 'Informação Disponível' :
                 descStatus.isNotFound ? 'Informação Não Localizada' :
                 'Informação Não Disponível'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Descrição da Sessão</span>
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className={`leading-relaxed whitespace-pre-wrap ${
                descStatus.hasRealContent 
                  ? 'text-gray-300'
                  : 'text-gray-400 italic'
              }`}>
                {descStatus.displayText}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 p-4 rounded-lg border border-blue-700">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-800 rounded-md">
                <FileText className="h-4 w-4 text-blue-300" />
              </div>
              <div>
                <h4 className="font-medium text-blue-100 mb-1">
                  Convenção Coletiva de Trabalho
                </h4>
                <p className="text-sm text-blue-300">
                  Esta sessão faz parte da convenção coletiva de trabalho do estado de {session.estado}. 
                  {descStatus.hasRealContent 
                    ? ' As informações detalhadas estão disponíveis acima.'
                    : descStatus.isNotFound
                    ? ' Esta informação específica não foi localizada na convenção atual.'
                    : ' Consulte o documento completo da convenção para mais detalhes.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-700 bg-gray-700 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};