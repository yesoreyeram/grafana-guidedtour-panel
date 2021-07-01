import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { PanelProps, textUtil } from '@grafana/data';
import { Button, stylesFactory, useTheme } from '@grafana/ui';
import { selectors } from '@grafana/e2e-selectors';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import MarkdownIt from 'markdown-it';
import { GuidedTourOptions } from 'types';

interface GuidedTourPanelProps extends PanelProps<GuidedTourOptions> {}

const markdownToHTML = (mdText: string) => {
  const md = new MarkdownIt({ html: true });
  const html = md.render(mdText);
  const sanitizedHtml = textUtil.sanitize(html);
  return sanitizedHtml;
};

export const GuidedTourPanel = ({ options, data, width, height }: GuidedTourPanelProps) => {
  const theme = useTheme();
  const styles = getStyles();
  const [run, setRun] = useState(options.autoStart);
  const steps: Step[] = (options.steps || []).map(step => {
    return {
      target:
        step.selectBy === 'panelTitle'
          ? `div[aria-label='${selectors.components.Panels.Panel.containerByTitle(step.panelTitle)}']`
          : step.target,
      content: (
        <div
          style={{ textAlign: options.contentAlign || 'left' }}
          dangerouslySetInnerHTML={{ __html: markdownToHTML(step.content) }}
        ></div>
      ),
    };
  });
  console.log(steps);
  const cb = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
      if (status === STATUS.FINISHED && options.redirectURL) {
        window.location.href = options.redirectURL;
      }
    }
  };
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <>
        {!run && <Button onClick={e => setRun(true)}>{options.startButtonText || 'Run tour'}</Button>}
        {run && <Button onClick={e => setRun(false)}>{options.stopButtonText || 'Stop tour'}</Button>}
      </>
      <Joyride
        callback={cb}
        steps={steps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={false}
        showSkipButton={true}
        locale={{
          last: options.redirectURL && options.redirectURL.length > 0 ? options.redirectURLTitle || 'Next' : 'Finish',
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: options.primaryColor || '#F05A28',
            backgroundColor: options.backgroundColor || theme.colors.bg3,
            arrowColor: options.arrowColor || theme.colors.bg3,
            textColor: options.textColor || theme.colors.text,
          },
        }}
      />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});