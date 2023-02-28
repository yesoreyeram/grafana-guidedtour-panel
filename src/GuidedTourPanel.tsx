import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';
import Joyride, { CallBackProps, Step, STATUS, LIFECYCLE, ACTIONS } from 'react-joyride';
import { TourController } from './components/TourController';
import { StepContainer } from './components/StepContainer';
import { getStepSelector } from './core';
import { getJoyRideStyles } from './styles';
import { GuidedTourOptions } from './types';

export const GuidedTourPanel = (props: PanelProps<GuidedTourOptions>) => {
  const { options } = props;
  const theme = useTheme2();
  const joyRideStyles = getJoyRideStyles(props, theme);
  const [run, setRun] = useState(options.autoStart);
  const steps: Step[] = (options.steps || []).map((step) => {
    return {
      target: getStepSelector(step),
      disableBeacon: options.disableBeacon,
      content: <StepContainer content={step.content} contentAlign={options.contentAlign} backgroundImage={options.backgroundImage} />,
    };
  });
  const lastButtonText = options.redirectURL && options.redirectURL.length > 0 ? options.redirectURLTitle || 'Next' : 'Finish';
  // This callback method determines what needs to be done after each step
  const joyRideCallback = (data: CallBackProps) => {
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if ((data.action === ACTIONS.CLOSE && data.lifecycle === LIFECYCLE.COMPLETE) || finishedStatuses.includes(data.status)) {
      setRun(false);
    }
    if (data.action === ACTIONS.NEXT && data.lifecycle === LIFECYCLE.COMPLETE && options.redirectURL && data.index === steps.length - 1) {
      window.location.href = options.redirectURL;
    }
  };
  return (
    <div style={{ position: 'relative', width: `${props.width}px`, height: `${props.height}px` }}>
      <TourController
        run={run}
        setRun={setRun}
        panelContent={options.panelContent}
        panelTextColor={options.panelTextColor}
        panelBackgroundColor={options.panelBackgroundColor}
        panelBackgroundImage={options.panelBackgroundImage}
        startButtonText={options.startButtonText}
        stopButtonText={options.stopButtonText}
        buttonPaddingX={options.buttonPaddingX}
        buttonPaddingY={options.buttonPaddingY}
      />
      <div className="guidedtour-step">
        <Joyride
          callback={joyRideCallback}
          steps={steps}
          run={run}
          continuous={true}
          scrollToFirstStep={true}
          scrollOffset={options.scrollOffset || 100}
          showProgress={options.showProgress}
          showSkipButton={options.showSkipButton}
          hideBackButton={options.hideBackButton}
          floaterProps={{ placement: options.floaterPropsPlacement || 'top' }}
          locale={{ last: lastButtonText }}
          styles={joyRideStyles}
        />
      </div>
    </div>
  );
};
