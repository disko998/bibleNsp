import { Book } from '../_data'

export const groupBooks = (books: Book[]): { [key: string]: Book[] } => {
    let groups: { [key: string]: Book[] } = {}
    books.forEach(book => {
        groups[book.group] = [...(groups[book.group] || []), book]
    })

    return groups
}

export const booksToArray = (books: { [key: string]: any }): Book[] => {
    return Object.keys(books).map(key => ({ ...books[key], title: key }))
}
