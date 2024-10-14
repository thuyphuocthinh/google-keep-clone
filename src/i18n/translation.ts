import i18n from "./index" ;

const Trans: any = {
    isLocaleSupported(locale: any) { // <--- 1
      return Trans.supportedLocales.includes(locale)
    },
    // getter
    get defaultLocale() {
      return import.meta.env.VITE_DEFAULT_LOCALE
    },

    get supportedLocales() {
      return import.meta.env.VITE_SUPPORTED_LOCALES.split(",")
    },

    // setter
    set currentLocale(newLocale: any) { // <--- 2
        i18n.global.locale.value = newLocale
    },

    // switch language
    async switchLanguage(newLocale: any) { // <--- 3
        Trans.currentLocale = newLocale
        const html: HTMLElement | null = document.querySelector("html");
        if(html) {
            html.setAttribute("lang", newLocale);
            localStorage.setItem("user-locale", newLocale);
        }
    },

    // get locale stored in localStorage
    getPersistedLocale(): any { // <--- 3
        const persistedLocale = localStorage.getItem("user-locale");
        if(Trans.isLocaleSupported(persistedLocale)) {
          return persistedLocale;
        } else {
          return null;
        }
    },
    // get user locale
    getUserLocale(): any { // <--- 2
        const locale = window.navigator.language || Trans.defaultLocale;
        return {
          locale: locale,
          localeNoRegion: locale.split('-')[0]
        }
    },
    // guess default locale
    guessDefaultLocale(): any {
        const userPersistedLocale = Trans.getPersistedLocale();
        if(userPersistedLocale) {
          return userPersistedLocale
        }
        const userPreferredLocale = Trans.getUserLocale();
        if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
          return userPreferredLocale.locale
        }
        if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
          return userPreferredLocale.localeNoRegion
        }
        return Trans.defaultLocale;
    },
    // check language when changing route
    async routeMiddleware(to: any, _from: any, next: any) {
        const paramLocale = to.params.locale
        if(!Trans.isLocaleSupported(paramLocale)) {
          return next(Trans.guessDefaultLocale())
        }
        await Trans.switchLanguage(paramLocale)
        return next()
    },
}

export default Trans;