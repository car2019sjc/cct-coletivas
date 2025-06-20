import { useState, useEffect } from 'react';
import { SessionData } from '../types';
import { staticConventionsData } from '../data/staticData';

export function useSharedData() {
  const [data, setData] = useState<SessionData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Carrega dados estáticos
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Carregando dados estáticos...');

      setData(staticConventionsData);
      const timestamp = new Date().toISOString();
      setLastUpdated(timestamp);
      
      console.log('✅ Dados estáticos carregados com sucesso!');
    } catch (err) {
      console.error('❌ Erro ao carregar dados:', err);
      setError('Erro ao carregar dados estáticos.');
    } finally {
      setLoading(false);
    }
  };

  // Efeito inicial para carregar os dados
  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, lastUpdated };
}