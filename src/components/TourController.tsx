import React from 'react';
import { Button } from '@grafana/ui';
import { MarkdownRenderer } from './MarkdownRenderer';
import { normalizeColor } from './../utils';

export const TourController = (props: {
  panelContent?: string;
  panelTextColor?: string;
  panelBackgroundColor?: string;
  panelBackgroundImage?: string;
  buttonPaddingX?: string;
  buttonPaddingY?: string;
  startButtonText?: string;
  stopButtonText?: string;
  className?: string;
  run: boolean | undefined;
  setRun: (s: boolean) => void;
}) => {
  const { run, setRun } = props;
  const buttonStyle = {
    height: '100%',
    width: '100%',
    minHeight: '2em',
    minWidth: '2em',
    overflow: 'auto',
    justifyContent: 'center',
  } as const;
  return (
    <div
      className={props.className}
      style={{
        display: 'inline-block',
        height: '100%',
        width: '100%',
        paddingLeft: props.buttonPaddingX,
        paddingRight: props.buttonPaddingX,
        paddingTop: props.buttonPaddingY,
        paddingBottom: props.buttonPaddingY,
        color: normalizeColor(props.panelTextColor),
        backgroundColor: normalizeColor(props.panelBackgroundColor) || 'transparent',
        backgroundImage: props.panelBackgroundImage ? `url("${props.panelBackgroundImage}")` : '',
      }}
    >
      {props.panelContent && <MarkdownRenderer content={props.panelContent} />}
      {!run && (
        <Button style={buttonStyle} onClick={() => setRun(true)}>
          {props.startButtonText || 'Run tour'}
        </Button>
      )}
      {run && (
        <Button style={buttonStyle} onClick={() => setRun(false)}>
          {props.stopButtonText || 'Stop tour'}
        </Button>
      )}
    </div>
  );
};
