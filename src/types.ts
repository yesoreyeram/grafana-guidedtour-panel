import { SelectableValue } from '@grafana/data';

//#region Step Props
type StepSelectType = 'panelTitle' | 'customTarget';
type StepBase<T extends StepSelectType> = { selectBy: T; content: string };
type StepPanelTitle = { panelTitle: string } & StepBase<'panelTitle'>;
type StepCustomTarget = { target: string } & StepBase<'customTarget'>;
export type Step = StepPanelTitle | StepCustomTarget;
//#endregion

//#region Panel Props
export type FLOATER_PLACEMENT = 'top' | 'bottom' | 'left' | 'right';
export type CONTENT_ALIGNMENT = 'left' | 'center' | 'right';
export type GuidedTourOptions = {
  // Behavior props
  autoStart?: boolean;
  disableBeacon?: boolean;
  steps?: Step[];
  // Tour Controller props
  startButtonText?: string;
  stopButtonText?: string;
  buttonPaddingX?: string;
  buttonPaddingY?: string;
  panelTextColor?: string;
  panelBackgroundColor?: string;
  panelBackgroundImage?: string;
  panelContent?: string;
  floaterPropsPlacement?: FLOATER_PLACEMENT;
  // CTA props
  redirectURL?: string;
  redirectURLTitle?: string;
  // Tour step props
  contentAlign?: CONTENT_ALIGNMENT;
  width?: string;
  primaryColor?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  arrowColor?: string;
  textColor?: string;
  scrollOffset?: number;
  showProgress?: boolean;
  showSkipButton?: boolean;
  hideBackButton?: boolean;
};
//#endregion

//#region Selectable Options
export const StepSelectTypeOptions: Array<SelectableValue<StepSelectType>> = [
  { value: 'panelTitle', label: 'Panel' },
  { value: 'customTarget', label: 'Custom CSS Target' },
];
export const FloaterPlacementOptions: Array<SelectableValue<FLOATER_PLACEMENT>> = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
];
export const ContentAlignOptions: Array<SelectableValue<CONTENT_ALIGNMENT>> = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];
//#endregion

//#region Defaults
export const DEFAULT_STEP: Step = {
  selectBy: 'panelTitle',
  panelTitle: 'Panel Title',
  content: 'My awesome guided tour!',
};
//#endregion
