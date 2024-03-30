import { UseFormReturn, useForm } from 'react-hook-form';
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
  useGetAllServiceCategoriesLazy,
  useUpdateMaterial
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import {
  AddMaterialRequestInput,
  MaterialEntity,
  ServiceCategoryEntity,
  SortEnumType,
  UpdateMaterialRequestInput
} from '@/generatedGraphql';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  id: z.string().optional().nullable(),
  name: z.string().min(1, 'Name is required'),
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
  vendor: z.string().optional().nullable(),
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

  const margin = calculateMargin(cost, price).toFixed(2);
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

type MaterialProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerDataRefetch?: (material: MaterialEntity) => void;
  modalName: string;
  updateData?: MaterialEntity;
};

const MaterialModal = ({
  isOpen,
  onClose,
  triggerDataRefetch,
  modalName,
  updateData
}: MaterialProps) => {
  console.log(
    'updateData',
    updateData,
    isOpen,
    modalName,
    onClose,
    triggerDataRefetch
  );
  // console.log('updateData', updateData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      updateData !== undefined
        ? {
            id: updateData.id,
            name: updateData.name,
            description: updateData?.description,
            identifier: updateData?.identifier,
            parentServiceCategoryId: updateData?.serviceCategory?.id,
            usePriceRange: updateData?.usePriceRange,
            taxable: updateData?.taxable,
            allowOnlineBooking: updateData?.allowOnlineBooking,
            onlinePrice: updateData?.onlinePrice,
            cost: updateData?.cost,
            price: updateData?.price,
            unitType: updateData?.unitType,
            images: updateData?.images,
            vendor: updateData?.vendor,
            pricingTiers: updateData?.pricingTiers
          }
        : {
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
            vendor: '',
            pricingTiers: []
          }
  });

  const { addMaterial, addMaterialResponse, addMaterialLoading } =
    useAddMaterial();
  const { updateMaterial, updateMaterialResponse } = useUpdateMaterial();
  const { searchServiceCategories, serviceCategories } =
    useGetAllServiceCategoriesLazy();

  const user = useSelector((state: RootState) => state.user.data);
  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories

  const fetchedRef = useRef<boolean>(false);
  const usePriceRange = form.watch('usePriceRange');
  const allowOnlineBooking = form.watch('allowOnlineBooking');
  const priceWatch = form.watch('price');
  const costWatch = form.watch('cost');
  const { toast } = useToast();

  const handleClose = () => {
    console.log('refresh modal');
    onClose();
    form.reset();
  };

  const handleSelectTriggerClick = useCallback(() => {
    if (!fetchedRef.current) {
      searchServiceCategories({
        variables: {
          name: '',
          order: [{ modifiedAt: SortEnumType.Desc }],
          pageSize: 100
        },
        fetchPolicy: 'network-only'
      });
      fetchedRef.current = true;
    }
  }, []);

  const handleSave = async (formData: z.infer<typeof formSchema>) => {
    if (updateData) {
      const request = generateUpdateRequest(formData, updateData, form);
      updateMaterial(request);
    } else {
      const request = generateCreateRequest(formData);
      addMaterial(request);
    }

    fetchedRef.current = false;
  };

  useEffect(() => {
    if (serviceCategories) {
      const data = serviceCategories?.edges?.map((edge) => edge?.node) as [];
      setCategories(data as ServiceCategoryEntity[]);
    }
  }, [serviceCategories]);

  useEffect(() => {
    if (updateData) {
      console.log('aaaaaaaaaa', updateData);
      handleSelectTriggerClick();
    }
  }, []);

  useEffect(() => {
    const material = addMaterialResponse?.addMaterial as MaterialEntity;
    if (material?.id) {
      if (triggerDataRefetch) {
        triggerDataRefetch(material);
      }
      handleClose();

      toast({
        title: 'Successfully Created a New Material!',
        description: (
          <span>
            You have successfully created a new material{' '}
            <b>
              <u>{material.name}</u>
            </b>
          </span>
        )
      });
    }
  }, [addMaterialResponse]);

  useEffect(() => {
    const material = updateMaterialResponse?.updateMaterial
      .data as MaterialEntity;
    if (material?.id) {
      if (triggerDataRefetch) {
        triggerDataRefetch(material);
      }
      handleClose();
      toast({
        title: 'Successfully Update Material!',
        description: (
          <span>
            You have successfully update {''}
            <b>
              <u>{material.name}</u>
            </b>
          </span>
        )
      });
    }
  }, [updateMaterialResponse]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='w-full max-w-4xl p-6'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-center'>{modalName}</DialogTitle>
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
                          autoFocus={updateData ? false : true}
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
                    name='vendor'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SimpleInput
                            field={field} // Pass the entire field object
                            setValue={form.setValue} // Optionally pass setValue for manual updates
                            title='Vendor'
                            placeholder='Input vendor (name or URL)'
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
                          setValue={form.setValue}
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
                            className='' // Ensuring the switch itself is also centered if needed
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

export default MaterialModal;

const generateCreateRequest = (
  formData: z.infer<typeof formSchema>
): AddMaterialRequestInput => {
  return {
    allowOnlineBooking: formData.allowOnlineBooking,
    cost: formData.cost,
    description: formData.description,
    identifier: formData.identifier,
    usePriceRange: formData.usePriceRange,
    images: formData.images,
    name: formData.name,
    vendor: formData.vendor,
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
};

const generateUpdateRequest = (
  formData: z.infer<typeof formSchema>,
  updateData: MaterialEntity,
  form: UseFormReturn<z.infer<typeof formSchema>>
): UpdateMaterialRequestInput => {
  console.log('formDataaaaaaaaaaaaaaaaaaaaaaaaaaaaa', formData);
  const isNewImageFile =
    formData.images &&
    formData.images.length > 0 &&
    formData.images[0] instanceof File;

  let s3KeyToDelete;

  const hasExistingImage =
    updateData && updateData.images && updateData.images?.length > 0;

  const shouldDeleteImage =
    (hasExistingImage && formData.images?.length === 0) ||
    (hasExistingImage && isNewImageFile);

  if (shouldDeleteImage) {
    s3KeyToDelete = updateData.images?.[0].s3Key;
  }

  const dirtyFields = form.formState.dirtyFields;

  console.log('dirtyFields', formData.id, dirtyFields);
  return {
    id: formData.id!,
    newImage: isNewImageFile ? formData.images?.[0] : null,
    allowOnlineBooking: dirtyFields.allowOnlineBooking
      ? formData.allowOnlineBooking
      : null,
    cost: dirtyFields.cost ? formData.cost : null,
    description: dirtyFields.description ? formData.description : null,
    identifier: dirtyFields.identifier ? formData.identifier : null,
    usePriceRange: dirtyFields.usePriceRange ? formData.usePriceRange : null,
    name: dirtyFields.name ? formData.name : null,
    vendor: dirtyFields.vendor ? formData.vendor : null,
    onlinePrice: dirtyFields.onlinePrice ? formData.onlinePrice : null,
    price: dirtyFields.price ? formData.price : null,
    pricingTiers: dirtyFields.pricingTiers
      ? formData.pricingTiers?.map((tier) => ({
          cost: tier.cost ? tier.cost : null,
          price: tier.price,
          unitRange: {
            max: tier.unitRange.max,
            min: tier.unitRange.min
          }
        }))
      : null,
    parentServiceCategoryId: dirtyFields.parentServiceCategoryId
      ? formData.parentServiceCategoryId
      : null,
    taxable: dirtyFields.taxable ? formData.taxable : null,
    unitType: dirtyFields.unitType ? formData.unitType : null,
    s3KeyToDelete: s3KeyToDelete
  };
};
