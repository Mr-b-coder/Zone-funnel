// This file is a workaround for a project setup issue where "vite/client" type definitions
// were not being found. By defining the types for `import.meta.env` manually,
// we can resolve the TypeScript errors in the project.

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // Add other Vite environment variables here as needed.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
