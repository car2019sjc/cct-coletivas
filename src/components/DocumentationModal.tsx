import React, { useState } from 'react';
import { X, Book, FileText, Upload, Settings, Code, HelpCircle, CheckCircle, AlertTriangle, Info, Download, Eye, Search } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <Book className="h-4 w-4" /> },
    { id: 'usage', label: 'Como Usar', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'upload', label: 'Upload Multi-Abas', icon: <Upload className="h-4 w-4" /> },
    { id: 'admin', label: 'Administração', icon: <Settings className="h-4 w-4" /> },
    { id: 'technical', label: 'Especificações', icon: <Code className="h-4 w-4" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Sistema de Convenções Coletivas
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Este sistema foi desenvolvido para facilitar o acesso e consulta às informações das convenções 
                coletivas de trabalho de diferentes estados brasileiros. Permite visualizar, pesquisar e gerenciar 
                dados de sessões das convenções de forma organizada e intuitiva.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-100">Funcionalidades</h4>
                </div>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Visualização por estados</li>
                  <li>• Busca inteligente</li>
                  <li>• Upload multi-abas Excel</li>
                  <li>• Interface responsiva</li>
                  <li>• Classificação automática de conteúdo</li>
                </ul>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-100">Estados Suportados</h4>
                </div>
                <ul className="text-sm text-green-200 space-y-1">
                  <li>• São Paulo (SP)</li>
                  <li>• Bahia (BA)</li>
                  <li>• Santa Catarina (SC)</li>
                  <li>• Rio de Janeiro (RJ)</li>
                  <li>• Minas Gerais (MG)</li>
                  <li>• Paraná (PR)</li>
                  <li>• Expansível para outros estados</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-4 rounded-lg border border-orange-700">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-100 mb-1">
                    Sistema Multi-Abas
                  </h4>
                  <p className="text-sm text-orange-200">
                    O sistema agora suporta upload de arquivos Excel com múltiplas abas, onde cada aba 
                    representa um estado diferente. Isso permite carregar dados de vários estados em 
                    uma única operação, com identificação automática dos estados pelas abas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Classificação de Conteúdo</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2 p-2 bg-green-900/30 rounded">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-200">Descrição Completa</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-yellow-900/30 rounded">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-200">Não Localizada</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-gray-600 rounded">
                  <Info className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-200">Não Informada</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Upload Multi-Abas Excel
            </h3>

            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
              <h4 className="font-semibold text-blue-100 mb-2">
                🚀 Nova Funcionalidade: Upload Multi-Estados
              </h4>
              <p className="text-sm text-blue-200 mb-3">
                Agora você pode carregar dados de múltiplos estados em um único arquivo Excel, 
                usando uma aba para cada estado. O sistema identifica automaticamente os estados 
                pelos nomes das abas.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">
                📋 Estrutura do Arquivo Multi-Abas
              </h4>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h5 className="font-medium text-white mb-3">
                  Organização das Abas
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-sm font-medium text-gray-300 mb-2">
                      ✅ Nomes de Abas Aceitos:
                    </h6>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>"SP" ou "São Paulo"</span>
                        <span>→ São Paulo</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"BA" ou "Bahia"</span>
                        <span>→ Bahia</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"SC" ou "Santa Catarina"</span>
                        <span>→ Santa Catarina</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"RJ" ou "Rio de Janeiro"</span>
                        <span>→ Rio de Janeiro</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"MG" ou "Minas Gerais"</span>
                        <span>→ Minas Gerais</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"PR" ou "Paraná"</span>
                        <span>→ Paraná</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-300 mb-2">
                      📊 Exemplo de Estrutura:
                    </h6>
                    <div className="text-xs text-gray-400 font-mono bg-gray-700 p-2 rounded">
                      <div>📁 arquivo.xlsx</div>
                      <div>├── 📄 SP (27 sessões)</div>
                      <div>├── 📄 BA (25 sessões)</div>
                      <div>├── 📄 SC (22 sessões)</div>
                      <div>└── 📄 RJ (30 sessões)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h5 className="font-medium text-white mb-3">
                  Formato de Cada Aba
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[500px]">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2 bg-gray-700 font-semibold">Coluna A</th>
                        <th className="text-left p-2 bg-gray-700 font-semibold">Coluna B</th>
                        <th className="text-left p-2 bg-gray-700 font-semibold">Coluna C</th>
                        <th className="text-left p-2 bg-gray-700 font-semibold">Coluna D</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-600 bg-blue-900/30">
                        <td className="p-2 font-medium">Estado</td>
                        <td className="p-2 font-medium">Data</td>
                        <td className="p-2 font-medium">Sessão</td>
                        <td className="p-2 font-medium">Descrição</td>
                      </tr>
                      <tr className="border-b border-gray-600 text-gray-400">
                        <td className="p-2">São Paulo</td>
                        <td className="p-2">19/06/2025</td>
                        <td className="p-2">Pisos Salariais</td>
                        <td className="p-2">R$ 2.200,00 - Reajuste salarial base...</td>
                      </tr>
                      <tr className="border-b border-gray-600 text-gray-400">
                        <td className="p-2">São Paulo</td>
                        <td className="p-2">19/06/2025</td>
                        <td className="p-2">Vale Refeição</td>
                        <td className="p-2">Informação não localizada</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  <strong>Nota:</strong> A coluna A (Estado) é opcional - o sistema usará o nome da aba como estado.
                </p>
              </div>
            </div>

            <div className="bg-green-900/20 p-4 rounded-lg border border-green-700">
              <h4 className="font-semibold text-green-100 mb-2">
                ✅ Vantagens do Sistema Multi-Abas
              </h4>
              <ul className="text-sm text-green-200 space-y-1">
                <li>• <strong>Upload único:</strong> Carregue todos os estados de uma vez</li>
                <li>• <strong>Organização clara:</strong> Cada estado em sua própria aba</li>
                <li>• <strong>Identificação automática:</strong> Estados reconhecidos pelo nome da aba</li>
                <li>• <strong>Processamento paralelo:</strong> Todas as abas processadas simultaneamente</li>
                <li>• <strong>Relatório detalhado:</strong> Status individual por estado</li>
                <li>• <strong>Flexibilidade:</strong> Pode ter quantas abas quiser</li>
              </ul>
            </div>

            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-100 mb-2">
                    Requisitos Importantes
                  </h4>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Arquivo deve ser .xlsx ou .xls</li>
                    <li>• Cada aba deve ter primeira linha com cabeçalhos</li>
                    <li>• Coluna C (Sessão) é obrigatória em todas as abas</li>
                    <li>• Abas vazias são automaticamente ignoradas</li>
                    <li>• Nomes de abas devem corresponder aos estados suportados</li>
                    <li>• Máximo recomendado: 10 abas por arquivo</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">
                🔄 Processo de Upload Multi-Abas
              </h4>
              <ol className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                  <span>Prepare arquivo Excel com uma aba para cada estado</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                  <span>Acesse o painel Admin e faça login</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                  <span>Faça upload do arquivo - o sistema processará todas as abas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">4</span>
                  <span>Acompanhe o progresso em tempo real por estado</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">5</span>
                  <span>Verifique os resultados na interface principal</span>
                </li>
              </ol>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Como Usar o Sistema
            </h3>

            <div className="space-y-4">
              <div className="border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <span>Seleção de Estado</span>
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  Use as abas na parte superior para alternar entre os estados disponíveis. 
                  O número ao lado indica quantas sessões estão carregadas para cada estado.
                </p>
                <div className="bg-blue-900/20 p-3 rounded text-sm">
                  <strong>Dica:</strong> Estados com mais sessões carregadas aparecem com destaque visual.
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <Search className="h-4 w-4" />
                  <span>Busca e Filtros</span>
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  Use a barra de pesquisa para encontrar sessões específicas. A busca funciona nos campos:
                </p>
                <ul className="text-sm text-gray-400 ml-4 space-y-1 mb-3">
                  <li>• Nome da sessão (ex: "Pisos Salariais")</li>
                  <li>• Descrição da sessão (busca no conteúdo)</li>
                </ul>
                <div className="bg-green-900/20 p-3 rounded text-sm">
                  <strong>Exemplo:</strong> Digite "vale" para encontrar "Vale Refeição" e "Vale Transporte".
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  <Eye className="h-4 w-4" />
                  <span>Visualização dos Cards</span>
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Os cards das sessões são codificados por cores e ícones para indicar o status da informação:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-green-900/20 p-3 rounded border border-green-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-200">Descrição Completa</span>
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">✓</span>
                    </div>
                    <p className="text-xs text-green-300">
                      Informação detalhada disponível com conteúdo específico da convenção
                    </p>
                  </div>
                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-200">Informação Não Localizada</span>
                    </div>
                    <p className="text-xs text-yellow-300">
                      Sessão existe na convenção mas o conteúdo específico não foi encontrado
                    </p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded border border-gray-600">
                    <div className="flex items-center space-x-2 mb-1">
                      <Info className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-200">Descrição Não Informada</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Sessão identificada mas sem descrição no arquivo carregado
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  <FileText className="h-4 w-4" />
                  <span>Detalhes da Sessão</span>
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  Clique em qualquer card para abrir o modal com informações detalhadas:
                </p>
                <ul className="text-sm text-gray-400 ml-4 space-y-1">
                  <li>• Data da sessão formatada</li>
                  <li>• Estado de origem</li>
                  <li>• Descrição completa (quando disponível)</li>
                  <li>• Status visual da informação</li>
                  <li>• Contexto sobre a convenção coletiva</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'admin':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Painel de Administração
            </h3>

            <div className="bg-red-900/20 p-4 rounded-lg border border-red-700">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-100 mb-1">
                    Acesso Restrito
                  </h4>
                  <p className="text-sm text-red-200">
                    O painel administrativo requer autenticação. Use as credenciais fornecidas para acessar 
                    as funcionalidades de upload e gerenciamento de dados.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Credenciais de Acesso</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Usuário
                    </label>
                    <div className="bg-gray-800 p-2 rounded border border-gray-600 font-mono text-sm">
                      admin
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Senha
                    </label>
                    <div className="bg-gray-800 p-2 rounded border border-gray-600 font-mono text-sm">
                      admin123
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Funcionalidades Disponíveis</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2 flex items-center space-x-2">
                    <Upload className="h-4 w-4 text-blue-600" />
                    <span>Upload Multi-Abas Excel</span>
                  </h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Carregue um único arquivo Excel com múltiplas abas, cada uma representando um estado.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Processamento automático de todas as abas</li>
                    <li>• Identificação automática dos estados</li>
                    <li>• Feedback em tempo real por estado</li>
                    <li>• Relatório detalhado de estatísticas</li>
                    <li>• Mesclagem com dados existentes</li>
                  </ul>
                </div>

                <div className="border border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>Validação e Processamento</span>
                  </h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Sistema automático de validação e classificação dos dados carregados.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Verificação de formato das colunas</li>
                    <li>• Classificação automática de descrições</li>
                    <li>• Relatório de estatísticas pós-upload</li>
                    <li>• Identificação de conteúdo real vs. placeholders</li>
                    <li>• Mapeamento automático de estados</li>
                  </ul>
                </div>

                <div className="border border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2 flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-purple-600" />
                    <span>Gerenciamento Multi-Estados</span>
                  </h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Controle simultâneo dos dados de múltiplos estados com estatísticas detalhadas.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Suporte expandido para novos estados</li>
                    <li>• Contadores automáticos por estado</li>
                    <li>• Status de upload consolidado</li>
                    <li>• Processamento paralelo de abas</li>
                    <li>• Relatórios individuais por estado</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
              <h4 className="font-semibold text-blue-100 mb-2">
                Fluxo de Trabalho Multi-Abas
              </h4>
              <ol className="text-sm text-blue-200 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                  <span>Prepare arquivo Excel com uma aba para cada estado</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                  <span>Acesse o painel Admin e faça login</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                  <span>Faça upload do arquivo - todas as abas serão processadas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">4</span>
                  <span>Acompanhe o progresso em tempo real</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">5</span>
                  <span>Verifique os resultados na interface principal</span>
                </li>
              </ol>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Especificações Técnicas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-100 mb-2">
                  Tecnologias Frontend
                </h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• React 18.3.1 com TypeScript</li>
                  <li>• Vite para build e desenvolvimento</li>
                  <li>• Tailwind CSS para estilização</li>
                  <li>• Lucide React para ícones</li>
                  <li>• Hooks customizados para estado</li>
                </ul>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-100 mb-2">
                  Processamento de Dados
                </h4>
                <ul className="text-sm text-green-200 space-y-1">
                  <li>• XLSX.js para leitura de Excel</li>
                  <li>• LocalStorage para persistência</li>
                  <li>• Validação automática de formato</li>
                  <li>• Classificação inteligente de conteúdo</li>
                  <li>• Processamento multi-abas</li>
                  <li>• Mapeamento automático de estados</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Arquitetura do Sistema</h4>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-medium text-white mb-2">Estrutura de Componentes</h5>
                <div className="text-sm text-gray-300 font-mono bg-gray-800 p-3 rounded border border-gray-600 overflow-x-auto">
                  <div>src/</div>
                  <div>├── components/</div>
                  <div>│   ├── Header.tsx</div>
                  <div>│   ├── StateTab.tsx</div>
                  <div>│   ├── SearchBar.tsx</div>
                  <div>│   ├── SessionCard.tsx</div>
                  <div>│   ├── SessionDetailModal.tsx</div>
                  <div>│   ├── AdminModal.tsx</div>
                  <div>│   └── DocumentationModal.tsx</div>
                  <div>├── hooks/</div>
                  <div>│   └── useLocalStorage.ts</div>
                  <div>├── types/</div>
                  <div>│   └── index.ts</div>
                  <div>├── data/</div>
                  <div>│   └── mockData.ts</div>
                  <div>└── App.tsx</div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-medium text-white mb-2">Processamento Multi-Abas</h5>
                <div className="text-sm text-gray-300 font-mono bg-gray-800 p-3 rounded border border-gray-600 overflow-x-auto">
                  <div className="text-blue-400">// Mapeamento automático de estados</div>
                  <div className="text-green-400">const stateMapping = {'{'}</div>
                  <div className="ml-4">'sp': 'São Paulo',</div>
                  <div className="ml-4">'ba': 'Bahia',</div>
                  <div className="ml-4">'sc': 'Santa Catarina',</div>
                  <div className="ml-4">'rj': 'Rio de Janeiro',</div>
                  <div className="ml-4">'mg': 'Minas Gerais',</div>
                  <div className="ml-4">'pr': 'Paraná'</div>
                  <div className="text-green-400">{'};'}</div>
                  <br />
                  <div className="text-blue-400">// Processamento paralelo</div>
                  <div className="text-green-400">workbook.SheetNames.forEach(sheetName =&gt; {'{'}</div>
                  <div className="ml-4">const state = normalizeStateName(sheetName);</div>
                  <div className="ml-4">const sessions = processSheet(worksheet, state);</div>
                  <div className="text-green-400">{'});'}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Funcionalidades Técnicas</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Processamento Multi-Abas Excel</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Leitura automática de todas as abas do arquivo</li>
                    <li>• Mapeamento inteligente de nomes de abas para estados</li>
                    <li>• Processamento paralelo de múltiplas abas</li>
                    <li>• Validação individual por aba</li>
                    <li>• Relatório consolidado de estatísticas</li>
                    <li>• Tratamento de abas vazias ou inválidas</li>
                  </ul>
                </div>

                <div className="border border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Sistema de Estados Expandido</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Suporte para 6+ estados brasileiros</li>
                    <li>• Mapeamento flexível de abreviações</li>
                    <li>• Identificação automática por nome da aba</li>
                    <li>• Fallback para nomes não mapeados</li>
                    <li>• Expansibilidade para novos estados</li>
                  </ul>
                </div>

                <div className="border border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Feedback em Tempo Real</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Status de processamento por estado</li>
                    <li>• Contadores de sessões em tempo real</li>
                    <li>• Indicadores de conteúdo real vs. placeholder</li>
                    <li>• Relatório final consolidado</li>
                    <li>• Tratamento de erros por aba</li>
                  </ul>
                </div>

                <div className="border border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Persistência e Mesclagem</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Mesclagem inteligente com dados existentes</li>
                    <li>• Preservação de dados não afetados</li>
                    <li>• Backup automático antes de atualizações</li>
                    <li>• Sincronização com interface em tempo real</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700">
              <h4 className="font-semibold text-yellow-100 mb-2">
                Limitações e Considerações
              </h4>
              <ul className="text-sm text-yellow-200 space-y-1">
                <li>• Dados armazenados localmente (não sincronizados entre dispositivos)</li>
                <li>• Limite de ~5MB para LocalStorage (aproximadamente 50.000 sessões)</li>
                <li>• Processamento de Excel limitado a arquivos de até 10MB</li>
                <li>• Máximo recomendado de 10 abas por arquivo</li>
                <li>• Autenticação básica apenas para demonstração</li>
                <li>• Interface otimizada para desktop e tablets</li>
              </ul>
            </div>

            <div className="bg-green-900/20 p-4 rounded-lg border border-green-700">
              <h4 className="font-semibold text-green-100 mb-2">
                Melhorias da Versão Multi-Abas
              </h4>
              <ul className="text-sm text-green-200 space-y-1">
                <li>• ✅ Upload único para múltiplos estados</li>
                <li>• ✅ Identificação automática de estados</li>
                <li>• ✅ Processamento paralelo otimizado</li>
                <li>• ✅ Feedback detalhado em tempo real</li>
                <li>• ✅ Mapeamento flexível de nomes de abas</li>
                <li>• ✅ Relatórios consolidados por estado</li>
                <li>• ✅ Tratamento robusto de erros</li>
                <li>• ✅ Interface administrativa simplificada</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
          <div className="flex items-center space-x-3">
            <Book className="h-6 w-6" />
            <h2 className="text-xl font-bold">Documentação Completa</h2>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors p-2 hover:bg-blue-700 rounded-md"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-700 border-r border-gray-600 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};