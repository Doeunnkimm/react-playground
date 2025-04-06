import { boxCss, h1Css } from './emotion.styles';

export const EmotionExample = () => {
  return (
    <>
      <h1 css={h1Css}>emotion</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.from({ length: 1000 }).map((_, i) => (
          <div
            key={i}
            data-odd={i % 2 === 0 ? '' : undefined}
            css={boxCss}
          />
        ))}
      </div>
    </>
  );
};
