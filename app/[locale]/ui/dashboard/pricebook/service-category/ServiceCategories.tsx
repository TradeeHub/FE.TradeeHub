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
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useToast } from '@/components/ui/use-toast';
import AlertPopup from '../../../general/Alert/AlertPopup';
import GenericDropdownMenu from '../../../general/GenericDropdownMenu/GenericDropdownMenu';

type ServiceCategoryCardProps = {
  onDelete: (serviceCategory: ServiceCategoryEntity) => void;
  onUpdate: (serviceCategory: ServiceCategoryEntity) => void;
  serviceCategory: ServiceCategoryEntity;
};

const ServiceCategoryCard = ({
  serviceCategory,
  onDelete,
  onUpdate,
}: ServiceCategoryCardProps) => {
  const imageUrl = serviceCategory.images?.[0]?.url ?? '';
  const menuItems = [
    { label: 'Edit', icon: FiEdit, onClick: () => onUpdate(serviceCategory) },
    {
      label: 'Delete',
      icon: RiDeleteBin7Line,
      onClick: () => onDelete(serviceCategory),
    },
  ];

  return (
    <div className='flex w-full flex-col'>
      <div className='w-full'>
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
          <h5
            className='text-md mb-1 line-clamp-1 font-semibold tracking-tight text-gray-800 dark:text-white'
            title={serviceCategory.name}
          >
            {serviceCategory.name}
          </h5>
          <GenericDropdownMenu
            triggerIcon={<BsThreeDotsVertical className='dark:text-white' />}
            menuItems={menuItems}
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

const ServiceCategories = () => {
  const { deleteServiceCategory, deleteServiceCategoryResponse } =
    useDeleteServiceCategory();
  const { getAllServiceCategories, serviceCategories, loading } =
    useGetAllServiceCategoriesLazy();

  const [localServiceCategories, setLocalServiceCategories] = useState<
    ServiceCategoryEntity[]
  >([]);
  const [serviceCategoryToAction, setServiceCategoryToAction] =
    useState<ServiceCategoryEntity>();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDeleteCategory = () => {
    deleteServiceCategory(serviceCategoryToAction?.id ?? '');
  };

  const toggleUpdateModal = (serviceCategory: ServiceCategoryEntity) => {
    setServiceCategoryToAction(serviceCategory);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleDeleteAlert = (serviceCategory: ServiceCategoryEntity) => {
    setServiceCategoryToAction(serviceCategory);
    setIsDeleteAlertOpen(!isDeleteAlertOpen);
  };

  const handleUpdateCategory = (serviceCategory: ServiceCategoryEntity) => {
    setLocalServiceCategories((currentCategories) => {
      const filteredCategories = currentCategories.filter((category) => category.id !== serviceCategory.id);
        
      return [serviceCategory, ...filteredCategories];
    });
    toast({
      title: 'Successfully Updated Service Category!',
      description: (
        <span>
          You have successfully updated the service category{' '}
          <b>
            <u>{serviceCategory.name}</u>
          </b>
        </span>
      ),
    });
  };

  const renderServiceCategories = localServiceCategories?.map((category) => (
    <ServiceCategoryCard
      key={category.id}
      serviceCategory={category}
      onUpdate={toggleUpdateModal}
      onDelete={toggleDeleteAlert}
    />
  ));

  const onAdded = (newCategory: ServiceCategoryEntity) => {
    setLocalServiceCategories((prevCategories) => [
      newCategory,
      ...prevCategories,
    ]);
  };

  useEffect(() => {
    if (
      deleteServiceCategoryResponse &&
      deleteServiceCategoryResponse.deleteServiceCategory?.success === true
    ) {
      setLocalServiceCategories((currentCategories) =>
        currentCategories.filter(
          (category) => category.id !== serviceCategoryToAction?.id,
        ),
      );
      toast({
        title: 'Successfully Deleted Service Category!',
        description: (
          <span>
            You have successfully deleted the service category{' '}
            <b>
              <u>{serviceCategoryToAction?.name}</u>
            </b>
          </span>
        ),
      });
    }
  }, [deleteServiceCategoryResponse]);

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

      {isEditModalOpen && (
        <AddServiceCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdated={handleUpdateCategory}
          updateData={serviceCategoryToAction}
          modalName='Update Service Category'
        />
      )}

      {isDeleteAlertOpen && (
        <AlertPopup
          isOpen={isDeleteAlertOpen}
          setIsAlertOpen={setIsDeleteAlertOpen}
          onConfirm={handleDeleteCategory}
          title='Are you absolutely sure?'
          description={
            <span>
              You are about to delete <strong>{serviceCategoryToAction?.name}</strong> service category this will be removed from services, materials, labor rates and warranties if in use.
            </span>
          }          
          confirmActionName='Delete'
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
