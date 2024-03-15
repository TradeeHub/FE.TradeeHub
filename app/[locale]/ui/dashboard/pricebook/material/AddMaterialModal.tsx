import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormControl,
  Form,
  FormLabel
} from '@/components/ui/form';
import SingleImageUploadForm from '@/app/[locale]/ui/general/SingleImageUploadComponent/SingleImageUploadComponent';
import { Button } from '@/components/ui/button';
import {
  useAddMaterial,
  useGetAllServiceCategoriesLazy
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import {
  AddMaterialRequestInput,
  ServiceCategoryEntity,
  SortEnumType
} from '@/generatedGraphql';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimpleInput } from '../../../general/SimpleInput/SimpleInput';
import {
  SimpleSelect,
  SimpleSelectContent,
  SimpleSelectItem,
  SimpleSelectTrigger,
  SimpleSelectValue
} from '../../../general/SimpleSelect/SimpleSelect';
import SelectWithInput from '../../../general/SelectWithInput/SelectWithInput';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Switch } from '@/components/ui/switch';
import PricingTier from './PricingTier/PricingTier';

const unitOptions = [
  { label: 'Other', value: 'Other' },
  { label: 'Each', value: 'Each' },
  { label: 'Bag', value: 'Bag' },
  { label: 'Square Meter (sqm)', value: 'Sqm' },
  { label: 'Meter', value: 'Meter' },
  { label: 'Kilogram (kg)', value: 'Kilo' },
  { label: 'Liter', value: 'Liter' },
  { label: 'Roll', value: 'Roll' },
  { label: 'Box', value: 'Box' },
  { label: 'Pack', value: 'Pack' },
  { label: 'Sheet', value: 'Sheet' },
  { label: 'Cubic Meter', value: 'CubicMeter' },
  { label: 'Gallon', value: 'Gallon' },
  { label: 'Pound (lbs)', value: 'Pound' },
  { label: 'Foot', value: 'Foot' },
  { label: 'Yard', value: 'Yard' },
  { label: 'Bundle', value: 'Bundle' }
];

const rangeOfDecimalSchema = z.object({
  max: z.number().optional(),
  min: z.number().optional(),
  overlaps: z.boolean()
});

const pricingTierEntitySchema = z
  .array(
    z.object({
      id: z.string().optional().nullable(),
      cost: z.number().optional().nullable(), // Assuming cost can be nullable
      price: z.number().optional().nullable(),
      unitRange: rangeOfDecimalSchema
    })
  )
  .optional()
  .nullable();

const formSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  identifier: z.string().optional().nullable(),
  parentServiceCategoryId: z.string().optional().nullable(),
  usePriceRange: z.boolean(),
  taxable: z.boolean(),
  allowOnlineBooking: z.boolean(),
  onlinePrice: z.number().optional().nullable(),
  cost: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  unitType: z.string(),
  images: z.array(z.any()).optional().nullable(), // Assuming a placeholder for file upload input
  onlineMaterialUrl: z.string().optional().nullable(),
  pricingTiers: pricingTierEntitySchema
});

const MarginProfitDisplay = ({
  cost,
  price
}: {
  cost: number;
  price: number;
}) => {
  const calculateMargin = (cost: number, price: number) => {
    if (price) {
      return ((price - cost) / price) * 100;
    }
    return 0;
  };

  const calculateProfit = (cost: number, price: number) => {
    if (price && cost) {
      return ((price - cost) / cost) * 100;
    }
    return 0;
  };

  const margin = calculateMargin(cost, price).toFixed(2); // toFixed(2) for rounding to 2 decimal places
  const profit = calculateProfit(cost, price).toFixed(2);

  return (
    <div
      className='absolute right-1 flex flex-col items-end pr-6'
      style={{ marginTop: 0 }}
    >
      <span className='mt-1 text-xs text-blue-500'>
        M: {margin}% | P: {profit}%
      </span>
    </div>
  );
};

