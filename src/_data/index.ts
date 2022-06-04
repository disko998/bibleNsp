const mojsije1 = require('./mojsije-1.json');
const mojsije2 = require('./mojsije-2.json');
const mojsije3 = require('./mojsije-3.json');
const mojsije4 = require('./mojsije-4.json');
const mojsije5 = require('./mojsije-5.json');

export const books = {
  'Прва књига Мојсијева (Берешит)': {
    group: 'Тора   תּוֹרָה',
    hebrew: 'בְּרֵאשִׁית',
    chapters: mojsije1,
  },
  'Друга књига Мојсијева (Шемот)': {
    group: 'Тора   תּוֹרָה',
    chapters: mojsije2,
    hebrew: 'שְׁמוֹת',
  },
  'Трећа књига Мојсијева (Вајикра)': {
    group: 'Тора   תּוֹרָה',
    chapters: mojsije3,
    hebrew: 'וַיִּקְרָא',
  },
  'Четврта књига Мојсијева (Бемидбар)': {
    group: 'Тора   תּוֹרָה',
    chapters: mojsije4,
    hebrew: 'בְּמִדְבַּר',
  },
  'Пета књига Мојсијева (Деварим)': {
    group: 'Тора   תּוֹרָה',
    chapters: mojsije5,
    hebrew: 'דְּבָרִים',
  },
};

export type Book = {
  group: string;
  title: string;
  hebrew: string;
  chapters: [Chapter];
};

export type Chapter = {
  [key: number]: Verses;
};

export type Verses = {
  [key: number]: string;
};
