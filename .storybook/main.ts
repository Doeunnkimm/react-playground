import type { StorybookConfig } from '@storybook/react-vite';
import { InlineConfig } from 'vite';
import { componentDisplayName } from '../src/namespace-exports-displayName/storybook-utils/componentDisplayName';
import { tsMorphAddDisplayName } from '../src/namespace-exports-displayName/storybook-utils/tsMorphAddDisplayName';

const TEST_DIRECTORY = '**/src/namespace-exports-displayName/index.ts';

const viteFinal: StorybookConfig['viteFinal'] = (config: InlineConfig) => {
  config.plugins?.push(tsMorphAddDisplayName([TEST_DIRECTORY]));
  return config;
};

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal,
};
export default config;
