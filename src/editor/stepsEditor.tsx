import React from 'react';
import { set } from 'lodash';
import { StandardEditorProps } from '@grafana/data';
import { Button, Input, TextArea, Select, InlineFormLabel } from '@grafana/ui';
import { Step, DEFAULT_STEP, StepSelectTypeOptions } from './../types';

export const StepEditor = (props: StandardEditorProps<Step[]>) => {
  const { value: steps = [], onChange } = props;
  const addStep = () => {
    const newSteps: Step[] = [...steps];
    newSteps.push({ ...DEFAULT_STEP });
    onChange(newSteps);
  };
  const onStepRemove = (index: number) => {
    const newSteps: Step[] = [...steps];
    newSteps.splice(index, 1);
    onChange(newSteps);
  };
  const onValueChange = (key: string, value: string | boolean) => {
    const newSteps: Step[] = [...steps];
    set(newSteps, key, value);
    onChange(newSteps);
  };
  const onMoveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps: Step[] = [...steps];
    let tmp = newSteps[index];
    newSteps[index] = newSteps[direction === 'up' ? index - 1 : index + 1];
    newSteps[direction === 'up' ? index - 1 : index + 1] = tmp;
    onChange(newSteps);
  };
  return (
    <>
      {steps.map((step, index) => (
        <>
          <h5>Step {index + 1}</h5>
          <div className="gf-form">
            <InlineFormLabel>Target</InlineFormLabel>
            <Select
              options={StepSelectTypeOptions}
              value={step.selectBy}
              onChange={(e) => onValueChange(`${index}.selectBy`, e.value + '')}
            />
          </div>
          {step.selectBy === 'panelTitle' && (
            <div className="gf-form">
              <InlineFormLabel>Target Panel Title</InlineFormLabel>
              <Input
                value={step.panelTitle}
                onChange={(e) => onValueChange(`${index}.panelTitle`, e.currentTarget.value)}
              />
            </div>
          )}
          {step.selectBy === 'customTarget' && (
            <div className="gf-form">
              <InlineFormLabel>CSS Selector</InlineFormLabel>
              <Input value={step.target} onChange={(e) => onValueChange(`${index}.target`, e.currentTarget.value)} />
            </div>
          )}
          <div className="gf-form">
            <InlineFormLabel>Guided Tour Content</InlineFormLabel>
            <TextArea
              value={step.content}
              rows={3}
              onChange={(e) => onValueChange(`${index}.content`, e.currentTarget.value)}
            />
          </div>
          <div className="gf-form">
            <Button
              icon="trash-alt"
              variant="destructive"
              size="sm"
              style={{ margin: '5px' }}
              onClick={() => onStepRemove(index)}
            >
              Remove step {index + 1}
            </Button>
            {index !== 0 && (
              <Button
                icon="arrow-up"
                size="sm"
                variant="secondary"
                style={{ margin: '5px' }}
                onClick={() => onMoveStep(index, 'up')}
              >
                Move Up
              </Button>
            )}
            {index !== steps.length - 1 && (
              <Button
                icon="arrow-down"
                size="sm"
                variant="secondary"
                style={{ margin: '5px' }}
                onClick={() => onMoveStep(index, 'down')}
              >
                Move Down
              </Button>
            )}
          </div>
          <br />
        </>
      ))}
      <br />
      {<Button onClick={addStep}>Add Step</Button>}
    </>
  );
};
