import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
  FormLabel,
} from '@/components/ui/form';
import SingleImageUploadForm from '@/app/[locale]/ui/general/SingleImageUploadComponent/SingleImageUploadComponent';
import { Button } from '@/components/ui/button';
import {
  useAddNewServiceCategory,
  useGetAllServiceCategoriesLazy,
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import {
  AddMaterialRequestInput,
  MarkupType,
  ServiceCategoryEntity,
} from '@/generatedGraphql';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimpleInput } from '../../../general/SimpleInput/SimpleInput';
import {
  SimpleSelect,
  SimpleSelectContent,
  SimpleSelectItem,
  SimpleSelectTrigger,
  SimpleSelectValue,
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
  { label: 'Bundle', value: 'Bundle' },
];

const markupEntitySchema = z
  .object({
    type: z.string(),
    value: z.number(),
  })
  .optional()
  .nullable();

const rangeOfDecimalSchema = z.object({
  max: z.number().optional(),
  min: z.number().optional(),
  overlaps: z.boolean(),
});

const pricingTierEntitySchema = z
  .array(
    z.object({
      id: z.string().optional().nullable(),
      cost: z.number().optional().nullable(), // Assuming cost can be nullable
      price: z.number().optional().nullable(),
      unitRange: rangeOfDecimalSchema,
    }),
  )
  .optional()
  .nullable();

const formSchema = z.object({
  name: z.string(),
  serviceIds: z.array(z.string()).optional().nullable(),
  description: z.string().optional().nullable(),
  identifier: z.string().optional().nullable(),
  parentServiceCategoryId: z.string().optional().nullable(),
  markup: markupEntitySchema,
  usePriceRange: z.boolean(),
  taxable: z.boolean(),
  allowOnlineBooking: z.boolean(),
  onlinePrice: z.number().optional().nullable(),
  cost: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  unitType: z.string(),
  images: z.array(z.any()).optional().nullable(), // Assuming a placeholder for file upload input
  onlineMaterialUrl: z.string().optional().nullable(),
  pricingTiers: pricingTierEntitySchema,
});

