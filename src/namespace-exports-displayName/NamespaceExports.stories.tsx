import { ObjectTemp, Temp } from '.';
// import { withNamespaceDisplayName } from '@/namespace-exports-displayName/storybook-utils/withNamespaceDisplayName';

export default {
  title: 'NamespaceExports',
};

console.log('@@ storybook ->', {
  namespace: Temp,
  object: ObjectTemp,
});

console.log('@@ namespace - displayName !!');
// const _Temp = withNamespaceDisplayName(Temp, 'Temp'); // <- tsMorphAddDisplayName 플러그인을 통해 처리
Object.keys(Temp).forEach((key) => {
  console.log(Temp[key as keyof typeof Temp].displayName); // Temp.Foo, Temp.Bar
});

console.log('--------------');
console.log('@@ object - displayName !!');
Object.keys(ObjectTemp).forEach((key) => {
  console.log(ObjectTemp[key as keyof typeof ObjectTemp].displayName);
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
