export interface Session {
  id: string;
  estado: string;
  data: string;
  sessao: string;
  descricao: string;
}

export interface SessionData {
  [key: string]: Session[];
}

export interface AdminCredentials {
  username: string;
  password: string;
}