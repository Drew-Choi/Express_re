//배열 구조 분해
const arr = [1, 2, 3];
const one = arr[0];
const two = arr[1];
const three = arr[2];
console.log(one, two, three);

//배열 구조 분해 사용
const [deOne, deTwo, deThree] = arr;
console.log(deOne, deTwo, deThree);

//날짜관련
const today = new Date();
console.log(today);
const formatDay = today.toISOString().substring(0, 10);
console.log(formatDay);

const [year, month, day] = formatDay.split('-');
console.log(year, month, day);

//객체 구조분해 -> 객체는 키 값을 같이 해주면, 그 키 값으로 변수를 자동 선언하여
//그 키값과 같은 변수에 넣어줌
const obj = {
  firstName: '효석',
  lastName: '이',
};

const { firstName, lastName } = obj;

console.log(firstName, lastName);

const person = {
  name: 'Lee',
  address: {
    zipCode: '03068',
    city: 'Seoul',
  },
};

const {
  address: { zipCode, city },
} = person;

console.log(city, zipCode);