const AddMaterialModal = ({
  isOpen,
  onClose,
  modalName
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: () => void;
  modalName: string;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: null,
      identifier: null,
      parentServiceCategoryId: null,
      usePriceRange: false,
      taxable: false,
      allowOnlineBooking: false,
      onlinePrice: null,
      cost: null,
      price: null,
      unitType: '',
      images: [],
      onlineMaterialUrl: '',
      pricingTiers: []
    }
  });

  const { addMaterial, addMaterialResponse, addMaterialLoading } =
    useAddMaterial();

  const user = useSelector((state: RootState) => state.user.data);
  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories
  const { searchServiceCategories, serviceCategories } =
    useGetAllServiceCategoriesLazy();
  const fetchedRef = useRef<boolean>(false);
  const usePriceRange = form.watch('usePriceRange');
  const allowOnlineBooking = form.watch('allowOnlineBooking');
  const priceWatch = form.watch('price');
  const costWatch = form.watch('cost');
  const { toast } = useToast();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (serviceCategories) {
      const data = serviceCategories?.edges?.map((edge) => edge?.node) as [];
      setCategories(data as ServiceCategoryEntity[]);
    }
  }, [serviceCategories]);

  const handleSelectTriggerClick = () => {
    if (!fetchedRef.current) {
      searchServiceCategories({
        variables: {
          name: '',
          order: [{ modifiedAt: SortEnumType.Desc }],
          pageSize: 100
        }
      });

      fetchedRef.current = true;
    }
  };

  const handleSave = async (formData: z.infer<typeof formSchema>) => {
    console.log('formData', formData);

    const request: AddMaterialRequestInput = {
      allowOnlineBooking: formData.allowOnlineBooking,
      cost: formData.cost,
      description: formData.description,
      identifier: formData.identifier,
      usePriceRange: formData.usePriceRange,
      images: formData.images,
      name: formData.name,
      onlineMaterialUrls: formData.onlineMaterialUrl
        ? [formData.onlineMaterialUrl]
        : [],
      onlinePrice: formData.onlinePrice,
      price: formData.price,
      pricingTiers: formData.pricingTiers?.map((tier) => ({
        cost: tier.cost ? tier.cost : null,
        price: tier.price,
        unitRange: {
          max: tier.unitRange.max,
          min: tier.unitRange.min
        }
      })),
      parentServiceCategoryId: formData.parentServiceCategoryId,
      taxable: formData.taxable,
      unitType: formData.unitType
    };

    addMaterial(request);

    fetchedRef.current = false;
  };

  useEffect(() => {
    const resp = addMaterialResponse?.addMaterial;
    if (resp?.id) {
      handleClose();
      toast({
        title: 'Successfully Created a New Material!',
        description: (
          <span>
            You have successfully created a new material{' '}
            <b>
              <u>{resp.name}</u>
            </b>
          </span>
        )
      });
    }
  }, [addMaterialResponse]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='w-full max-w-4xl p-6'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-center'>{modalName}</DialogTitle>
          {/* <BreakpointIndicator /> */}
        </DialogHeader>

        <Form {...form}>
          <form className='flex flex-col gap-6'>
            {/* Images */}
            <div className='flex w-full gap-6'>
              {/* Images - 1/3 of screen */}
              <div className='w-1/3 shrink-0'>
                <FormField
                  control={form.control}
                  name='images'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SingleImageUploadForm field={field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Name and Unit Type - 2/3 of screen */}
              <div className='flex w-2/3 flex-col gap-6'>
                <div className='flex flex-row gap-6'>
                  {/* Name FormField */}
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <SimpleInput
                          title='Name'
                          field={field}
                          autoFocus={true}
                          placeholder='Name'
                        />
                      </FormItem>
                    )}
                  />
                  {/* Unit Type FormField */}
                  <FormField
                    control={form.control}
                    name='unitType'
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <SelectWithInput
                          form={form}
                          field={field}
                          options={unitOptions}
                          title='Unit Type'
                          inputPlaceHolder='Select Unit Type'
                          defaultValue={''}
                        />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Spacer - This div will grow and take up all available space pushing the next element to the bottom */}
                <div className='flex-grow'></div>

                {/* Parent Category FormField */}
                <FormField
                  control={form.control}
                  name='parentServiceCategoryId'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <SimpleSelect
                        onOpenChange={handleSelectTriggerClick}
                        onValueChange={field.onChange}
                        defaultValue={field.value || ''}
                      >
                        <SimpleSelectTrigger
                          className='w-full'
                          label='Parent Category (optional)'
                          onClick={handleSelectTriggerClick}
                        >
                          <SimpleSelectValue placeholder='Select Parent Category (optional)' />
                        </SimpleSelectTrigger>
                        <SimpleSelectContent>
                          {categories.map((category) => (
                            <SimpleSelectItem
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SimpleSelectItem>
                          ))}
                        </SimpleSelectContent>
                      </SimpleSelect>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex w-full gap-6'>
              {/* Left Column for Image URL and Description */}
              <div className='flex w-1/2 flex-col gap-6'>
                {/* Image URL */}
                <div className='flex flex-col'>
                  <FormField
                    control={form.control}
                    name='onlineMaterialUrl'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SimpleInput
                            field={field}
                            title='Purchase Url'
                            placeholder='Input online purchase url'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Description */}
                <div className='flex h-full flex-grow flex-col'>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem className='h-full'>
                        <FormControl>
                          <Textarea
                            placeholder='Please enter a service category description (optional)'
                            className='h-full w-full resize-y overflow-auto'
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Right Column for Form Fields */}
              <div className='flex w-1/2 flex-col gap-6'>
                {/* First Row: Identifier and Taxable */}
                <div className='flex gap-6'>
                  <FormField
                    control={form.control}
                    name='identifier'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <SimpleInput
                          field={field}
                          title='Identifier'
                          placeholder='Identifier'
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='taxable'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex h-full items-center justify-between space-x-2'>
                          <FormLabel
                            htmlFor='taxable-switch'
                            className='flex items-center'
                          >
                            Taxable
                          </FormLabel>
                          <Switch
                            id='taxable-switch'
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className='flex items-center' // Ensuring the switch itself is also centered if needed
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Second Row: Online Booking and Use Price Range */}
                <div className='flex gap-6'>
                  <FormField
                    control={form.control}
                    name='allowOnlineBooking'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex h-full items-center justify-between space-x-2'>
                          <FormLabel
                            htmlFor='allow-online-booking-switch'
                            className='flex items-center'
                          >
                            Online Booking
                          </FormLabel>
                          <Switch
                            id='allow-online-booking-switch'
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className='flex items-center' // Ensuring the switch itself is also centered if needed
                          />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='usePriceRange'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex h-full items-center justify-between space-x-2'>
                          <FormLabel
                            htmlFor='use-price-range-switch'
                            className='flex items-center'
                          >
                            Use Price Range
                          </FormLabel>
                          <Switch
                            id='use-price-range-switch'
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className='flex items-center' // Ensuring the switch itself is also centered if needed
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Third Row: Cost and Price */}
                <div className='flex gap-6'>
                  {!usePriceRange && (
                    <>
                      <FormField
                        control={form.control}
                        name='cost'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <SimpleInput
                              field={field}
                              currencySymbol={user?.currencySymbol}
                              title='Cost'
                              placeholder='Cost'
                              type='number'
                            />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                          <FormItem
                            className={`w-full ${!allowOnlineBooking && !usePriceRange ? 'pb-6' : ''}`}
                          >
                            <SimpleInput
                              field={field}
                              currencySymbol={user?.currencySymbol}
                              title='Price'
                              placeholder='Price'
                              type='number'
                            />
                            <MarginProfitDisplay
                              cost={costWatch ?? 0}
                              price={priceWatch ?? 0}
                            />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {usePriceRange && (
                    <FormField
                      control={form.control}
                      name='pricingTiers'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <PricingTier
                            currencySymbol={user?.currencySymbol}
                            form={form}
                            field={field}
                            title='Unit Type Pricing Range'
                          />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                {allowOnlineBooking && !usePriceRange && (
                  <div className='flex gap-6'>
                    <>
                      <FormField
                        control={form.control}
                        name='onlinePrice'
                        render={({ field }) => (
                          <FormItem className='w-full pb-6'>
                            <SimpleInput
                              field={field}
                              currencySymbol={user?.currencySymbol}
                              title='Online Price'
                              placeholder='Online Price'
                              type='number'
                            />
                            <MarginProfitDisplay
                              cost={costWatch ?? 0}
                              price={field.value ?? 0}
                            />
                          </FormItem>
                        )}
                      />
                    </>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className='flex justify-end gap-6'>
              <Button type='button' variant='ghost' onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='default'
                onClick={form.handleSubmit(handleSave)}
                disabled={addMaterialLoading}
              >
                {addMaterialLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMaterialModal;

// const BreakpointIndicator = () => {
//   return (
//     <div className='fixed bottom-0 left-0 z-50 bg-gray-900 p-2 text-white'>
//       <div className='sm:hidden'>XS</div>
//       <div className='hidden sm:block md:hidden'>SM</div>
//       <div className='hidden md:block lg:hidden'>MD</div>
//       <div className='hidden lg:block xl:hidden'>LG</div>
//       <div className='hidden xl:block 2xl:hidden'>XL</div>
//       <div className='hidden 2xl:block'>2XL</div>
//     </div>
//   );
// };
