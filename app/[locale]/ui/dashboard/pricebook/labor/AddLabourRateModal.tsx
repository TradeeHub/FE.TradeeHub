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
  Form,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  useAddLaborRate,
  useGetAllServiceCategoriesLazy,
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import {
  AddLaborRateRequestInput,
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
import PricingTier from '../material/PricingTier/PricingTier';

const laborUnitOptions = [
  { label: 'Other', value: 'Other' }, // For any other unique pricing models
  { label: 'Hourly', value: 'Hourly' }, // For services charged by the hour
  { label: 'Daily', value: 'Daily' }, // For services charged by the day
  { label: 'Fixed Rate', value: 'FixedRate' }, // For services offered at a fixed price
  { label: 'Per Job', value: 'Per Job' }, // For total project costs
  { label: 'Meter', value: 'Meter' },
  { label: 'Square Meter (sqm)', value: 'Square Meter (sqm)' }, // For area-based pricing
  { label: 'Cubic Meter', value: 'Cubic Meter' },
  { label: 'Each', value: 'Each' }, // For individual item or task pricing
  { label: 'Per Visit', value: 'Per Visit' }, // For services charged per visit or call-out
  { label: 'Per Unit Installed', value: 'Per Unit Installed' }, // For installations charged per unit
  { label: 'Per Mile', value: 'Per Mile' }, // For services that include travel distance
  { label: 'Per Kilometer', value: 'Per Kilometer' },
];

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
  description: z.string().optional().nullable(),
  parentServiceCategoryId: z.string().optional().nullable(),
  usePriceRange: z.boolean(),
  cost: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  rateType: z.string(),
  pricingTiers: pricingTierEntitySchema,
});

const MarginProfitDisplay = ({
  cost,
  price,
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

const AddLabourRateModal = ({
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
      description: null,
      rateType: '',
      usePriceRange: false,
      cost: null,
      price: null,
      parentServiceCategoryId: null,
      pricingTiers: [],
    },
  });

  const { addLaborRate, addLaborRateResponse, addLaborRateLoading } =
    useAddLaborRate();

  const user = useSelector((state: RootState) => state.user.data);
  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories
  const { getAllServiceCategories, serviceCategories } =
    useGetAllServiceCategoriesLazy();
  const fetchedRef = useRef<boolean>(false);
  const usePriceRange = form.watch('usePriceRange');
  const priceWatch = form.watch('price');
  const costWatch = form.watch('cost');
  const { toast } = useToast();

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

  const handleSave = async (formData: z.infer<typeof formSchema>) => {
    console.log('formData', formData);

    const request: AddLaborRateRequestInput = {
      cost: formData.cost,
      description: formData.description,
      usePriceRange: formData.usePriceRange,
      name: formData.name,
      price: formData.price,
      pricingTiers: formData.pricingTiers?.map((tier) => ({
        cost: tier.cost ? tier.cost : null,
        price: tier.price,
        unitRange: {
          max: tier.unitRange.max,
          min: tier.unitRange.min,
        },
      })),
      parentServiceCategoryId: formData.parentServiceCategoryId,
      rateType: formData.rateType ?? '',
    };

    addLaborRate(request);

    fetchedRef.current = false;
  };

  useEffect(() => {
    const resp = addLaborRateResponse?.addLaborRate;
    if (resp?.id) {
      handleClose();
      toast({
        title: 'Successfully Created a New Labour Rate!',
        description: (
          <span>
            You have successfully created a labour rate{' '}
            <b>
              <u>{resp.name}</u>
            </b>
          </span>
        ),
      });
    }
  }, [addLaborRateResponse]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='w-full max-w-xl p-6'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-center'>{modalName}</DialogTitle>
          {/* <BreakpointIndicator /> */}
        </DialogHeader>

        <Form {...form}>
          <form className='flex flex-col gap-6'>
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
            <FormField
              control={form.control}
              name='rateType'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <SelectWithInput
                    form={form}
                    field={field}
                    options={laborUnitOptions}
                    title='Rate Type'
                    inputPlaceHolder='Select Unit Type'
                    defaultValue={''}
                  />
                </FormItem>
              )}
            />
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
                        <SimpleSelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SimpleSelectItem>
                      ))}
                    </SimpleSelectContent>
                  </SimpleSelect>
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

            {!usePriceRange && (
              <>
                <div className='flex flex-row gap-6'>
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
                        className={`w-full ${!usePriceRange ? 'pb-6' : ''}`}
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
                </div>
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
                      title='Rate Type Pricing Range'
                    />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='h-full'>
                  <FormControl>
                    <Textarea
                      placeholder='Please enter a service category description (optional)'
                      className='h-full min-h-[100px] w-full resize-y overflow-auto'
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className='flex justify-end gap-6'>
              <Button type='button' variant='ghost' onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='default'
                onClick={form.handleSubmit(handleSave)}
                disabled={addLaborRateLoading}
              >
                {addLaborRateLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLabourRateModal;
