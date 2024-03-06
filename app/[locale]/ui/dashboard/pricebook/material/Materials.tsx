'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import AddMaterialModal from './AddMaterialModal';
import { useState } from 'react';

const Materials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      {isModalOpen && (
        <AddMaterialModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          modalName='Create New Material'
        />
      )}

      <div className='space-y-6 pt-4'>
        <div className='bg-linen relative flex flex-1 items-center rounded-xl'>
          <IoSearchOutline className='absolute left-3 h-6 w-6 text-primary/40' />
          <Input
            type='text'
            placeholder='Search for materials'
            className='h-10 w-full rounded-xl border border-border bg-primary/5 pl-10'
          />
        </div>
        <div className='flex flex-row items-center justify-between rounded-xl border-[1px] border-solid p-5'>
          <div>
            <div className='flex flex-col font-bold'>Materials</div>
            <div className=''>Manage your materials</div>
          </div>
          <Button variant='default' onClick={toggleModal}>
            New
          </Button>
        </div>
      </div>
    </>
  );
};

export default Materials;