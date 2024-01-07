import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const Properties = () => {
  const t = useTranslations('general');

  return (
    <>
      <h1>{t('properties')}</h1>

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>bbbb</div>
              <div className='flex flex-col space-y-1.5'>aaaaa</div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button variant='destructive'>Deploy</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Properties;
