'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import AddServiceCategoryModal from './AddServiceCategoryModal/AddServiceCategoryModal';
import { useEffect, useState } from 'react';
import { useGetAllServiceCategoriesLazy } from '@/app/[locale]/hooks/pricebook/usePriceBook';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ServiceCategoryEntity } from '@/generatedGraphql';

const ServiceCategoryCard = ({
  name,
  description,
  imageUrl,
}: {
  name: string;
  description: string;
  imageUrl: string;
}) => {
  const imageAvailable = imageUrl && imageUrl.trim() !== '';

  return (
    <div className='flex w-full flex-col'>
      {' '}
      {/* Ensure this parent container can expand as needed */}
      <div className='w-full'>
        {' '}
        {/* This container will also match its parent's width */}
        {imageAvailable ? (
          <img
            src={imageUrl}
            alt={name}
            className='flex h-32 w-full items-center justify-center rounded-lg border border-gray-100 object-contain  shadow-sm transition-transform duration-300 ease-in-out hover:scale-110 dark:border-primary/5'
          />
        ) : (
          <div className='flex h-32 w-full items-center justify-center rounded-lg border border-gray-100 object-contain shadow-sm transition-transform duration-300 ease-in-out hover:scale-110 dark:border-primary/5'>
            <MdOutlineImageNotSupported size={64} className='text-gray-400' />
          </div>
        )}
      </div>
      <div className='pt-4'>
        <div className='flex items-center justify-between'>
          {' '}
          {/* This container applies Flexbox layout */}
          <h5
            className='text-md mb-1 line-clamp-1 font-semibold tracking-tight text-gray-800 dark:text-white'
            title={name}
          >
            {name}
          </h5>
          <Button variant='ghost' className='rounded-full p-3'>
            <BsThreeDotsVertical className='dark:text-white' />
          </Button>
        </div>

        <p
          className='line-clamp-2 overflow-hidden text-gray-500'
          title={description}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const ServiceCategories = () => {
  const [localServiceCategories, setLocalServiceCategories] = useState<
    ServiceCategoryEntity[]
  >([]);
  const { getAllServiceCategories, serviceCategories, loading } =
    useGetAllServiceCategoriesLazy();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const renderServiceCategories = localServiceCategories?.map((category) => (
    <ServiceCategoryCard
      key={category.id}
      name={category.name}
      description={category.description ?? ''}
      imageUrl={category.images?.[0]?.url ?? ''}
    />
  ));

  const onAdded = (newCategory: ServiceCategoryEntity) => {
    setLocalServiceCategories((prevCategories) => [
      newCategory,
      ...prevCategories,
    ]);
  };

  useEffect(() => {
    getAllServiceCategories({ fetchPolicy: 'network-only' });
  }, []);

  useEffect(() => {
    if (serviceCategories) {
      setLocalServiceCategories(serviceCategories as ServiceCategoryEntity[]);
    }
  }, [serviceCategories]);

  return (
    <>
      {isModalOpen && (
        <AddServiceCategoryModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onAdded={onAdded}
          modalName='Create New Service Category'
        />
      )}

      <div className='space-y-6 pt-4'>
        <div className='bg-linen relative flex flex-1 items-center rounded-xl'>
          <IoSearchOutline className='absolute left-3 h-6 w-6 text-primary/40' />
          <Input
            type='text'
            placeholder='Search for service categories'
            className='h-10 w-full rounded-xl border border-border bg-primary/5 pl-10 text-white'
          />
        </div>
        <div className='flex flex-row items-center justify-between rounded-xl border-[1px] border-solid p-5'>
          <div>
            <div className='flex flex-col font-bold dark:text-white'>
              Service Categories
            </div>
            <div className='text-muted-foreground'>
              Manage your service categories
            </div>
          </div>
          <Button variant='default' onClick={toggleModal}>
            New
          </Button>
        </div>
        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {loading ? <p>Loading...</p> : renderServiceCategories}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCategories;
