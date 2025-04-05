import { boxStyle, h1Style } from './ve.css';

export const VanillaExtractExample = () => {
  return (
    <>
      <h1 className={h1Style}>Vanilla Extract</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.from({ length: 1000 }).map((_, i) => (
          <div
            key={i}
            data-odd={i % 2 === 0 ? '' : undefined}
            className={boxStyle}
          />
        ))}
      </div>
    </>
  );
};
