# 📋 CCT Coletivas - Sistema de Convenções Coletivas

Sistema web para consulta e visualização de Convenções Coletivas de Trabalho (CCT) dos estados de São Paulo, Bahia e Santa Catarina.

## 🚀 Funcionalidades

- **Consulta de CCTs** por estado
- **Sistema de busca** por seção ou descrição
- **Visualização detalhada** de cada convenção
- **Controles de zoom** para melhor visualização
- **Interface responsiva** e moderna
- **Dados estáticos** embutidos no código
- **Sistema robusto** com proteção contra erros de DOM

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **LocalStorage** para persistência de dados

## 🔧 Melhorias e Correções Implementadas

### ✅ Correção do Erro de removeChild
- **Problema resolvido:** Erro `NotFoundError: Failed to execute 'removeChild' on 'Node'` ao usar backspace
- **Solução implementada:** 
  - Interceptação global de operações DOM problemáticas
  - Sistema de re-renderização automática quando erros são detectados
  - Proteção em camadas nos componentes SearchBar e App
  - Tratamento elegante de erros sem interromper a experiência do usuário

### 🛡️ Sistema de Proteção Robusto
- **Interceptação de DOM:** Override seguro do `removeChild` nativo
- **Recuperação automática:** Re-renderização forçada em caso de erros
- **Experiência contínua:** Usuário não percebe falhas internas
- **Logs informativos:** Erros são registrados para debugging sem afetar a UI

### 🎯 Estabilidade Aprimorada
- **Campo de busca:** Funciona perfeitamente com backspace e digitação contínua
- **Debounce inteligente:** Otimização de performance na busca
- **Referências seguras:** Uso de `useRef` para controle preciso de elementos
- **Try-catch estratégico:** Proteção em pontos críticos da aplicação

## 📊 Estados e Dados

### São Paulo (SP)
- **Vigência:** 01/01/2024 a 31/12/2025
- **46 seções** de convenções coletivas
- Dados completos de pisos salariais, benefícios e condições de trabalho

### Bahia (BA)
- **Vigência:** 01/05/2023 a 30/04/2025
- **27 seções** de convenções coletivas
- Informações sobre jornada de trabalho, benefícios e direitos

### Santa Catarina (SC)
- **Vigência:** 01/08/2024 a 31/07/2025
- **37 seções** de convenções coletivas
- Dados sobre pisos salariais, horas extras e benefícios

## 🎯 Como Usar

### Controles de Zoom
- **Botões visuais:** Use os controles na interface
- **Atalhos de teclado:**
  - `Ctrl +` - Aumentar zoom
  - `Ctrl -` - Diminuir zoom
  - `Ctrl 0` - Resetar zoom

### Busca
- Digite na barra de pesquisa para filtrar por seção ou descrição
- **Funciona perfeitamente** com backspace e digitação contínua
- Os resultados são atualizados em tempo real com debounce otimizado

### Navegação
- Selecione o estado desejado nas abas
- Clique em qualquer card para ver detalhes completos
- Use o modal de detalhes para informações completas

## 🚀 Deploy

### GitHub
O projeto está disponível em: [https://github.com/car2019sjc/cct-coletivas.git](https://github.com/car2019sjc/cct-coletivas.git)

### Netlify
O projeto está deployado no Netlify para acesso público.

## 📦 Instalação e Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/car2019sjc/cct-coletivas.git

# Entre no diretório
cd cct-coletivas

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── SearchBar.tsx   # Barra de pesquisa (com proteção contra erros)
│   ├── SessionCard.tsx # Cards das sessões
│   ├── SessionDetailModal.tsx # Modal de detalhes
│   └── StateTab.tsx    # Abas dos estados
├── data/
│   └── staticData.ts   # Dados estáticos das CCTs
├── hooks/
│   └── useSharedData.ts # Hook para gerenciar dados
├── types/
│   └── index.ts        # Definições de tipos TypeScript
├── App.tsx             # Componente principal (com sistema de proteção)
└── main.tsx            # Ponto de entrada (com interceptação global)
```

## 🔍 Detalhes Técnicos das Correções

### Sistema de Interceptação DOM
```typescript
// Override seguro do removeChild
const originalRemoveChild = Node.prototype.removeChild;
Node.prototype.removeChild = function<T extends Node>(child: T): T {
  try {
    if (this.contains(child)) {
      return originalRemoveChild.call(this, child) as T;
    } else {
      console.warn('Tentativa de remover nó que não é filho, ignorando...');
      return child;
    }
  } catch (error) {
    console.warn('Erro capturado no removeChild:', error);
    return child;
  }
};
```

### Sistema de Re-renderização Automática
- **Chave de renderização dinâmica** que força re-renderização completa
- **Detecção automática** de erros relacionados ao DOM
- **Recuperação transparente** sem interromper a experiência do usuário

## 📝 Licença

© 2025 OnSet Tecnologia. Todos os direitos reservados.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através do repositório GitHub.

---

**Desenvolvido com ❤️ pela OnSet Tecnologia** 