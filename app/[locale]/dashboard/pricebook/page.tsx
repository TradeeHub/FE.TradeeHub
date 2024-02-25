'use client';
import React, { useState } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import RoundButton from '../../components/RoundButton';
import AddServiceCategoryModal from '../../ui/dashboard/pricebook/service-category/AddServiceCategoryModal/AddServiceCategoryModal';

const PriceBook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <>
      <RoundButton
        icon={<HiOutlineUserAdd className='h-7 w-7' />}
        onClick={toggleModal}
      />
      <AddServiceCategoryModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        // onCustomerAdded={refreshGridData} // Assuming you have such a prop
        modalName='Create New Service Category'
        onAdded={undefined}
      />
    </>
  );
};

export default PriceBook;
