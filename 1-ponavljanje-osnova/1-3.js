const dajRandomBrojUIntervalu = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const napraviPolje = (brElemenata) => {
  let polje = [];
  while (polje.length < brElemenata) {
    polje.push(dajRandomBrojUIntervalu(1, 10));
  }

  // u slučaju da treba odmah odrediti veličinu polja
  // let polje = new Array(brElemenata);
  // for (let i = 0; i < polje.length; i++) {
  //   polje[i] = dajRandomBrojUIntervalu(1, 10);
  // }
  return polje;
};

let originalnoPolje = napraviPolje(20);
console.log('Originalno polje: ', originalnoPolje);

let poljeBezDuplikata = Array.from([...new Set(originalnoPolje)]);
console.log('Bolje bez duplikata: ', poljeBezDuplikata);

// rečeno je da se filtrira "originalno" polje stoga nisam filtrirao polje bez duplikata
let filtriranoPolje = originalnoPolje.filter((elem, idx) => elem > idx);
console.log('Filtrirano polje: ', filtriranoPolje);

let mapiranoPolje = filtriranoPolje.map((x) => x * 2);
console.log('Mapirano polje: ', mapiranoPolje);

console.log(
  'Polje sortirano silazno: ',
  mapiranoPolje.sort((a, b) => b - a)
);
