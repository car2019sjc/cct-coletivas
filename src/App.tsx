import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Header } from './components/Header';
import { StateTab } from './components/StateTab';
import { SearchBar } from './components/SearchBar';
import { SessionCard } from './components/SessionCard';
import { SessionDetailModal } from './components/SessionDetailModal';
import { AdminModal } from './components/AdminModal';
import { DocumentationModal } from './components/DocumentationModal';
import { useSharedData } from './hooks/useSharedData';
import { Session, SessionData } from './types';

const STATES = [
  { name: 'São Paulo', icon: <MapPin className="h-4 w-4" /> },
  { name: 'Bahia', icon: <MapPin className="h-4 w-4" /> },
  { name: 'Santa Catarina', icon: <MapPin className="h-4 w-4" /> }
];

function App() {
  const [activeState, setActiveState] = useState('São Paulo');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDocumentationModalOpen, setIsDocumentationModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isRenderSafe, setIsRenderSafe] = useState(true);
  const mountedRef = useRef(true);
  const [renderKey, setRenderKey] = useState(0);

  const { data: conventionsData, loading, error, lastUpdated } = useSharedData();

  // Proteção contra erros de DOM
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error && event.error.message && event.error.message.includes('removeChild')) {
        console.warn('Erro de removeChild detectado, forçando re-renderização completa...');
        
        // Força uma re-renderização completa mudando a chave
        setRenderKey(prev => prev + 1);
        
        // Previne o erro de aparecer no console
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      mountedRef.current = false;
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    if (!isRenderSafe) return;
    setSearchTerm(value);
  }, [isRenderSafe]);

  const filteredSessions = useMemo(() => {
    try {
      const sessions = conventionsData[activeState] || [];
      
      if (!searchTerm || searchTerm.trim() === '') {
        return sessions;
      }
      
      return sessions.filter(session => {
        if (!session || !session.sessao || !session.descricao) {
          return false;
        }
        
        const searchLower = searchTerm.toLowerCase().trim();
        const sessaoLower = session.sessao.toLowerCase();
        const descricaoLower = session.descricao.toLowerCase();
        
        return sessaoLower.includes(searchLower) || descricaoLower.includes(searchLower);
      });
    } catch (error) {
      console.error('Erro na filtragem de sessões:', error);
      return [];
    }
  }, [conventionsData, activeState, searchTerm]);

  const handleSessionClick = useCallback((session: Session) => {
    setSelectedSession(session);
    setIsDetailModalOpen(true);
  }, []);

  const handleCloseDetailModal = () => {
    setSelectedSession(null);
    setIsDetailModalOpen(false);
  };

  const handleDataUpdate = (data: SessionData) => {
    console.log('Dados atualizados:', data);
  };

  const handleOpenDocumentation = () => {
    setIsDocumentationModalOpen(true);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case '+':
          case '=':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleZoomReset();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4 text-4xl">⚠️</div>
          <p className="text-red-400 mb-2 font-semibold">Erro ao carregar dados</p>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!isRenderSafe) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-yellow-400 mb-4 text-4xl">⚠️</div>
          <p className="text-yellow-300">Recuperando de erro de renderização...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col" key={renderKey}>
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-900/20 px-4 py-2 rounded-lg border border-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-green-300 font-medium">
              📊 Sistema de Dados Estáticos Ativo
            </p>
          </div>
          {lastUpdated && (
            <p className="text-xs text-gray-400 mt-1">
              Última atualização: {new Date(lastUpdated).toLocaleString('pt-BR')}
            </p>
          )}
        </div>

        <div className="flex justify-center items-center mb-4">
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2 border border-gray-700">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Diminuir zoom (Ctrl -)"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm font-mono px-2 py-1 bg-gray-700 rounded min-w-[60px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Aumentar zoom (Ctrl +)"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleZoomReset}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors"
              title="Resetar zoom (Ctrl 0)"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {STATES.map((state) => (
              <StateTab
                key={state.name}
                state={state.name}
                isActive={activeState === state.name}
                onClick={() => setActiveState(state.name)}
                icon={state.icon}
                count={conventionsData[state.name]?.length || 0}
              />
            ))}
          </div>

          <SearchBar onSearchChange={handleSearchChange} />

          <div 
            style={{ 
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center top',
              transition: 'transform 0.2s ease-in-out',
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, index) => (
                  <SessionCard 
                    key={`${activeState}-${session.id}-${index}`}
                    session={session} 
                    onClick={() => handleSessionClick(session)} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">
                      {searchTerm ? 'Nenhuma sessão encontrada' : 'Nenhuma sessão disponível'}
                    </p>
                    <p className="text-sm">
                      {searchTerm 
                        ? 'Tente ajustar os termos de busca' 
                        : `Carregue dados para ${activeState} através do painel Admin`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              Mostrando {filteredSessions.length} de {conventionsData[activeState]?.length || 0} sessões
              {searchTerm && ` para "${searchTerm}"`}
            </p>
            <div className="mt-2 text-xs">
              <p>
                📊 Total de estados carregados: {Object.keys(conventionsData).length} • 
                Total de sessões: {Object.values(conventionsData).reduce((sum, sessions) => sum + sessions.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 OnSet Tecnologia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Sistema de Dados Estáticos • Dados embutidos no código
          </p>
        </div>
      </footer>

      <SessionDetailModal
        session={selectedSession}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onDataUpdate={handleDataUpdate}
        onOpenDocumentation={handleOpenDocumentation}
      />

      <DocumentationModal
        isOpen={isDocumentationModalOpen}
        onClose={() => setIsDocumentationModalOpen(false)}
      />
    </div>
  );
}

export default App;