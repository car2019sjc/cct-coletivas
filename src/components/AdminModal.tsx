import React, { useState } from 'react';
import { X, Upload, User, Lock, FileSpreadsheet, CheckCircle, AlertCircle, Book, Cloud, Database } from 'lucide-react';
import * as XLSX from 'xlsx';
import { SessionData, Session } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdate: (data: SessionData) => void;
  onOpenDocumentation: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ 
  isOpen, 
  onClose, 
  onDataUpdate, 
  onOpenDocumentation 
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingDetails, setProcessingDetails] = useState<{[key: string]: any}>({});

  // Credenciais hardcoded para demo (em produção, usar autenticação real)
  const ADMIN_CREDENTIALS = { username: 'admin', password: 'Up2025It' };

  const handleDownloadJson = () => {
    const conventionsData = localStorage.getItem('conventionsData');
    const lastUpdated = localStorage.getItem('conventionsLastUpdated') || new Date().toISOString();

    if (!conventionsData) {
      alert('Nenhum dado para baixar. Faça o upload de um arquivo primeiro.');
      return;
    }

    const dataToDownload = {
      lastUpdated,
      version: "1.0.1", // Incrementa a versão ou usa uma lógica de versionamento
      data: JSON.parse(conventionsData),
    };

    const jsonString = JSON.stringify(dataToDownload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conventions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === ADMIN_CREDENTIALS.username && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Credenciais inválidas');
    }
  };

  const normalizeStateName = (sheetName: string): string => {
    const name = sheetName.toLowerCase().trim();
    
    // Mapeamento de nomes de abas para estados padronizados
    const stateMapping: {[key: string]: string} = {
      'sp': 'São Paulo',
      'sao paulo': 'São Paulo',
      'são paulo': 'São Paulo',
      'saopaulo': 'São Paulo',
      'ba': 'Bahia',
      'bahia': 'Bahia',
      'sc': 'Santa Catarina',
      'santa catarina': 'Santa Catarina',
      'santacatarina': 'Santa Catarina',
      'rs': 'Rio Grande do Sul',
      'rio grande do sul': 'Rio Grande do Sul',
      'rj': 'Rio de Janeiro',
      'rio de janeiro': 'Rio de Janeiro',
      'mg': 'Minas Gerais',
      'minas gerais': 'Minas Gerais',
      'pr': 'Paraná',
      'parana': 'Paraná',
      'paraná': 'Paraná'
    };

    return stateMapping[name] || sheetName; // Retorna o nome original se não encontrar mapeamento
  };

  const processExcelSheet = (worksheet: any, stateName: string): Session[] => {
    console.log(`\n📊 PROCESSANDO ABA: ${stateName}`);
    console.log('📋 Range:', worksheet['!ref']);
    
    if (!worksheet['!ref']) {
      console.log('⚠️ Aba vazia, pulando...');
      return [];
    }
    
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const sessions: Session[] = [];
    let realDescriptions = 0;
    let notFoundDescriptions = 0;
    let emptyDescriptions = 0;
    
    // Itera linha por linha, começando da linha 2 (índice 1, pois 0 é cabeçalho)
    for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
      // Lê cada célula diretamente
      const cellA = worksheet[XLSX.utils.encode_cell({ r: rowNum, c: 0 })]; // Coluna A - Estado
      const cellB = worksheet[XLSX.utils.encode_cell({ r: rowNum, c: 1 })]; // Coluna B - Data
      const cellC = worksheet[XLSX.utils.encode_cell({ r: rowNum, c: 2 })]; // Coluna C - Sessão
      const cellD = worksheet[XLSX.utils.encode_cell({ r: rowNum, c: 3 })]; // Coluna D - Descrição
      
      // Extrai valores das células
      const estado = cellA?.v ? cellA.v.toString().trim() : stateName;
      const dataRaw = cellB?.v || '';
      const sessao = cellC?.v ? cellC.v.toString().trim() : '';
      const descricao = cellD?.v ? cellD.v.toString().trim() : '';
      
      // Pula linhas onde sessão está vazia
      if (!sessao) {
        continue;
      }
      
      // Classifica o tipo de descrição
      if (!descricao) {
        emptyDescriptions++;
      } else if (descricao === 'Informação não localizada') {
        notFoundDescriptions++;
      } else {
        realDescriptions++;
      }
      
      // Formata a data
      let formattedDate = '';
      if (dataRaw) {
        if (cellB?.t === 'd' || cellB?.t === 'n') {
          // É uma data do Excel
          const excelDate = typeof dataRaw === 'number' ? 
            new Date((dataRaw - 25569) * 86400 * 1000) : 
            new Date(dataRaw);
          formattedDate = excelDate.toISOString().split('T')[0];
        } else {
          // É texto
          const dataStr = dataRaw.toString().trim();
          if (dataStr.includes('/')) {
            const parts = dataStr.split('/');
            if (parts.length === 3) {
              // Assume DD/MM/YYYY
              const day = parseInt(parts[0]);
              const month = parseInt(parts[1]) - 1; // Mês é 0-indexed
              const year = parseInt(parts[2]);
              const parsedDate = new Date(year, month, day);
              formattedDate = parsedDate.toISOString().split('T')[0];
            }
          } else {
            formattedDate = dataStr;
          }
        }
      }
      
      if (!formattedDate) {
        formattedDate = new Date().toISOString().split('T')[0];
      }
      
      // Cria a sessão
      const session: Session = {
        id: `${stateName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${rowNum}`,
        estado: stateName,
        data: formattedDate,
        sessao,
        descricao: descricao || 'Descrição não informada'
      };
      
      sessions.push(session);
    }
    
    console.log(`📈 ${stateName}: ${sessions.length} sessões`);
    console.log(`  ✅ Com descrição real: ${realDescriptions}`);
    console.log(`  ⚠️ "Informação não localizada": ${notFoundDescriptions}`);
    console.log(`  ❌ Descrições vazias: ${emptyDescriptions}`);
    
    return sessions;
  };

  const processMultiSheetExcel = (file: File): Promise<SessionData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array', cellText: false, cellDates: true });
          
          console.log('\n🚀 INICIANDO PROCESSAMENTO MULTI-ABAS');
          console.log('📁 Arquivo:', file.name);
          console.log('📊 Abas encontradas:', workbook.SheetNames);
          
          const allSessionsData: SessionData = {};
          let totalSessions = 0;
          const processedStates: string[] = [];
          
          // Processa cada aba
          workbook.SheetNames.forEach((sheetName, index) => {
            console.log(`\n📋 Processando aba ${index + 1}/${workbook.SheetNames.length}: "${sheetName}"`);
            
            const worksheet = workbook.Sheets[sheetName];
            const normalizedStateName = normalizeStateName(sheetName);
            
            console.log(`🗺️ Estado identificado: ${normalizedStateName}`);
            
            const sessions = processExcelSheet(worksheet, normalizedStateName);
            
            if (sessions.length > 0) {
              allSessionsData[normalizedStateName] = sessions;
              totalSessions += sessions.length;
              processedStates.push(normalizedStateName);
              
              // Atualiza status em tempo real
              setProcessingDetails(prev => ({
                ...prev,
                [normalizedStateName]: {
                  sessions: sessions.length,
                  realContent: sessions.filter(s => 
                    s.descricao && 
                    s.descricao !== 'Descrição não informada' && 
                    s.descricao !== 'Informação não localizada'
                  ).length
                }
              }));
            }
          });
          
          console.log('\n🎉 PROCESSAMENTO CONCLUÍDO');
          console.log(`📊 Total de estados processados: ${processedStates.length}`);
          console.log(`📈 Total de sessões: ${totalSessions}`);
          console.log('🗺️ Estados:', processedStates.join(', '));
          
          if (totalSessions === 0) {
            throw new Error('Nenhuma sessão válida encontrada em nenhuma aba do arquivo.');
          }
          
          resolve(allSessionsData);
        } catch (error) {
          console.error('❌ Erro ao processar Excel:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadStatus('Analisando arquivo Excel...');
    setProcessingDetails({});

    try {
      console.log(`\n🚀 INICIANDO UPLOAD MULTI-ESTADOS`);
      console.log('📁 Arquivo:', file.name, 'Tamanho:', file.size, 'bytes');
      
      setUploadStatus('Processando abas por estado...');
      const newSessionsData = await processMultiSheetExcel(file);
      
      setUploadStatus('Salvando dados compartilhados...');
      
      // CORREÇÃO: Mescla profunda dos dados existentes com os novos dados
      const existingDataString = localStorage.getItem('conventionsData');
      const existingData = existingDataString ? JSON.parse(existingDataString) : {};
      
      // Mescla os dados, garantindo que os novos estados sobrescrevam os antigos se houver conflito,
      // mas preservando os estados que não estão no novo arquivo.
      const mergedData = { ...existingData, ...newSessionsData };

      // O hook `onDataUpdate` espera o objeto de dados principal
      await onDataUpdate(mergedData);
      
      setUploadStatus('✓ Sucesso! Dados atualizados e mesclados nos dados compartilhados!');

    } catch (error: any) {
      console.error("Erro no upload:", error);
      setUploadStatus(`Erro: ${error.message || 'Falha ao processar arquivo'}`);
      
      // Limpa o erro após 10 segundos
      setTimeout(() => {
        setUploadStatus('');
        setProcessingDetails({});
      }, 10000);
    } finally {
      setIsProcessing(false);
      // Limpa o input
      e.target.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            Painel Administrativo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Usuário
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Digite seu usuário"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Lock className="h-4 w-4 inline mr-2" />
                  Senha
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Digite sua senha"
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-sm">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Entrar
              </button>

              <div className="text-xs text-gray-400 mt-4">
                <p>Demo: usuário = admin, senha = Up2025It</p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-green-400 font-medium">Autenticado com sucesso.</p>
                <button onClick={() => setIsLoggedIn(false)} className="text-sm text-blue-400 hover:underline">Sair</button>
              </div>

              {/* Upload Section */}
              <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Cloud size={20} className="mr-3 text-blue-400"/>
                  Gerenciamento de Dados Compartilhados
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
                      <FileSpreadsheet size={16} className="inline mr-2" />
                      Fazer Upload de Planilha Multi-Estado (.xlsx)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload size={40} className="mx-auto text-gray-400" />
                        <div className="flex text-sm text-gray-500">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-blue-500">
                            <span>Carregar um arquivo</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} accept=".xlsx" />
                          </label>
                          <p className="pl-1">ou arraste e solte</p>
                        </div>
                        <p className="text-xs text-gray-500">Apenas arquivos .xlsx são suportados</p>
                      </div>
                    </div>
                  </div>
                  {isProcessing && (
                    <div className="bg-gray-600 p-4 rounded-lg">
                      <p className="text-sm font-medium text-yellow-300 mb-2">{uploadStatus}</p>
                    </div>
                  )}
                  {!isProcessing && uploadStatus && (
                    <div className={`p-4 rounded-lg ${uploadStatus.startsWith('Erro') ? 'bg-red-900' : 'bg-green-900'}`}>
                      <p className="text-sm font-medium flex items-center">{uploadStatus}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Section */}
              <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Database size={20} className="mr-3 text-green-400"/>
                  Exportar Dados Atuais
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Baixe o arquivo <code>conventions.json</code> atualizado para substituí-lo no projeto e tornar as alterações permanentes para todos.
                </p>
                <button
                  onClick={handleDownloadJson}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Baixar conventions.json
                </button>
              </div>

              {/* Documentation Section */}
              <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Book size={20} className="mr-3 text-purple-400"/>
                  Documentação e Estrutura
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Consulte a documentação para entender a estrutura correta da planilha Excel para importação.
                </p>
                <button 
                  onClick={onOpenDocumentation}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Ver Documentação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};