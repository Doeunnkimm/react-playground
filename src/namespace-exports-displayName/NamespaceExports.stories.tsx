import { ObjectTemp, Temp } from '.';

export default {
  title: 'NamespaceExports',
};

console.log('@@ storybook ->', {
  namespace: Temp,
  object: ObjectTemp,
});

export const NamespaceExample = () => {
  return (
    <div>
      <Temp.Foo />
      <Temp.Bar />
    </div>
  );
};

export const ObjectExample = () => {
  return (
    <div>
      <ObjectTemp.Foo />
      <ObjectTemp.Bar />
    </div>
  );
};
