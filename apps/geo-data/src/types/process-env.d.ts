// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    COPY_FILES: string
    DATABASE_UPLOAD_LOCATION: string
    LOCATION_TYPE: string
  }
}
