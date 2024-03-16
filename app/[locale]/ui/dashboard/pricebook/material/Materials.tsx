'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import AddMaterialModal from './AddMaterialModal';
import { useState } from 'react';
import CustomGrid from '@/app/[locale]/components/Grid';
import {
  useGetMaterials,
  useGetMaterialsLazy
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import { PageInfoSlim } from '@/app/[locale]/types/sharedTypes';
import {
  ColDef,
  ValueGetterParams
} from 'ag-grid-community/dist/lib/entities/colDef';
import ArrayDataPopover from '@/app/[locale]/components/ArrayDataPopover';
import { MaterialEntity, PropertyEntity } from '@/generatedGraphql';
import moment from 'moment';
import NewGrid from '@/app/[locale]/components/NewGrid';
import Image from 'next/image';

const Materials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const { allMaterials } = useGetMaterials();
  const { searchMaterials, data, loading, error, fetchMoreMaterials } =
    useGetMaterialsLazy();

  const pageInfo = allMaterials?.materials?.pageInfo?.endCursor
    ? allMaterials?.materials?.pageInfo
    : null;

  const initialData = allMaterials?.materials?.edges?.map((edge) => edge.node);

  console.log('initialData', initialData);
  return (
    <>
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
      {isModalOpen && (
        <AddMaterialModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          modalName='Create New Material'
        />
      )}

      {/* {initialData?.map((material) => (
        <MaterialCard key={material.id} material={material as MaterialEntity} />
      ))} */}

      {allMaterials && (
        <NewGrid
          columnDefs={gridColumnDef}
          fetchMoreData={fetchMoreMaterials}
          initialData={initialData as object[]}
          initialPageInfo={pageInfo as PageInfoSlim}
        />
      )}
    </>
  );
};

export default Materials;

const nameCellRenderer = (params: ValueGetterParams) => {
  const data = params.data;
  const imageUrl = data?.images?.[0]?.url;
  const name = data?.name;

  // Tailwind CSS classes
  const cellStyle = 'flex items-center justify-start h-full pl-2'; // padding-left to ensure some space from the cell start
  const imageStyle = 'object-contain w-16 h-16'; // Tailwind class for object-fit and width/height
  const imageContainerStyle = `flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${imageUrl ? 'mr-2' : 'invisible'}`; // invisible when no image to preserve space
  const textStyle = 'font-semibold text-primary';

  return (
    <div className={cellStyle}>
      {/* Image container to maintain the width even if there's no image */}
      {imageUrl && (
        <div className={imageContainerStyle}>
          <Image
            src={imageUrl}
            alt='Material'
            width={64}
            height={64}
            className={imageStyle}
            unoptimized={true} // Disable image optimization
            quality={100} // Set image quality to 100%
          />
        </div>
      )}

      <div className={imageUrl ? 'text-left' : 'w-full'}>
        <span className={textStyle}>{name}</span>
      </div>
    </div>
  );
};

const gridColumnDef: ColDef[] = [
  {
    checkboxSelection: true,
    width: 35,
    headerClass: 'flex items-center justify-center',
    cellClass: 'flex items-center justify-center ml-2',
    sortable: false,
    filter: false
  },
  {
    headerName: 'Name',
    field: 'name',
    cellRenderer: nameCellRenderer,
    width: 200,
    sortable: false,
    headerClass: 'text-base text-center flex items-center justify-center',
    filter: false,
    hide: false
  },
  {
    headerName: 'Description',
    field: 'description',
    sortable: false,
    headerClass: 'text-base text-center flex items-center justify-center',
    cellClass: 'flex items-center',
    filter: false,
    hide: false,
    flex: 1
  },
  {
    headerName: 'Cost',
    field: 'cost',
    sortable: false,
    headerClass: 'text-base text-center flex items-center justify-center',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1
  },
  {
    headerName: 'Price',
    field: 'price',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1
  },
  {
    headerName: 'Identifier',
    field: 'identifier',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1
  },
  {
    headerName: 'Taxable',
    field: 'taxable',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1
  },
  {
    headerName: 'Unit Type',
    field: 'unitType',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1
  }
];

// const MaterialCard = ({ material }: { material: MaterialEntity }) => {
//   // Provide a default image or handle the absence of images gracefully
//   const imageUrl = material?.images?.length
//     ? material.images[0].url
//     : 'default_image_path.jpg';

//   // Define a function to handle Add to Cart action
//   const handleAddToCart = () => {
//     // Implement add to cart logic
//     console.log(`Adding ${material.name} to cart.`);
//   };

//   return (
//     <div className='flex flex-row items-center rounded-lg bg-white p-4 pt-2 shadow-md'>
//       <img
//         src={imageUrl}
//         alt={material.name}
//         className='mr-4 h-24 w-24 rounded-lg'
//       />
//       <div className='flex-grow'>
//         <h3 className='text-lg font-bold'>{material.name}</h3>
//         <p className='text-gray-600'>{material.description}</p>
//         {/* Assuming `parentServiceCategoryId` is used to display the category */}
//         <span
//           className={`tag ${material.taxable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
//         >
//           {material.serviceCategory?.name || 'No Category'}
//         </span>
//       </div>
//       <div className='flex flex-col items-end'>
//         <span className='text-xl font-bold'>{`$${material.cost?.toFixed(2)}`}</span>
//         <span className='text-sm text-gray-500 line-through'>{`$${material.price?.toFixed(2)}`}</span>
//         <button
//           onClick={handleAddToCart}
//           className='mt-2 inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };
