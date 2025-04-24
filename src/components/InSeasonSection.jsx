import baseStyles from '../styles/base.module.css';
import classNames from 'classnames';
import styled from 'styled-components';
import ImageFiller from 'react-image-filler';
import FRUITS_LIST from '../helpers/data.json';
import { fruitInSeason } from '@/helpers/fruits-helper';
import Icon from '@mdi/react';
import { mdiFire } from '@mdi/js';

const InSeasonSectionWrapper = styled.section`
  & {
    display: flex;
    flex-direction: column;
    --width: 250px;
    margin: 1.5rem 0;
  }

  & h2 {
    font-size: 2.5rem;
    border-bottom: 2px solid #ddd;
    border-top: 2px solid #ddd;
    max-width: 300px;
  }

  & .slider-container {
    overflow: hidden;
  }

  & .slider {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    position: relative;
    height: calc(var(--width) + 30px);
    min-width: calc(var(--width) * var(--quantity));
  }

  & .slider-item {
    flex: 0 0 auto;
    width: var(--width);
    height: var(--width);
    border-radius: 15px;
    position: absolute;
    left: 100%;
    animation-name: autoRun;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  & .slider:hover .slider-item {
    animation-play-state: paused;
  }

  & .slider-item .item-overlay {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    height: 0px;
    width: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    font-weight: 800;
  }

  & .slider-item:hover .item-overlay {
    display: flex;
    height: 100%;
    width: 100%;
    top: 0;
    transition: all 0.3s;
  }

  @keyframes autoRun {
    to {
      left: calc(var(--width) * -1);
    }
  }
`;

export default function InSeasonSection() {
  const onSaleFruits = FRUITS_LIST.filter((d) => {
    return fruitInSeason(d);
  });

  const quantity = onSaleFruits.length;

  return (
    <InSeasonSectionWrapper style={{ '--quantity': quantity }}>
      <h2
        className={classNames(
          baseStyles.fontQuicksandBold,
          baseStyles.uPadding1r,
          baseStyles.uFlex,
          baseStyles.uAlignCenter,
          baseStyles.uGap1r
        )}
      >
        <Icon path={mdiFire} size={2.5} />
        <span>Trending Picks</span>
      </h2>
      <div className="slider-container">
        <div className="slider">
          {onSaleFruits.map((fruit, i) => (
            <div
              key={fruit.id}
              className="card slider-item"
              style={{
                '--position': i + 1,
                animationDelay:
                  'calc((10s / var(--quantity)) * (var(--quantity) - var(--position)) * -1)',
              }}
            >
              <ImageFiller width={250} height={250} />
              <div className="item-overlay">
                <h3>{fruit.name}</h3>
                <p>{fruit.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InSeasonSectionWrapper>
  );
}
