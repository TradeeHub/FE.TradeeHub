'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import AddServiceCategoryModal from './AddServiceCategoryModal/AddServiceCategoryModal';
import { useEffect, useState } from 'react';
import {
  useDeleteServiceCategory,
  useGetAllServiceCategoriesLazy,
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ServiceCategoryEntity } from '@/generatedGraphql';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MenuItemButton from '../../navbar/UserProfile/MenuItemButton';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
type ServiceCategoryCardProps = {
  onDelete: (id: string) => void;
  serviceCategory: ServiceCategoryEntity;
};

const ServiceCategoryCard = ({
  serviceCategory,
  onDelete,
}: ServiceCategoryCardProps) => {
  const imageUrl = serviceCategory.images?.[0]?.url ?? '';
  return (
    <div className='flex w-full flex-col'>
      {' '}
      {/* Ensure this parent container can expand as needed */}
      <div className='w-full'>
        {' '}
        {/* This container will also match its parent's width */}
        {imageUrl.length > 0 ? (
          <img
            src={imageUrl}
            alt={serviceCategory.name}
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
            title={serviceCategory.name}
          >
            {serviceCategory.name}
          </h5>
          
          <ServiceCategoryDropdownMenu
            serviceCategory={serviceCategory}
            onDelete={onDelete}
          />
        </div>
        <p
          className='line-clamp-2 overflow-hidden text-gray-500'
          title={serviceCategory.description ?? ''}
        >
          {serviceCategory.description}
        </p>
      </div>
    </div>
  );
};

const ServiceCategoryDropdownMenu = ({
  serviceCategory,
  onDelete,
}: ServiceCategoryCardProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to manage AlertDialog visibility

  const {
    deleteServiceCategory,
    deleteServiceCategoryResponse,
    deleteServiceCategoryLoading,
    deleteServiceCategoryError,
  } = useDeleteServiceCategory();

  const handleDelete = () => {
    deleteServiceCategory(serviceCategory.id);
    setIsAlertOpen(false); // Close AlertDialog after delete
  };

  const toggleAlert = () => setIsAlertOpen(!isAlertOpen);

  const handleEdit = () => {
    // Implementation for edit...
  };

  useEffect(() => {
    if (deleteServiceCategoryResponse) {
      if (deleteServiceCategoryResponse.deleteServiceCategory?.success === true) {
        onDelete(serviceCategory.id);
      }
    }
  }, [deleteServiceCategoryResponse]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='ghost' className='rounded-full p-3'>
            <BsThreeDotsVertical className='dark:text-white' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-30 gap-2'>
          <DropdownMenuItem className='cursor-pointer p-0 focus:bg-border focus:text-accent-foreground'>
            <MenuItemButton name='Edit' icon={FiEdit} onClick={handleEdit} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer p-0 focus:bg-border focus:text-accent-foreground'>
            <MenuItemButton name='Delete' icon={RiDeleteBin7Line} onClick={toggleAlert} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isAlertOpen && ( // Render AlertDialog conditionally based on isAlertOpen state
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <span>You are about to delete <b>{serviceCategory.name}</b> service category this will be removed from services, materials, labor rates and warranties if in use.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
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

  const handleDeleteCategory = (id: string) => {
    setLocalServiceCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== id),
    );
  };

  const renderServiceCategories = localServiceCategories?.map((category) => (
    <ServiceCategoryCard
      key={category.id}
      serviceCategory={category}
      onDelete={handleDeleteCategory}
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
            className='h-10 w-full rounded-xl border border-border bg-primary/5 pl-10 dark:text-white'
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
