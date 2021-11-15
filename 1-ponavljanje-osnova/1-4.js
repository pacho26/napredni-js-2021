class Student {
  constructor(ime, jmbag, prosjek, semestar) {
    this.ime = ime;
    this.jmbag = jmbag;
    this.prosjek = prosjek;
    this.semestar = semestar;
  }
}

class godinaStudija {
  constructor(godina) {
    this.godina = godina;
    this.brojStudenata = 0;
    this.prosjek = 0;
  }
}

const ispis = (polje) => {
  polje.forEach((s) => {
    console.log(`${s.ime} (${s.jmbag}) - ${s.prosjek} (${s.semestar})`);
  });
};

const izracunajGodinu = (semestar) => {
  return Math.ceil(semestar / 2);
};

let poljeStudenata = [
  new Student('Marko Marić', '0246454596', 4.56, 3),
  new Student('Josip Josipović', '0246445649', 3.94, 1),
  new Student('Luka Lukić', '0246454532', 4.12, 2),
  new Student('Mario Maloča', '02464545456', 3.34, 5),
  new Student('Ivana Ivanić', '0246454002', 4.87, 5),
];
console.log('Originalno polje:');
ispis(poljeStudenata);

poljeStudenata.sort((a, b) => {
  return a.semestar === b.semestar
    ? b.prosjek - a.prosjek
    : a.semestar - b.semestar;
});
console.log('\nSortirano polje:');
ispis(poljeStudenata);

let poljeGodinaStudija = [];
poljeStudenata.forEach((s) => {
  if (
    !poljeGodinaStudija.some((g) => g.godina === izracunajGodinu(s.semestar))
  ) {
    poljeGodinaStudija.push(new godinaStudija(izracunajGodinu(s.semestar)));
  }
});

poljeGodinaStudija.forEach((g) => {
  let studentiTeGodine = poljeStudenata.filter(
    (s) => izracunajGodinu(s.semestar) === g.godina
  );
  g.brojStudenata = studentiTeGodine.length;
  g.prosjek = +(
    studentiTeGodine.reduce((sum, s) => (sum += s.prosjek), 0) / g.brojStudenata
  ).toFixed(2);
});

console.log(
  '\n',
  poljeGodinaStudija.sort((a, b) => b.prosjek - a.prosjek)
);

let filtriranoPolje = poljeStudenata.filter(
  (a) => izracunajGodinu(a.semestar) === 3
);

console.log(
  '\nProsjek studenata treće godine: ' +
    filtriranoPolje.reduce((sum, s) => (sum += s.prosjek), 0) /
      filtriranoPolje.length
);
