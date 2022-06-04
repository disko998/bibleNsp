// 1. Import the extendTheme function
import { extendTheme } from 'native-base'
// 2. Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
    brand: {
        primary: '#FFC700',
    },
    bg: {
        dark: '#2C2C2C',
        light: '#fff',
        darkSecondary: '#353535',
        lightSecondary: '#F7F7F7',
    },
}

const theme = extendTheme({
    components: {},
    colors: newColorTheme,
    config: {
        useSystemColorMode: true,
        initialColorMode: 'dark',
    },
})

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof theme

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
    interface ICustomTheme extends CustomThemeType {}
}

export default theme
