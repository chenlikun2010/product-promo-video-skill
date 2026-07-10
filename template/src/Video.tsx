import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {SCENE_FRAMES, TRANSITION_FRAMES} from './theme';
import {BgMusic} from './components';
import {
  Scene1,
  Scene2,
  Scene3,
  Scene4,
  Scene5,
  Scene6,
  Scene7,
  Scene8,
  Scene9,
} from './scenes/AllScenes';

const SCENES = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9];
const FRAMES = [
  SCENE_FRAMES.s1,
  SCENE_FRAMES.s2,
  SCENE_FRAMES.s3,
  SCENE_FRAMES.s4,
  SCENE_FRAMES.s5,
  SCENE_FRAMES.s6,
  SCENE_FRAMES.s7,
  SCENE_FRAMES.s8,
  SCENE_FRAMES.s9,
];

export const TOTAL_FRAMES =
  FRAMES.reduce((a, b) => a + b, 0) - (SCENES.length - 1) * TRANSITION_FRAMES;

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#2A1B16'}}>
      <BgMusic base={0.85} />
      <TransitionSeries>
        {SCENES.map((Scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={FRAMES[i]}>
              <Scene />
            </TransitionSeries.Sequence>
            {i < SCENES.length - 1 ? (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
              />
            ) : null}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
