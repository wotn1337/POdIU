declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_BACKEND_URL: string;
    }
  }
}

export {};
