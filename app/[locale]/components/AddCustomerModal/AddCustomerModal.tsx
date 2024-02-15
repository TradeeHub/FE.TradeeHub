import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import {
  ControllerRenderProps,
  UseFormReturn,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectWithInputForm from '../SelectWithInputForm/SelectWithInputForm';
import { AddCustomerFormRequest, UserPlace } from '../../types/sharedTypes';
import { RxCross2 } from 'react-icons/rx';
import { SwitchWithLabel } from '../SwitchWithLabel/SwitchWithLabel';
import { CustomButton } from '../CustomButton/CustomButton';
import TagsInput from '../TagsInput/TagsInput';
import AddressAutocomplete from '../../ui/general/AddressAutocomplete/AddressAutocomplete';
import { Checkbox } from '@/components/ui/checkbox';
import CommentSection from '../../ui/general/Comment';
import {
  AddNewCustomerRequestInput,
  AddNewCustomerResponse,
  ReferenceType,
} from '@/generatedGraphql';
import { useAddNewCustomer } from '../../hooks/customer/useCustomer';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { usePathname, useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
import CustomerReferenceSearch from '../../ui/general/CustomerReferenceSearch/CustomerReferenceSearch';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import ProgressBar from '../../ui/auth/ProgressBar/ProgressBar';
import MultiPhoneNumber from './AddPhoneNumber/AddPhoneNumber';
import MultiEmail from './MultiEmail/MultiEmail';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCustomerAdded: () => void;
  modalName: string;
};
const phoneNumberTypeOptions = [
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Home', value: 'Home' },
  { label: 'Work', value: 'Work' },
  { label: 'Other', value: 'Other' }, // This could trigger an input for custom type
];

const emailTypeOptions = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Work', value: 'Work' },
  { label: 'Other', value: 'Other' }, // This could trigger an input for custom type
];

const titleOptions = [
  { label: 'No Title', value: 'Empty' },
  { label: 'Mr.', value: 'Mr.' },
  { label: 'Mrs.', value: 'Mrs.' },
  { label: 'Ms.', value: 'Ms.' },
  { label: 'Miss.', value: 'Miss.' },
  { label: 'Dr.', value: 'Dr.' },
  { label: 'Other', value: 'Other' },
];

const customerTypeOptions = [
  { label: 'Customer Type', value: 'Empty' },
  { label: 'Home Owner', value: 'Home Owner' },
  { label: 'Tenant', value: 'Tenant' },
  { label: 'Landlord', value: 'Landlord' },
  { label: 'Small Business', value: 'Small Business' },
  { label: 'Agency', value: 'Agency' },
  { label: 'Real Estate', value: 'Real Estate' },
  { label: 'City Council', value: 'City Council' },
  { label: 'Property Management Company', value: 'Property Management' },
  { label: 'Construction Firm', value: 'Construction Firm' },
  { label: 'Educational Institution', value: 'Educational Institution' },
  { label: 'Other', value: 'Other' },
];

const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const ViewportSchema = z.object({
  northeast: LocationSchema,
  southwest: LocationSchema,
});

const UserPlaceSchema = z.object({
  PlaceId: z.string(),
  Address: z.string(),
  Country: z.string(),
  CountryCode: z.string(),
  CallingCode: z.string(),
  Location: LocationSchema,
  Viewport: ViewportSchema,
});

const AddCustomerModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onCustomerAdded,
  modalName,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const TOTAL_STEPS = 2;
  const [currentStep, setCurrentStep] = useState(2);

  const { addNewCustomer, addNewCustomerResponse, addNewCustomerLoading } =
    useAddNewCustomer();
  const user = useSelector((state: RootState) => state.user.data);

  const formSchema = z
    .object({
      title: z.string().nullable(),
      name: z.string().nullable(),
      surname: z.string().nullable(),
      alias: z.string().nullable(),
      customerType: z.string().nullable(),
      companyName: z.string().nullable(),
      useCompanyName: z.boolean(),
      emails: z
        .array(
          z.object({
            emailType: z.string(),
            email: z
              .string()
              .refine(
                (email) =>
                  !email ||
                  email === '' ||
                  z.string().email().safeParse(email).success,
                {
                  message: 'Invalid email format.',
                },
              ),
            receiveNotifications: z.boolean(),
          }),
        )
        .nullable(),
      phoneNumbers: z
        .array(
          z.object({
            phoneNumberType: z.string(),
            phoneNumber: z.string().refine(
              (phoneNumber) => {
                const callingCode = '+' + user?.place.callingCode; // Example, replace with dynamic code
                if (!phoneNumber || phoneNumber === callingCode) return true; // If phoneNumber is undefined or null, it passes
                return (
                  phoneNumber.startsWith(callingCode) &&
                  /^\+\d{9,14}$/.test(phoneNumber)
                );
              },
              {
                message:
                  'Phone number must include correct country code and be 9 to 14 digits long.',
              },
            ),
            receiveNotifications: z.boolean(),
          }),
        )
        .nullable(),
      property: UserPlaceSchema.nullable(),
      isBillingAddress: z.boolean(),
      billing: UserPlaceSchema.nullable(),
      tags: z.array(z.string()).nullable(),
      reference: z
        .object({
          id: z.string(),
          referenceType: z.string(),
        })
        .nullable(),
      comment: z.string().nullable(),
      multiValidation: z.string().nullable().optional(),
    }) // First refine for companyName
    .refine(
      (data) =>
        !data.useCompanyName ||
        (data.useCompanyName && Boolean(data.companyName)),
      {
        message:
          'Company Name is required when use company name as main checkbox is checked.',
        path: ['companyName'],
      },
    )
    // Second refine for name, surname, or alias
    .refine(
      (data) =>
        data.useCompanyName ||
        (!data.useCompanyName &&
          Boolean(data.name || data.surname || data.alias)),
      {
        message:
          'At least of the three Name, Surname or Alias must be provided.',
        path: ['multiValidation'], // Adjust path as necessary
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      name: '',
      surname: '',
      alias: '',
      customerType: '',
      companyName: '',
      useCompanyName: false,
      emails: [{ emailType: '', email: '', receiveNotifications: true }],
      phoneNumbers: [
        { phoneNumberType: '', phoneNumber: '', receiveNotifications: true },
      ],
      property: null,
      isBillingAddress: true,
      billing: null,
      tags: [],
      reference: null,
      comment: '',
    },
  });

  const { watch, setValue, resetField } = form;
  const property = watch('property');
  const isBillingAddress = watch('isBillingAddress');
  const customerType = watch('customerType');
  const hiddenCompanyTypes = ['', 'Home Owner', 'Tenant', 'Landlord'];

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: 'phoneNumbers',
  });

  // Field array for emails
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: 'emails',
  });

  const handleAddCustomer = async (formData: z.infer<typeof formSchema>) => {
    const formValues = form.getValues();
    console.log('formData', formData, 'formValues', formValues);

    const customerData: AddNewCustomerRequestInput = {
      title: formValues.title,
      name: formValues.name,
      surname: formValues.surname,
      alias: formValues.alias,
      customerType: formValues.customerType ?? '',
      companyName: formValues.companyName,
      useCompanyName: formValues.useCompanyName,
      emails: formValues.emails?.map((email) => ({
        emailType: email.emailType,
        email: email.email,
        receiveNotifications: email.receiveNotifications,
      })),
      phoneNumbers: formValues.phoneNumbers?.map((phone) => ({
        phoneNumberType: phone.phoneNumberType,
        phoneNumber: phone.phoneNumber,
        receiveNotifications: phone.receiveNotifications,
      })),
      property: formValues.property
        ? {
            placeId: formValues.property.PlaceId,
            address: formValues.property.Address,
            country: formValues.property.Country,
            countryCode: formValues.property.CountryCode,
            callingCode: formValues.property.CallingCode,
            location: {
              lat: formValues.property.Location.lat,
              lng: formValues.property.Location.lng,
            },
            viewport: {
              northeast: formValues.property.Viewport.northeast,
              southwest: formValues.property.Viewport.southwest,
            },
          }
        : null,
      isBillingAddress: formValues.isBillingAddress,
      billing: formValues.billing
        ? {
            placeId: formValues.billing.PlaceId,
            address: formValues.billing.Address,
            country: formValues.billing.Country,
            countryCode: formValues.billing.CountryCode,
            callingCode: formValues.billing.CallingCode,
            location: {
              lat: formValues.billing.Location.lat,
              lng: formValues.billing.Location.lng,
            },
            viewport: {
              northeast: formValues.billing.Viewport.northeast,
              southwest: formValues.billing.Viewport.southwest,
            },
          }
        : null,
      tags: formValues.tags,
      reference: formValues.reference
        ? {
            id: formValues.reference.id,
            referenceType: formValues.reference.referenceType as ReferenceType,
          }
        : null,
      comment: formValues.comment,
    };

    addNewCustomer(customerData);
  };

  const onPlaceSelectForProperty = (place: UserPlace | null) => {
    if (place) {
      setValue('property', place);
      // If a property is selected, by default, billing address is same as property
      setValue('isBillingAddress', true);
    } else {
      resetField('property');
      setValue('isBillingAddress', false); // Reset or adjust based on your logic
    }
  };

  const onPlaceSelectForBilling = (place: UserPlace | null) => {
    if (place) {
      setValue('billing', place);
    } else {
      resetField('billing'); // Or set to an initial empty state as per your schema
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const navigateToCustomerDetails = (customerId: string) => {
    router.push(`${pathname}/${customerId}`);
  };

  useEffect(() => {
    const customer =
      addNewCustomerResponse?.addNewCustomer as AddNewCustomerResponse;
    if (customer) {
      handleClose();
      toast({
        title: 'Successfully Added New Customer',
        description: `You have successfully added a new customer with the following ${customer.customerReferenceNumber}`,
        action: (
          <ToastAction
            className='bg-primary text-white' // Assuming 'bg-primary' is your primary color class
            altText='View Customer'
            onClick={() => navigateToCustomerDetails(customer.id)}
          >
            View
          </ToastAction>
        ),
      });
      onCustomerAdded();
    }
  }, [addNewCustomerResponse]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className='w-full max-w-2xl font-roboto'>
          <DialogHeader className='flex items-center justify-center'>
            {' '}
            <DialogTitle className='text-center'>{modalName}</DialogTitle>{' '}
          </DialogHeader>
          <ProgressBar
            totalSteps={TOTAL_STEPS}
            currentStep={currentStep}
            labels={['Details', ' Additional Info']}
          />

          <Form {...form}>
            <form className='space-y-6'>
              <div className='flex items-center'>
                {' '}
                {/* Bottom margin for spacing between rows */}
                <div className='w-1/4 pr-2'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <SelectWithInputForm<AddCustomerFormRequest, 'title'>
                          form={form as UseFormReturn<AddCustomerFormRequest>} // Cast the form prop to the correct type
                          field={
                            field as ControllerRenderProps<
                              AddCustomerFormRequest,
                              'title'
                            >
                          } // Cast the field prop to the correct type
                          options={titleOptions}
                          inputPlaceHolder='Other Title'
                          defaultValue='Empty'
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div
                className='pd-2 flex flex-wrap items-center gap-4 '
                style={{ marginTop: 15 }}
              >
                <div className='flex-1'>
                  {' '}
                  {/* This div wraps the FormField for 'name' */}
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AuthInputWithIcon
                            field={field}
                            autoFocus={true}
                            placeholder='Name'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex-1'>
                  {' '}
                  {/* This div wraps the FormField for 'name' */}
                  <FormField
                    control={form.control}
                    name='surname'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AuthInputWithIcon
                            field={field}
                            autoFocus={false}
                            placeholder='Surname'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex-1'>
                  {' '}
                  {/* This div wraps the FormField for 'name' */}
                  <FormField
                    control={form.control}
                    name='alias'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AuthInputWithIcon
                            field={field}
                            autoFocus={false}
                            placeholder='Alias'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div style={{ marginTop: 0 }}>
                <FormField
                  control={form.control}
                  name='multiValidation'
                  render={() => <StyledFormMessage />}
                />
              </div>
              <div className=''>
                <FormField
                  control={form.control}
                  name='customerType'
                  render={({ field }) => (
                    <FormItem>
                      <SelectWithInputForm<
                        AddCustomerFormRequest,
                        'customerType'
                      >
                        form={form as UseFormReturn<AddCustomerFormRequest>} // Cast the form prop to the correct type
                        field={
                          field as ControllerRenderProps<
                            AddCustomerFormRequest,
                            'customerType'
                          >
                        } // Cast the field prop to the correct type
                        options={customerTypeOptions}
                        inputPlaceHolder='Other Customer Type'
                        defaultValue='Empty'
                      />
                    </FormItem>
                  )}
                />
              </div>

              {!hiddenCompanyTypes.includes(customerType as string) && (
                <>
                  <div>
                    <FormField
                      control={form.control}
                      name='companyName'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AuthInputWithIcon
                              field={field}
                              autoFocus={false}
                              placeholder='Company Name'
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className='mt-1 pl-4'>
                      <FormField
                        control={form.control}
                        name='useCompanyName'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-start space-x-2 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => {
                                  field.onChange(checked);
                                }}
                              />
                            </FormControl>
                            <FormLabel className='text-sm'>
                              Use company name as main display instead of name.
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              )}
              {/* Phone Numbers */}

              <MultiPhoneNumber
                form={form as UseFormReturn<AddCustomerFormRequest>}
              />
              <MultiEmail
                form={form as UseFormReturn<AddCustomerFormRequest>}
              />

              {/* Property*/}
              <div className='pt-2'>
                <FormField
                  control={form.control}
                  name={`property`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AddressAutocomplete
                          field={field}
                          onPlaceSelected={onPlaceSelectForProperty}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {property?.PlaceId && (
                  <div className='mt-1 pl-4'>
                    <FormField
                      control={form.control}
                      name='isBillingAddress'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-2 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (checked) {
                                  resetField('billing');
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-sm'>
                            Same address for billing and property.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Conditionally render billing address field */}
                {!isBillingAddress && property?.PlaceId && (
                  <div className='pt-6'>
                    <FormField
                      control={form.control}
                      name='billing'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AddressAutocomplete
                              field={field}
                              onPlaceSelected={onPlaceSelectForBilling}
                              placeholder='Billing Address'
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className='pt-2'>
                <FormField
                  control={form.control}
                  name='tags'
                  render={({ field }) => (
                    <TagsInput
                      field={field}
                      placeholder='Tags' // Optional: customize the placeholder text
                    />
                  )}
                />
              </div>

              <div className='pt-2'>
                <FormField
                  control={form.control}
                  name='reference'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomerReferenceSearch
                          field={field}
                          placeholder='Reference'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='pt-2'>
                <FormField
                  control={form.control}
                  name='comment'
                  render={({ field }) => (
                    <CommentSection
                      field={field}
                      placeholder='Add an internal comment' // Optional: customize the placeholder text
                    />
                  )}
                />{' '}
              </div>
            </form>
          </Form>
          <DialogFooter className='sm:justify-end'>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
                onClick={handleClose}
                disabled={addNewCustomerLoading}
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type='button'
              variant='default'
              onClick={form.handleSubmit(handleAddCustomer)}
              disabled={addNewCustomerLoading}
            >
              {addNewCustomerLoading ? (
                <>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  Adding...
                </>
              ) : (
                'Add'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCustomerModal;
