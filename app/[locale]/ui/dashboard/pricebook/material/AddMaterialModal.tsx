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
  taxable: z.boolean(),
  allowOnlineBooking: z.boolean(),
  onlinePrice: z.number().optional().nullable(),
  cost: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  unitType: z.string(),
  images: z.array(z.any()).optional().nullable(), // Assuming a placeholder for file upload input
  onlineMaterialUrls: z.array(z.string()).optional().nullable(),
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
      taxable: false,
      allowOnlineBooking: false,
      onlinePrice: null,
      cost: 0,
      price: 0,
      unitType: '',
      images: [],
      onlineMaterialUrls: [],
      pricingTiers: [],
    },
  });
  const user = useSelector((state: RootState) => state.user.data);
  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories
  const { getAllServiceCategories, serviceCategories } =
    useGetAllServiceCategoriesLazy(); // Fetch categories
  const fetchedRef = useRef<boolean>(false);

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
      onlineMaterialUrls: formData.onlineMaterialUrls,
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
      serviceIds: formData.serviceIds,
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
        </DialogHeader>

        <Form {...form}>
          <form className='grid grid-cols-4 gap-4'>
            <div className='col-span-1'>
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

            <div className='col-span-1 space-y-11 md:col-span-3 '>
              <div className='flex flex-col md:flex-row md:space-x-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <SimpleInput
                        field={field}
                        autoFocus={true}
                        placeholder='Name'
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='unitType'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <SelectWithInput
                        form={form}
                        field={field}
                        options={unitOptions}
                        inputPlaceHolder='Unit Type'
                        defaultValue={''}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col md:flex-row md:space-x-4'>
                <FormField
                  control={form.control}
                  name='identifier'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <SimpleInput field={field} placeholder='Identifier' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='taxable'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 items-center justify-between rounded-lg border p-1.5 px-4 shadow-sm'>
                      <FormLabel className=''>Taxable</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='allowOnlineBooking'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 items-center justify-between rounded-lg border p-1.5 px-4 shadow-sm'>
                      <FormLabel className=''>Online Booking</FormLabel>
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
            <div className='col-span-2 space-y-4'>
              <FormField
                control={form.control}
                name='parentServiceCategoryId'
                render={({ field }) => (
                  <FormItem>
                    <SimpleSelect
                      onOpenChange={handleSelectTriggerClick}
                      onValueChange={field.onChange}
                      defaultValue={field.value || ''}
                    >
                      <SimpleSelectTrigger
                        style={{ marginTop: 0 }}
                        className='w-full flex-1'
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder='Please enter a service category description (optional)'
                        className='min-h-[100px]'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 space-y-4'>
              <FormField
                control={form.control}
                name='cost'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <SimpleInput
                      field={field}
                      autoFocus={true}
                      currencySymbol={user?.currencySymbol}
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
                  <FormItem className='flex-1'>
                    <SimpleInput
                      field={field}
                      placeholder='Price'
                      currencySymbol={user?.currencySymbol}
                      type='number'
                    />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='pricingTiers'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <PricingTier
                      form={form}
                      field={field}
                      title='Add Pricing Tiers'
                      currencySymbol={user?.currencySymbol}
                    />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='col-span-4 flex justify-between'>
              <Button
                type='button'
                variant='ghost'
                size='default'
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type='button'
                variant='default'
                size='default'
                onClick={form.handleSubmit(handleSave)}
                disabled={addNewServiceCategoryLoading} // Disable button when loading
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
