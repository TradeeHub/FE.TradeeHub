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
} from '@/components/ui/form';
import SingleImageUploadForm from '@/app/[locale]/ui/general/SingleImageUploadComponent/SingleImageUploadComponent';
import { Button } from '@/components/ui/button';
import {
  useAddNewServiceCategory,
  useGetAllServiceCategoriesLazy,
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import {
  AddMaterialRequestInput,
  AddNewServiceCategoryRequestInput,
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

const pricingTierEntitySchema = z
  .array(
    z.object({
      // Define the structure according to your PricingTierEntity class
      tierName: z.string(),
      price: z.number(),
    }),
  )
  .optional()
  .nullable();

const formSchema = z.object({
  name: z.string(),
  serviceIds: z.array(z.string()).optional().nullable(),
  description: z.string().optional().nullable(),
  identifier: z.string().optional().nullable(),
  markup: markupEntitySchema,
  taxable: z.boolean(),
  allowOnlineBooking: z.boolean(),
  onlinePrice: z.number().optional().nullable(),
  cost: z.number(),
  price: z.number(),
  unitType: z.string(),
  images: z.array(z.any()).optional().nullable(), // Assuming a placeholder for file upload input
  onlineMaterialUrls: z.array(z.string()).optional().nullable(),
  pricingTiers: pricingTierEntitySchema,
});

const AddMaterialModal = ({
  isOpen,
  onClose,
  onAdded,
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
      markup: null,
      taxable: false,
      allowOnlineBooking: false,
      onlinePrice: null,
      cost: 0.0,
      price: 0.0,
      unitType: '',
      images: [],
      onlineMaterialUrls: [],
      pricingTiers: [],
    },
  });

  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories
  const { getAllServiceCategories, serviceCategories, loading, error } =
    useGetAllServiceCategoriesLazy(); // Fetch categories
  const fetchedRef = useRef<boolean>(false);

  const { toast } = useToast();

  const {
    addNewServiceCategory,
    addNewServiceCategoryResponse,
    addNewServiceCategoryLoading,
  } = useAddNewServiceCategory();

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
    const request: AddMaterialRequestInput = {
      allowOnlineBooking: formData.allowOnlineBooking,
      cost: formData.cost,
      description: formData.description,
      identifier: formData.identifier,
      images: formData.images, // Assuming you have a way to handle file uploads correctly
      markup: {
        type: 'fixed',
        value: formData.markup,
      },
      name: formData.name,
      onlineMaterialUrls: formData.onlineMaterialUrls,
      onlinePrice: formData.onlinePrice,
      price: formData.price,
      pricingTiers: formData.pricingTiers,
      serviceIds: formData.serviceIds,
      taxable: formData.taxable,
      unitType: formData.unitType,
    };

    addNewServiceCategory(request);

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
                      <SelectWithInput<AddMaterialRequestInput, 'unitType'>
                        form={form} // Cast 'form' to the correct type
                        field={field} // Cast 'field' to the correct type
                        options={unitOptions}
                        inputPlaceHolder='Unit Type'
                        defaultValue={''} // Update the defaultValue to an empty string or the appropriate value
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
                  name='cost'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <SimpleInput
                        field={field}
                        autoFocus={true}
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
                        type='number'
                      />
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
                    {/* <FormLabel
                      style={{ marginBottom: '0' }}
                      className='pb-0 pl-3 text-xs font-bold text-primary'
                    >
                      Parent Category (optional)
                    </FormLabel> */}
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
