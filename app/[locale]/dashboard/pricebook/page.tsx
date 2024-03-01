'use client';
import React, { useState } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import RoundButton from '../../components/RoundButton';
import AddServiceCategoryModal from '../../ui/dashboard/pricebook/service-category/AddServiceCategoryModal/AddServiceCategoryModal';
import { Button } from '@/components/ui/button';
import AddMaterialModal from '../../ui/dashboard/pricebook/material/AddMaterialModal';

const PriceBook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMaterialModal = () =>
    setIsMaterialModalOpen(!isMaterialModalOpen);

  return (
    <>
      <RoundButton
        icon={<HiOutlineUserAdd className='h-7 w-7' />}
        onClick={toggleModal}
      />

      <Button onClick={() => setIsMaterialModalOpen(true)}>Add Material</Button>

      {isMaterialModalOpen && (
        <AddMaterialModal
          isOpen={isMaterialModalOpen}
          onClose={toggleMaterialModal}
          modalName='Create New Material'
        />
      )}

      {isModalOpen && (
        <AddServiceCategoryModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          // onCustomerAdded={refreshGridData} // Assuming you have such a prop
          modalName='Create New Service Category'
          // onAdded={undefined}
        />
      )}
    </>
  );
};

export default PriceBook;
