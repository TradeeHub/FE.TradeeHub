import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LanguageOption } from '../types/sharedTypes';

const locales = ['en', 'it', 'ar', 'es', 'hi', 'pl', 'sq', 'zh'];

const languageOptions: Record<string, LanguageOption> = {
  en: { name: 'English' },
  it: { name: 'Italiano' },
  ar: { name: 'العربية' },
  es: { name: 'Español' },
  hi: { name: 'हिन्दी' },
  pl: { name: 'Polski' },
  sq: { name: 'Shqip' },
  zh: { name: '中文' },
};
const ChangeLanguage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('settings');
  const currentCode = t('code');

  const handleLocaleChange = (newLocale: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);

    if (currentCode !== newLocale) {
      const newPath = [newLocale, ...pathSegments.slice(1)].join('/');
      router.push(`/${newPath}`);
    }
  };

  return (
    <>
      <Select value={currentCode} onValueChange={handleLocaleChange}>
        <SelectTrigger className='flex items-center justify-center bg-background font-roboto text-primary cursor-pointer'>
          <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent
          position='popper'
          className='flex items-center justify-start text-center text-primary'
        >
          {locales.map((locale) => (
            <SelectItem
              key={locale}
              value={locale}
              className='flex items-center justify-center font-roboto cursor-pointer'
            >
              {languageOptions[locale].name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ChangeLanguage;
