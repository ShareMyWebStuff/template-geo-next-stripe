import type {Config} from 'jest';
import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  verbose: true,
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', './data'],
  coverageThreshold: {
		global: {
			branches: 50,
			functions: 65,
			lines: 70,
			statements: 70
		}
	},
};

export default config;