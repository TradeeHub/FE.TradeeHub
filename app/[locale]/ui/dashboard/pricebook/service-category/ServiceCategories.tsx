'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import AddServiceCategoryModal from './AddServiceCategoryModal/AddServiceCategoryModal';
import { useCallback, useEffect, useState } from 'react';
import {
  useDeleteServiceCategory,
  useGetAllServiceCategories,
  useGetAllServiceCategoriesLazy
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import { ServiceCategoryEntity, SortEnumType } from '@/generatedGraphql';
import { useToast } from '@/components/ui/use-toast';
import AlertPopup from '../../../general/Alert/AlertPopup';
import ServiceCategoryCard from './ServiceCategoryCard/ServiceCategoryCard';

const ServiceCategories = ({ centerStyle }: { centerStyle: string }) => {
  const { deleteServiceCategory, deleteServiceCategoryResponse } =
    useDeleteServiceCategory();
  const { searchServiceCategories, serviceCategories } =
    useGetAllServiceCategoriesLazy();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const { serviceCategoriesInitialLoad } = useGetAllServiceCategories();
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
      const filteredCategories = currentCategories.filter(
        (category) => category.id !== serviceCategory.id
      );

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
      )
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
      ...prevCategories
    ]);
  };

  const debouncedSearch = useCallback(
    (searchTerm: string) => {
      searchServiceCategories({
        variables: {
          name: searchTerm,
          order: [{ modifiedAt: SortEnumType.Desc }],
          pageSize: 50
        }
      });
    },
    [searchServiceCategories]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedSearch(searchTerm.trim());
    }, 800); // 800ms delay after the last key press

    return () => clearTimeout(handler);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    if (
      deleteServiceCategoryResponse &&
      deleteServiceCategoryResponse.deleteServiceCategory?.success === true
    ) {
      setLocalServiceCategories((currentCategories) =>
        currentCategories.filter(
          (category) => category.id !== serviceCategoryToAction?.id
        )
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
        )
      });
    }
  }, [deleteServiceCategoryResponse]);

  useEffect(() => {
    if (!serviceCategories) {
      const initialLoadData = serviceCategoriesInitialLoad?.edges?.map(
        (edge) => edge?.node
      ) as [];
      setLocalServiceCategories(initialLoadData as ServiceCategoryEntity[]);
    }
  }, [serviceCategoriesInitialLoad, serviceCategories]);

  useEffect(() => {
    const data = serviceCategories?.edges?.map((edge) => edge?.node) as [];
    setLocalServiceCategories(data as ServiceCategoryEntity[]);
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
              You are about to delete{' '}
              <strong>{serviceCategoryToAction?.name}</strong> service category
              this will be removed from services, materials, labor rates and
              warranties if in use.
            </span>
          }
          confirmActionName='Delete'
        />
      )}
      <div className={centerStyle}>
        <div className='space-y-6 pt-4'>
          <div className='bg-linen relative flex flex-1 items-center rounded-xl'>
            <IoSearchOutline className='absolute left-3 h-6 w-6 text-primary/40' />
            <Input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
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
              {renderServiceCategories}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCategories;
