import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n'; // Adjust the path accordingly

export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: 'en'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|it|ar|es|hi|pl|sq|zh)/:path*']
};