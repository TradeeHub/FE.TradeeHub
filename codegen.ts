import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:5020/graphql/',
  documents: 'graphql/**/*.graphql',
  generates: {
    'generatedGraphql.tsx': {
      // preset: "client",
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ]
    }
  }
};

export default config;
