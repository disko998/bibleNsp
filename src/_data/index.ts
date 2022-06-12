import { BookGroups, BooksAlias } from '../const/enums';
import { Book } from '../const/types';

const mojsije1 = require('./mojsije-1.json');
const mojsije2 = require('./mojsije-2.json');
const mojsije3 = require('./mojsije-3.json');
const mojsije4 = require('./mojsije-4.json');
const mojsije5 = require('./mojsije-5.json');

export const books: Book[] = [
  {
    title: 'Прва књига Мојсијева',
    original_title: 'У почетку',
    group: BookGroups.TORA,
    hebrew_title: 'בְּרֵאשִׁית',
    chapters: mojsije1,
    alias: BooksAlias.MOJ_1,
    bookIndex: 1,
  },
  {
    title: 'Друга књига Мојсијева',
    original_title: 'Имена',
    group: BookGroups.TORA,
    hebrew_title: 'שְׁמוֹת',
    chapters: mojsije2,
    alias: BooksAlias.MOJ_2,
    bookIndex: 2,
  },
  {
    title: 'Трећа књига Мојсијева',
    original_title: 'Господ је позвао',
    group: BookGroups.TORA,
    hebrew_title: 'וַיִּקְרָא',
    chapters: mojsije3,
    alias: BooksAlias.MOJ_3,
    bookIndex: 3,
  },
  {
    title: 'Четврта књига Мојсијева',
    original_title: 'У пустињи',
    group: BookGroups.TORA,
    hebrew_title: 'בְּמִדְבַּר',
    chapters: mojsije4,
    alias: BooksAlias.MOJ_4,
    bookIndex: 4,
  },
  {
    title: 'Пета књига Мојсијева',
    original_title: 'Речи',
    group: BookGroups.TORA,
    hebrew_title: 'דְּבָרִים',
    chapters: mojsije5,
    alias: BooksAlias.MOJ_5,
    bookIndex: 5,
  },
];
