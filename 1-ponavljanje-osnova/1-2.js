// const generator = (znak) => (a, b) => eval(`${a} ${znak} ${b}`);

function generator(string) {
  return (a, b) => {
    return console.log(eval(`${a}${string}${b}`));
  };
}

let zbrajanje = generator('+');
zbrajanje(2, 4);

let oduzimanje = generator('-');
oduzimanje(2, 4);

let mnozenje = generator('*');
mnozenje(2, 4);

let ostatakCjelobrojnogDijeljenja = generator('%');
ostatakCjelobrojnogDijeljenja(2, 4);
