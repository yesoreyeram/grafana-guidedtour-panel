import { PanelPlugin } from '@grafana/data';
import { GuidedTourPanel } from './GuidedTourPanel';
import { StepEditor } from './editor/stepsEditor';
import { PanelContentEditor } from './editor/panelContentEditor';
import { GuidedTourOptions, ContentAlignOptions, FloaterPlacementOptions } from './types';

export const plugin = new PanelPlugin<GuidedTourOptions>(GuidedTourPanel).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      id: 'steps',
      name: '',
      path: 'steps',
      category: ['Tour Steps'],
      defaultValue: [],
      editor: StepEditor,
    })
    .addBooleanSwitch({
      path: 'autoStart',
      name: 'Auto start tour',
      defaultValue: false,
      category: ['Tour Settings'],
    })
    .addBooleanSwitch({
      path: 'disableBeacon',
      name: 'Disable initial beacon',
      defaultValue: false,
      category: ['Tour Settings'],
    })
    .addTextInput({
      path: 'startButtonText',
      name: 'Start button text',
      defaultValue: 'Start tour',
      category: ['Tour Settings'],
    })
    .addTextInput({
      path: 'stopButtonText',
      name: 'Stop button text',
      defaultValue: 'Stop tour',
      category: ['Tour Settings'],
    })
    .addTextInput({
      path: 'buttonPaddingX',
      name: 'Left and right padding for button',
      defaultValue: '0px',
      category: ['Tour Settings'],
    })
    .addTextInput({
      path: 'buttonPaddingY',
      name: 'Top and bottom padding for button',
      defaultValue: '0px',
      category: ['Tour Settings'],
    })
    .addColorPicker({
      path: 'panelBackgroundColor',
      name: 'Control Panel Background color',
      defaultValue: 'transparent',
      category: ['Tour Settings'],
    })
    .addTextInput({
      path: 'panelBackgroundImage',
      name: 'Control Panel background image url',
      description: 'optional',
      category: ['Tour Settings'],
    })
    .addColorPicker({
      path: 'panelTextColor',
      name: 'Control Panel Text color',
      defaultValue: 'white',
      category: ['Tour Settings'],
    })
    .addCustomEditor({
      id: 'panelContent',
      path: 'panelContent',
      name: 'Control Panel content',
      description: 'Optional',
      category: ['Tour Settings'],
      editor: PanelContentEditor,
    })
    .addColorPicker({
      path: 'primaryColor',
      name: 'Primary Color',
      defaultValue: '#F05A28',
      category: ['Tour Style'],
    })
    .addColorPicker({
      path: 'backgroundColor',
      name: 'Background Color',
      category: ['Tour Style'],
    })
    .addTextInput({
      path: 'backgroundImage',
      name: 'Background Image of the tour',
      description: 'Optional. Experimental',
      category: ['Tour Style'],
    })
    .addColorPicker({
      path: 'arrowColor',
      name: 'Arrow Color',
      category: ['Tour Style'],
    })
    .addColorPicker({
      path: 'textColor',
      name: 'Text Color',
      category: ['Tour Style'],
    })
    .addRadio({
      path: 'contentAlign',
      name: 'Content Align',
      defaultValue: 'center',
      category: ['Tour Style'],
      settings: { options: ContentAlignOptions },
    })
    .addBooleanSwitch({
      path: 'showProgress',
      name: 'Show Progress ex:(1/4)',
      defaultValue: false,
      category: ['Tour Style'],
    })
    .addBooleanSwitch({
      path: 'showSkipButton',
      name: 'Show skip button',
      defaultValue: true,
      category: ['Tour Style'],
    })
    .addBooleanSwitch({
      path: 'hideBackButton',
      name: 'Hide back button',
      defaultValue: false,
      category: ['Tour Style'],
    })
    .addNumberInput({
      path: 'scrollOffset',
      name: 'Scroll offset',
      defaultValue: 100,
      category: ['Tour Style'],
    })
    .addTextInput({
      path: 'width',
      name: 'Width of the floater',
      defaultValue: '300px',
      category: ['Tour Style'],
    })
    .addRadio({
      path: 'floaterPropsPlacement',
      name: 'Floater placement',
      defaultValue: 'bottom',
      category: ['Tour Style'],
      settings: { options: FloaterPlacementOptions },
    })
    .addTextInput({
      path: 'redirectURL',
      name: 'Next URL',
      category: ['Tour Settings'],
      description: '(optional) URL of the page needs to redirected after last step',
    })
    .addTextInput({
      path: 'redirectURLTitle',
      name: 'Next URL Title',
      category: ['Tour Settings'],
      description: '(optional) Title to be shown in the last step',
      showIf: (options) => {
        return options.redirectURL && options.redirectURL.length > 0 ? true : false;
      },
    });
});
