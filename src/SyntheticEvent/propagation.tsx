export const Propagation = () => {
  return (
    <div onClick={() => console.log('부모')}>
      나는 부모
      <button
        onClick={(e) => {
          console.log('자식');
          e.stopPropagation();
        }}>
        나는 자식
      </button>
    </div>
  );
};
