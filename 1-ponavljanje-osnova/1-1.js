// const racunaj = (a, b, f) => f(a, b);

// const zbrajanje = (a, b) => a + b;

// const oduzimanje = (a, b) => a - b;

// console.log(racunaj(13, 4, zbrajanje));
// console.log(racunaj(13, 4, oduzimanje));
// console.log(
//   racunaj(13, 4, (a, b) => {
//     return a % b;
//   })
// );

function racunaj(a, b, f) {
  return f(a, b);
}

function zbrajanje(a, b) {
  return a + b;
}

function oduzimanje(a, b) {
  return a - b;
}

console.log(racunaj(13, 4, zbrajanje));
console.log(racunaj(13, 4, oduzimanje));
console.log(
  racunaj(13, 4, (a, b) => {
    return a % b;
  })
);
