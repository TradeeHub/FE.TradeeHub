'use client';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ServiceCategoryEntity } from '@/generatedGraphql';
import GenericDropdownMenu from '@/app/[locale]/ui/general/GenericDropdownMenu/GenericDropdownMenu';
import Image from 'next/image';

type ServiceCategoryCardProps = {
  onDelete: (serviceCategory: ServiceCategoryEntity) => void;
  onUpdate: (serviceCategory: ServiceCategoryEntity) => void;
  serviceCategory: ServiceCategoryEntity;
};

const ServiceCategoryCard = ({
  serviceCategory,
  onDelete,
  onUpdate
}: ServiceCategoryCardProps) => {
  const imageUrl = serviceCategory.images?.[0]?.url ?? '';
  const menuItems = [
    { label: 'Edit', icon: FiEdit, onClick: () => onUpdate(serviceCategory) },
    {
      label: 'Delete',
      icon: RiDeleteBin7Line,
      onClick: () => onDelete(serviceCategory)
    }
  ];

  return (
    <div className='flex w-full flex-col'>
      <div className='w-full'>
        {imageUrl.length > 0 ? (
          <div className='relative h-32 w-full'>
            <Image
              src={imageUrl}
              alt={serviceCategory.name}
              fill={true}
              objectFit='contain'
              className='rounded-lg border border-gray-100 shadow-sm transition-transform duration-300 ease-in-out hover:scale-110 dark:border-primary/5'
            />
          </div>
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

export default ServiceCategoryCard;
