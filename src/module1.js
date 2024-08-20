export const COUNT = 1;
console.log('module1');

// 生成器语法
function* test() {
  const n = yield;
  console.log(n);
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

const _generator = test();
_generator.next();
_generator.next(0);

function* generator() {
  console.log('start');
  yield* test();
  yield 'done';
}

console.log([...generator()]);

// async await 语法
async function sync() {
  const a = await Promise.resolve(2);
  console.log(a);
}
sync();