const AddMaterialModal = ({
  isOpen,
  onClose,
  modalName,
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
      serviceIds: [],
      description: null,
      identifier: null,
      parentServiceCategoryId: null,
      markup: null,
      usePriceRange: false,
      taxable: false,
      allowOnlineBooking: false,
      onlinePrice: null,
      cost: 0,
      price: 0,
      unitType: '',
      images: [],
      onlineMaterialUrl: '',
      pricingTiers: [],
    },
  });
  const user = useSelector((state: RootState) => state.user.data);
  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories
  const { getAllServiceCategories, serviceCategories } =
    useGetAllServiceCategoriesLazy(); // Fetch categories
  const fetchedRef = useRef<boolean>(false);
  const usePriceRange = form.watch('usePriceRange');

  const { toast } = useToast();

  const { addNewServiceCategoryResponse, addNewServiceCategoryLoading } =
    useAddNewServiceCategory();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    console.log('serviceCategories', serviceCategories);
    if (serviceCategories) {
      setCategories(serviceCategories as ServiceCategoryEntity[]);
    }
  }, [serviceCategories]);

  const handleSelectTriggerClick = () => {
    console.log('handleSelectTriggerClick');
    if (!fetchedRef.current) {
      getAllServiceCategories({ fetchPolicy: 'network-only' });
      fetchedRef.current = true;
    }
  };

  useEffect(() => {
    const resp = addNewServiceCategoryResponse?.addNewServiceCategory;
    if (resp?.id) {
      handleClose();
      toast({
        title: 'Successfully Created New Service Category',
        description: (
          <span>
            You have successfully created a new service category{' '}
            <b>
              <u>{resp.name}</u>
            </b>
          </span>
        ),
      });
    }
  }, [addNewServiceCategoryResponse]);

  const handleSave = async (formData: z.infer<typeof formSchema>) => {
    // Format decimal values as strings in the expected decimal format
    const formatDecimal = (value: number) => value.toString();

    console.log('formData', formData);

    // Ensure all decimal values are formatted as strings
    const request: AddMaterialRequestInput = {
      allowOnlineBooking: formData.allowOnlineBooking,
      cost: formData.cost,
      description: formData.description,
      identifier: formData.identifier,
      images: formData.images, // Assuming you have a way to handle file uploads correctly
      markup: formData.markup
        ? {
            type: formData.markup.type as MarkupType,
            value: formatDecimal(formData.markup.value),
          }
        : undefined,
      name: formData.name,
      onlineMaterialUrls: formData.onlineMaterialUrl
        ? [formData.onlineMaterialUrl]
        : [],
      onlinePrice: formData.onlinePrice
        ? formatDecimal(formData.onlinePrice)
        : undefined,
      price: formData.price,
      pricingTiers: formData.pricingTiers?.map((tier) => ({
        cost: tier.cost ? formatDecimal(tier.cost) : undefined,
        price: formatDecimal(tier.price ?? 0),
        unitRange: {
          max: formatDecimal(tier.unitRange.max ?? 0),
          min: formatDecimal(tier.unitRange.min ?? 0),
        },
      })),
      parentServiceCategoryId: formData.parentServiceCategoryId,
      taxable: formData.taxable,
      unitType: formData.unitType,
    };

    console.log('request', request);

    fetchedRef.current = false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='w-full max-w-4xl p-6'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-center'>{modalName}</DialogTitle>
          <BreakpointIndicator />
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

            <div className='flex flex-col gap-6'>
              {/* Description */}
              <FormField
                control={form.control}
                name='onlineMaterialUrls'
                render={({ field }) => (
                  <FormItem className='flex-1'>
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
              {/* Description */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Textarea
                        placeholder='Please enter a service category description (optional)'
                        className='min-h-[100px]'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='flex w-full flex-row gap-6'>
                <div className='flex w-full gap-6'>
                  {/* Set flex-basis to 33.333% for each child to take up 1/3 of the screen */}
                  <div className='flex flex-1'>
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
                  </div>
                  <div className='flex-1'>
                    <FormField
                      control={form.control}
                      name='taxable'
                      render={({ field }) => (
                        <FormItem className='flex w-full items-center justify-between'>
                          <FormLabel className='self-center'>Taxable</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex-1'>
                    <FormField
                      control={form.control}
                      name='allowOnlineBooking'
                      render={({ field }) => (
                        <FormItem className='flex w-full items-center justify-between'>
                          <FormLabel>Online Booking</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='flex w-full flex-col gap-6'>
                <div className='flex w-full flex-row gap-6'>
                  <div className='flex flex-1'>
                    <FormField
                      control={form.control}
                      name='usePriceRange'
                      render={({ field }) => (
                        <FormItem className='flex w-full items-center justify-between'>
                          <FormLabel>Use Price Range</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {!usePriceRange && ( <>
                      <div className='flex flex-1'>
                        <FormField
                          control={form.control}
                          name='cost'
                          render={({ field }) => (
                            <FormItem className='flex-1'>
                              <SimpleInput
                                field={field}
                                title='Cost'
                                placeholder='Cost'
                                type='number'
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-1'>
                        <FormField
                          control={form.control}
                          name='price'
                          render={({ field }) => (
                            <FormItem className='flex-1'>
                              <SimpleInput
                                field={field}
                                title='Price'
                                placeholder='Price'
                                type='number'
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                      </>
                  )}

                {usePriceRange && (
                        <div className=' flex w-2/3'>
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
                  </div>
                )}
                </div>
            
              </div>
            </div>

            <DialogFooter className='flex justify-end gap-6'>
              <Button type='button' variant='ghost' onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='default'
                disabled={addNewServiceCategoryLoading}
              >
                {addNewServiceCategoryLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMaterialModal;

const BreakpointIndicator = () => {
  return (
    <div className='fixed bottom-0 left-0 z-50 bg-gray-900 p-2 text-white'>
      <div className='sm:hidden'>XS</div>
      <div className='hidden sm:block md:hidden'>SM</div>
      <div className='hidden md:block lg:hidden'>MD</div>
      <div className='hidden lg:block xl:hidden'>LG</div>
      <div className='hidden xl:block 2xl:hidden'>XL</div>
      <div className='hidden 2xl:block'>2XL</div>
    </div>
  );
};
