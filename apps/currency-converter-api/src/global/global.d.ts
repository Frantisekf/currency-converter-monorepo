declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIXER_API_KEY: string | undefined
      FIXER_BASE_URL: string
      SERVER_PORT: string
      DB_PASSWORD: string
    }
  }
}
export {}
