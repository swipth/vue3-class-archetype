/// <reference types="vite/client" />

interface ProcessEnv {
  readonly VUE_APP_BASE_URL: string;
  readonly VUE_APP_OUT_PUT_NAME: string;
  readonly VUE_APP_BASE_API: string;
}

// eslint-disable-next-line no-unused-vars
interface Process {
  readonly env: ProcessEnv
}
