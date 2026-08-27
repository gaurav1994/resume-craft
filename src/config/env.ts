export type AppEnvironment = 'development' | 'production'

type ImportMetaEnvConfig = ImportMetaEnv & {
  readonly VITE_APP_ENV?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_ENABLE_MOCK_DATA?: string
}

const rawEnv = import.meta.env as ImportMetaEnvConfig

export const appConfig = {
  environment: (rawEnv.VITE_APP_ENV ?? import.meta.env.MODE) as AppEnvironment,
  apiBaseUrl: rawEnv.VITE_API_BASE_URL ?? '',
  enableMockData: rawEnv.VITE_ENABLE_MOCK_DATA === 'true',
  isProduction: import.meta.env.PROD,
} as const
