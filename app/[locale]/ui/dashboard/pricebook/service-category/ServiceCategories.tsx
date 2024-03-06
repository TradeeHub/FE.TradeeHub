'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import AddServiceCategoryModal from './AddServiceCategoryModal/AddServiceCategoryModal';
import { useEffect, useState } from 'react';
import { useGetAllServiceCategoriesLazy } from '@/app/[locale]/hooks/pricebook/usePriceBook';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MdOutlineImageNotSupported } from "react-icons/md";

const ServiceCategoryCard = ({ name, description, imageUrl }) => {
  // Checking if imageUrl is provided and not empty
  const imageAvailable = imageUrl && imageUrl.trim() !== '';

  return (
    <Card className='rounded-xl shadow-lg text-center transition duration-300 ease-in-out hover:shadow-xl'>
      <CardHeader className='p-0'>
        <div className='relative h-32 w-full overflow-hidden rounded-xl'>
          {imageAvailable ? (
            // Displaying the image if available
            <img src={imageUrl} alt={name}
              className='h-full w-full object-contain transition-transform duration-300 ease-in-out hover:scale-[1.20] rounded-xl' />
          ) : (
            // Displaying the fallback icon if the image is not available
            <div className='flex justify-center items-center h-full'>
              <MdOutlineImageNotSupported size={64} className='text-gray-400' />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='px-2 py-2'>
        <CardTitle className='text-primary font-semibold'>{name}</CardTitle>
        <div className='relative group'>
          {/* Clipping text to 2 lines */}
          <CardDescription className='text-gray-700 text-sm overflow-hidden h-12 leading-6 block'>
            <span className='line-clamp-2'>{description}</span>
          </CardDescription>
          {/* Tooltip */}
          <div className='absolute w-full bg-black text-white text-sm p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out -top-8 left-0 hidden group-hover:block'>
            {description}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {/* Footer content */}
      </CardFooter>
    </Card>
  );
};


const ServiceCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const { getAllServiceCategories, serviceCategories, loading } =   useGetAllServiceCategoriesLazy(); 
  
  useEffect(() => {
      getAllServiceCategories({ fetchPolicy: 'network-only' });
      if(!loading){
        console.log('serviceCategories', serviceCategories);
      }
  }, []);
  const renderServiceCategories = serviceCategories?.map((category) => (
    <ServiceCategoryCard
      key={category.id}
      name={category.name}
      description={category.description ?? ''}
      imageUrl={category.images?.[0]?.url ?? ''}
    />
  ));
  
  return (
    <>
      {isModalOpen && (
        <AddServiceCategoryModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          modalName='Create New Service Category'
        />
      )}

      <div className='space-y-6 pt-4'>
        <div className='bg-linen relative flex flex-1 items-center rounded-xl'>
          <IoSearchOutline className='absolute left-3 h-6 w-6 text-primary/40' />
          <Input
            type='text'
            placeholder='Search for service categories'
            className='h-10 w-full rounded-xl border border-border bg-primary/5 pl-10'
          />
        </div>
        <div className='flex flex-row items-center justify-between rounded-xl border-[1px] border-solid p-5'>
          <div>
            <div className='flex flex-col font-bold'>Service Categories</div>
            <div className=''>Manage your service categories</div>
          </div>
          <Button variant='default' onClick={toggleModal}>
            New
          </Button>
        </div>
        <div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {loading ? <p>Loading...</p> : renderServiceCategories}
      </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCategories;