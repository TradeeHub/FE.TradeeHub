'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import AddServiceCategoryModal from './AddServiceCategoryModal/AddServiceCategoryModal';
import { useState } from 'react';

const ServiceCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
      </div>
    </>
  );
};

export default ServiceCategories;

// 'use client';
// import React, { useState } from 'react';
// import AddServiceCategoryModal from '../../ui/dashboard/pricebook/service-category/AddServiceCategoryModal/AddServiceCategoryModal';
// import { Button } from '@/components/ui/button';
// import AddMaterialModal from '../../ui/dashboard/pricebook/material/AddMaterialModal';
// import AddLabourRateModal from '../../ui/dashboard/pricebook/labor/AddLabourRateModal';

// const PriceBook = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
//   const [isLabourRateModalOpen, setIsLabourRateModalOpen] = useState(false);

//   const toggleModal = () => setIsModalOpen(!isModalOpen);
//   const toggleMaterialModal = () =>
//     setIsMaterialModalOpen(!isMaterialModalOpen);
//   const toggleLabourRateModal = () =>
//     setIsLabourRateModalOpen(!isLabourRateModalOpen);

//   return (
//     <>
//       <div className='flex gap-6'>
//         <Button onClick={toggleModal}>Add Service Category</Button>

//         <Button onClick={() => setIsMaterialModalOpen(true)}>
//           Add Material
//         </Button>

//         <Button onClick={() => setIsLabourRateModalOpen(true)}>
//           Add Labour Rate
//         </Button>
//       </div>

//       {isMaterialModalOpen && (
//         <AddMaterialModal
//           isOpen={isMaterialModalOpen}
//           onClose={toggleMaterialModal}
//           modalName='Create New Material'
//         />
//       )}

//       {isLabourRateModalOpen && (
//         <AddLabourRateModal
//           isOpen={isLabourRateModalOpen}
//           onClose={toggleLabourRateModal}
//           modalName='Create New Labour Rate'
//         />
//       )}

//       {isModalOpen && (
//         <AddServiceCategoryModal
//           isOpen={isModalOpen}
//           onClose={toggleModal}
//           // onCustomerAdded={refreshGridData} // Assuming you have such a prop
//           modalName='Create New Service Category'
//           // onAdded={undefined}
//         />
//       )}
//     </>
//   );
// };

// export default PriceBook;
