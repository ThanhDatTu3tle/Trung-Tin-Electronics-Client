/// <reference types="react-scripts" />

// typings/env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_ENDPOINT: string;
    }
  }
  