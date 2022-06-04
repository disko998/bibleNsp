const { PDFNet } = require('@pdftron/pdfnet-node')
const fs = require('fs')

const pdfPath = 'bible.pdf'
const fileName = '../src/_data/mojsije-5'
const START_PAGE = 133
const END_PAGE = 161

const main = async () => {
    try {
        const doc = await PDFNet.PDFDoc.createFromFilePath(
            `${__dirname}/${pdfPath}`,
        )
        await doc.initSecurityHandler()

        let text = ''

        for (let i = START_PAGE; i < END_PAGE; i++) {
            const page = await doc.getPage(i)
            const pageWidth = await page.getPageWidth()
            const pageHeight = await page.getPageHeight()
            const txt = await PDFNet.TextExtractor.create()
            const rect = new PDFNet.Rect(0, 0, pageWidth, pageHeight)
            txt.begin(page, rect)
            const pageText = await txt.getAsText()
            text = `${text} ${pageText}`
        }

        const verses = getVerses(text)

        fs.writeFileSync(
            `${__dirname}/${fileName}.json`,
            JSON.stringify(verses, null, 2),
        )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

function getVerses(text) {
    const words = text.replaceAll('\n', ' ').split(' ')

    let map = {}

    for (let chapter, verse = 1, i = 0; i < words.length; i++) {
        let word = words[i]

        if (isNumber(word)) {
            const num = parseInt(word)
            const isVerse = num - 1 == verse
            const canBeNewChapter = map[num] === undefined

            if (!isVerse && canBeNewChapter) {
                chapter = num
                verse = 1
                map[chapter] = {}
                map[chapter][verse] = ''
                continue
            }

            verse = num
            map[chapter][verse] = ''
        } else {
            const verseText = map[chapter]?.[verse]

            if (verseText !== undefined) {
                if (word === '-') {
                    ++i
                    const nextWord = words[i]
                    map[chapter][verse] = validateVerse(
                        `${verseText}${nextWord}`,
                    )
                } else {
                    map[chapter][verse] = validateVerse(`${verseText} ${word}`)
                }
            }
        }
    }

    // console.log(map)
    return map
}

const isNumber = s => {
    return /^\d+$/.test(s)
}

const validateVerse = s => {
    let validString = s.replaceAll('*', '').trim()

    validString = validString.split('јутродан').join('јутро дан')

    return validString
}

// validateVerse('Земља је била празна и пуста, и над повр - шином')

PDFNet.runWithCleanup(
    main,
    'demo:1647972377914:7bf663a403000000005891962498f17e097faa167a2670070343effd8f',
)
    .catch(function (error) {
        console.log('Error: ' + JSON.stringify(error))
    })
    .then(function () {
        return PDFNet.shutdown()
    })
