import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../components/TabsCustom/TabsCustom';
import LaborRates from '../../ui/dashboard/pricebook/labor/LaborRates';
import Materials from '../../ui/dashboard/pricebook/material/Materials';
import ServiceCategories from '../../ui/dashboard/pricebook/service-category/ServiceCategories';

const PriceBook = () => {
  const centerStyle = `mx-auto flex w-full max-w-4xl flex-col gap-4`;
  return (
    <>
      <div className={centerStyle}>
        <h1 className='font-special text-[32px] font-semibold dark:text-white'>
          Price Book
        </h1>
      </div>
      <Tabs defaultValue='serviceCategories' className='w-full'>
        <div className={centerStyle}>
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
        </div>

        <TabsContent value='serviceCategories'>
          <ServiceCategories centerStyle={centerStyle} />
        </TabsContent>
        <TabsContent value='services'>
          <div>Services coming soon...</div>
        </TabsContent>
        <TabsContent value='materials'>
          <Materials centerStyle={centerStyle} />
        </TabsContent>
        <TabsContent value='laborRates'>
          <LaborRates />
        </TabsContent>
        <TabsContent value='warranties'>
          <div>Warranties coming soon...</div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PriceBook;
