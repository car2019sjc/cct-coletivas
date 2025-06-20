import React from 'react';
import { BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Convenções Coletivas 2025</h1>
        </div>
      </div>
    </header>
  );
};