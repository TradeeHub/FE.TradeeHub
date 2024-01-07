import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('general');

  return (
    <div>
      <h1>{t('title')}</h1>
      <div>TradeeHub Test</div>
    </div>
  );
}
