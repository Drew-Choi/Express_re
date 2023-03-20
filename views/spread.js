const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr);
console.log(...arr);

const obj = {
  name: '이효석',
  status: '취함',
};

console.log(obj);
console.log({ ...obj });

const tetzData = {
  name: '이효석',
  age: 39,
};

const tetzInfo = {
  nickName: 'chicken head',
  status: '숙취',
};

const tetz = { ...tetzData, ...tetzInfo };

console.log(tetz);

const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];

const newArr = [...arr1, ...arr2];
console.log(newArr);

const str = 'test';
console.log([...str]);

const tetz2 = {
  name: '이효석',
  gender: 'M',
  nickName: 'chicken head',
  email: 'xenosign@naver.com',
};

const { name, ...restInfo } = tetz2;
console.log(name);
console.log(restInfo);

const arr3 = [1, 2, 3, 4, 5, 6, 7];

const [first, ...rest] = arr3;
console.log(first);
console.log(rest);

function spread(first, second, ...rest) {
  console.log(first);
  console.log(second);
  console.log(rest);
}

spread(1, 2, 3, 4, 5, 6, 7, 8, 9);
