import { gte } from 'semver';
import { config } from '@grafana/runtime';
import { Step } from './types';

export const getStepSelector = (step: Step): string => {
  switch (step.selectBy) {
    case 'panelTitle':
      return panelSelectorByPanelTitle(step.panelTitle);
    case 'customTarget':
      return step.target;
    default:
      return '';
  }
};

// This plugin heavily depends on dashboard attributes and selectors
// This makes hard to follow the breaking changes in grafana
// Recent breaking change which modify the panel container selector: https://github.com/grafana/grafana/pull/36753
// Ideally, we need to get the container selector from `@grafana/e2e-selectors`. Example: `selectors.components.Panels.Panel.containerByTitle(panelTitle);
// Currently `@grafana/e2e-selectors` are not currently exposed to the plugins.
// Refer : https://github.com/grafana/grafana/blob/v8.1.5/packages/grafana-toolkit/src/config/webpack.plugin.config.ts#L172
// Refer : https://github.com/grafana/grafana/blob/v8.1.5/public/app/features/plugins/plugin_loader.ts#L87
const panelSelectorByPanelTitle = (panelTitle: string): string => {
  if (gte(config.buildInfo.version, '9.5.0')) {
    return `div[data-testid='data-testid Panel dashboard ${panelTitle}']`;
  } else if (gte(config.buildInfo.version, '8.1.0')) {
    return `section[aria-label='${panelTitle} panel']`;
  } else {
    return `div[aria-label='Panel container title ${panelTitle}']`;
  }
};
