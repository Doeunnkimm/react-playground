import { buttonStyle2 } from './styles.css.ts';

export const VanillaExtractExample = () => {
  return (
    <div>
      <h2>Vanilla Extract vs Emotion</h2>
      <button className={buttonStyle2}>Vanilla Extract 버튼</button>

      {/* Emotion 사용 예시 (주석으로 표시) */}
      {/* <button css={emotionButtonCss}>Emotion 버튼</button> */}
    </div>
  );
};
