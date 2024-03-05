import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/TabsCustom/TabsCustom';
import LaborRates from '../../ui/dashboard/pricebook/labor/LaborRates';
import Materials from '../../ui/dashboard/pricebook/material/Materials';
import ServiceCategories from '../../ui/dashboard/pricebook/service-category/ServiceCategories';

const PriceBook = () => {
  return (
    <div className='flex w-full flex-col items-start'>
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-4'>
        <h1 className='text-[32px] font-bold'>Price Book</h1>
        <Tabs defaultValue='serviceCategories' className='w-full'>
          <div className='flex justify-start'>
            <TabsList className='flex flex-row gap-4'>
              <TabsTrigger value='serviceCategories'>
                Service Categories
              </TabsTrigger>
              <TabsTrigger value='services'>Services</TabsTrigger>
              <TabsTrigger value='materials'>Materials</TabsTrigger>
              <TabsTrigger value='laborRates'>Labor Rates</TabsTrigger>
              <TabsTrigger value='warranties'>Warranties</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='serviceCategories'>
            <ServiceCategories />
          </TabsContent>
          <TabsContent value='services'>
            <div>Services coming soon...</div>
          </TabsContent>
          <TabsContent value='materials'>
            <Materials />
          </TabsContent>
          <TabsContent value='laborRates'>
            <LaborRates />
          </TabsContent>
          <TabsContent value='warranties'>
            <div>Warranties coming soon...</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PriceBook;
