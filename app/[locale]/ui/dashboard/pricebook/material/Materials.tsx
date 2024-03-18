'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoSearchOutline } from 'react-icons/io5';
import { useRef, useState } from 'react';
import {
  useGetMaterials,
  useGetMaterialsLazy
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import { GridRef, PageInfoSlim } from '@/app/[locale]/types/sharedTypes';
import {
  ColDef,
  ValueGetterParams
} from 'ag-grid-community/dist/lib/entities/colDef';
import { MaterialEntity } from '@/generatedGraphql';
import moment from 'moment';
import NewGrid from '@/app/[locale]/components/NewGrid';
import Image from 'next/image';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import MaterialModal from './MaterialModal';
import { set } from 'react-hook-form';

const Materials = ({ centerStyle }: { centerStyle: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const gridRef = useRef<GridRef<MaterialEntity>>(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const { allMaterials } = useGetMaterials();
  const { searchMaterials, data, loading, error, fetchMoreMaterials } =
    useGetMaterialsLazy();
  const user = useSelector((state: RootState) => state.user.data);

  const symbol = user?.currencySymbol;
  const pageInfo = allMaterials?.materials?.pageInfo?.endCursor
    ? allMaterials?.materials?.pageInfo
    : null;
  const [actionableItem, setActionableItem] = useState<MaterialEntity>();

  const handleDeleteMaterial = (data: MaterialEntity) => {
    setActionableItem(data);
  };

  const handleUpdateMaterial = (data: MaterialEntity) => {
    setActionableItem(data);
    setIsEditModalOpen(true);
    console.log('data', data);
  };

  const initialData = allMaterials?.materials?.edges?.map((edge) => edge.node);

  const handleGetGridSelection = () => {
    const selectedMaterials =
      gridRef.current?.handleGetSelectedItems() as MaterialEntity[];
    console.log('selectedMaterials', selectedMaterials);
  };

  return (
    <>
      <div className={centerStyle}>
        <div className='max-w-none space-y-6 pt-4'>
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
              <div className='flex flex-col font-special font-bold'>
                Materials
              </div>

              <div className='text-input-special font-normal'>
                Manage your materials
              </div>
            </div>
            <Button variant='default' onClick={toggleModal}>
              New
            </Button>
            <Button variant='default' onClick={handleGetGridSelection}>
              test
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MaterialModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          modalName='Create New Material'
        />
      )}

      {isEditModalOpen && (
        <MaterialModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          updateData={actionableItem}
          modalName='Update Material'
        />
      )}

      {/* {initialData?.map((material) => (
        <MaterialCard key={material.id} material={material as MaterialEntity} />
      ))} */}

      <div className='mx-auto flex w-full max-w-7xl flex-col gap-4'>
        {allMaterials && (
          <NewGrid<MaterialEntity>
            ref={gridRef}
            columnDefs={getGridColumnDef(
              symbol,
              handleDeleteMaterial,
              handleUpdateMaterial
            )}
            fetchMoreData={(endCursor, pageSize) =>
              fetchMoreMaterials(endCursor, pageSize).then((result) => ({
                rows: result.rows as MaterialEntity[],
                pageInfo: result.pageInfo
              }))
            }
            initialData={initialData as MaterialEntity[]}
            initialPageInfo={pageInfo as PageInfoSlim}
          />
        )}
      </div>
    </>
  );
};

export default Materials;

const nameCellRenderer = (params: ValueGetterParams) => {
  const data = params.data;
  const imageUrl = data?.images?.[0]?.url;

  const cellStyle = 'flex items-center justify-start h-full pl-2'; // padding-left to ensure some space from the cell start
  const imageStyle = 'object-contain w-16 h-16'; // Tailwind class for object-fit and width/height
  const imageContainerStyle = `flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden ${imageUrl ? 'mr-2' : 'invisible'}`; // invisible when no image to preserve space

  return (
    <div className={cellStyle}>
      {imageUrl && (
        <div className={imageContainerStyle}>
          <Image
            src={imageUrl}
            alt='Material'
            width={64}
            height={64}
            className={imageStyle}
            unoptimized={true}
            quality={100}
          />
        </div>
      )}
    </div>
  );
};

const getGridColumnDef = (
  currencySymbol: string,
  handleDelete: (data: MaterialEntity) => void,
  handleUpdate: (data: MaterialEntity) => void
): ColDef[] => [
  {
    checkboxSelection: true,
    width: 35,
    headerClass: 'flex items-center justify-center',
    cellClass: 'flex items-center justify-center ml-2',
    sortable: false,
    filter: false
  },
  {
    headerName: 'Image',
    field: 'Images',
    cellRenderer: nameCellRenderer,
    sortable: false,
    headerClass: 'text-base text-center flex items-center justify-center',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1
  },
  {
    headerName: 'Name',
    field: 'name',
    sortable: false,
    headerClass: 'text-base text-center flex items-center justify-center',
    cellClass: 'flex items-center',
    filter: false,
    hide: false,
    flex: 1,
    tooltipField: 'name'
  },
  {
    headerName: 'Cost',
    field: 'cost',
    sortable: false,
    headerClass: 'text-base text-center flex items-center justify-center',
    cellClass: 'flex items-center justify-center',
    valueFormatter: (params) =>
      params.value ? `${currencySymbol}${params.value}` : '',
    filter: false,
    hide: false,
    flex: 1,
    tooltipField: 'cost'
  },
  {
    headerName: 'Price',
    field: 'price',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    valueFormatter: (params) =>
      params.value ? `${currencySymbol}${params.value}` : '',
    filter: false,
    hide: false,
    flex: 1,
    tooltipField: 'price'
  },
  {
    headerName: 'Unit Type',
    field: 'unitType',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1,
    tooltipField: 'unitType'
  },
  {
    headerName: 'Category',
    field: 'serviceCategory.name',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1,
    tooltipField: 'serviceCategory.name'
  },
  {
    headerName: 'Identifier',
    field: 'identifier',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1,
    tooltipField: 'identifier'
  },
  {
    headerName: 'Taxable',
    field: 'taxable',
    sortable: false,
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    filter: false,
    hide: false,
    flex: 1,
    tooltipValueGetter: (params) => {
      return `Taxable: ${params.value ? 'Yes' : 'No'}`;
    },
    valueFormatter: (params) => (params.value ? 'Yes' : 'No') // Add this line
  },
  {
    headerName: 'Description',
    width: 120,
    field: 'description',
    sortable: false,
    headerClass: 'text-base text-center flex items-center justify-center',
    cellClass: 'flex items-center',
    filter: false,
    hide: false,
    tooltipField: 'description'
  },
  {
    headerName: 'Actions',
    field: 'actions',
    headerClass: 'text-base',
    cellClass: 'flex items-center justify-center',
    cellRenderer: actionCellRenderer(handleDelete, handleUpdate),
    pinned: 'right',
    resizable: false,
    width: 120,
    suppressMovable: true,
    sortable: false,
    filter: false
  }
];

const actionCellRenderer = (
  handleDelete: (data: MaterialEntity) => void,
  handleUpdate: (data: MaterialEntity) => void
) => {
  return (params: ValueGetterParams) => {
    const onEdit = () => {
      handleUpdate(params.data);
    };

    const onDelete = () => {
      handleDelete(params.data);
    };

    return (
      <>
        <div className='flex items-center justify-center'>
          <Button
            variant='ghost'
            size='default'
            onClick={onEdit}
            className='mr-2'
          >
            <FiEdit>Edit</FiEdit>
          </Button>
          <Button variant='ghost' size='default' onClick={onDelete}>
            <RiDeleteBin7Line>Delete </RiDeleteBin7Line>
          </Button>
        </div>
      </>
    );
  };
};
