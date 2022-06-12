import firestore from '@react-native-firebase/firestore';

const mojsije1 = require('./mojsije-1.json');
const mojsije2 = require('./mojsije-2.json');
const mojsije3 = require('./mojsije-3.json');
const mojsije4 = require('./mojsije-4.json');
const mojsije5 = require('./mojsije-5.json');

export const chaptersToArray = (chapters: any) => {
  const result = chapters;
  Object.keys(chapters).map((chapter: any) => {
    result[chapter] = Object.values(chapters[chapter]).map(verse => verse);
  });

  return result;
};

const books = [
  {
    alias: '1 Moj.',
    title: 'Прва књига Мојсијева',
    original_title: 'У почетку',
    group: 'Тора',
    hebrew_group: 'תּוֹרָה',
    hebrew_title: 'בְּרֵאשִׁית',
    book_index: 1,
    chapters: chaptersToArray(mojsije1),
  },
];

export default () => {
  console.log(chaptersToArray(mojsije1));
  books.map(async book => {
    try {
      const bookRef = firestore().collection('books').doc(book.alias);
      await bookRef.set(book);
    } catch (error) {
      console.log(error);
    }
  });
};
