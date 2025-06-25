import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC<{ onSearchChange: (value: string) => void }> = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newValue = event.target.value;
      setSearchValue(newValue);
      
      // Debounce simples
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        try {
          onSearchChange(newValue);
        } catch (error) {
          console.warn('Erro ao chamar onSearchChange:', error);
        }
      }, 200);
    } catch (error) {
      console.warn('Erro no handleInputChange:', error);
      // Tenta novamente com um valor vazio
      setSearchValue('');
    }
  };

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.error && event.error.message && event.error.message.includes('removeChild')) {
        // Se o erro for relacionado ao input, limpa o valor
        if (inputRef.current) {
          setSearchValue('');
          inputRef.current.value = '';
        }
      }
    };

    window.addEventListener('error', handleGlobalError);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  return (
    <div className="relative max-w-md mx-auto mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Digite para buscar..."
        autoComplete="off"
        spellCheck="false"
        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};