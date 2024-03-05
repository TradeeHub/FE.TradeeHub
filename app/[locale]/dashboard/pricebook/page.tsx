'use client';
import React, { useState } from 'react';
import AddServiceCategoryModal from '../../ui/dashboard/pricebook/service-category/AddServiceCategoryModal/AddServiceCategoryModal';
import { Button } from '@/components/ui/button';
import AddMaterialModal from '../../ui/dashboard/pricebook/material/AddMaterialModal';
import AddLabourRateModal from '../../ui/dashboard/pricebook/labor/AddLabourRateModal';

const PriceBook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [isLabourRateModalOpen, setIsLabourRateModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMaterialModal = () =>
    setIsMaterialModalOpen(!isMaterialModalOpen);
  const toggleLabourRateModal = () =>
    setIsLabourRateModalOpen(!isLabourRateModalOpen);

  return (
    <>
      <div className='flex gap-6'>
        <Button onClick={toggleModal}>Add Service Category</Button>

        <Button onClick={() => setIsMaterialModalOpen(true)}>
          Add Material
        </Button>

        <Button onClick={() => setIsLabourRateModalOpen(true)}>
          Add Labour Rate
        </Button>
      </div>

      {isMaterialModalOpen && (
        <AddMaterialModal
          isOpen={isMaterialModalOpen}
          onClose={toggleMaterialModal}
          modalName='Create New Material'
        />
      )}

      {isLabourRateModalOpen && (
        <AddLabourRateModal
          isOpen={isLabourRateModalOpen}
          onClose={toggleLabourRateModal}
          modalName='Create New Labour Rate'
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
