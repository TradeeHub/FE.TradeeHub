import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import React, { useState } from 'react';
import { z } from 'zod';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import { ControllerRenderProps, UseFormReturn, useFieldArray, useForm } from 'react-hook-form';
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
import { AddNewCustomerRequestInput } from '@/generatedGraphql';
import { useAddNewCustomer } from '../../hooks/customer/useCustomer';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalName: string; // Added prop for the name of the modal
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

const formSchema = z.object({
  title: z.string(),
  name: z.string(),
  surname: z.string(),
  alias: z.string(),
  emails: z.array(
    z.object({
      emailType: z.string(),
      email: z.string(),
      receiveNotifications: z.boolean(),
    }),
  ),
  phoneNumbers: z.array(
    z.object({
      phoneNumberType: z.string(),
      phoneNumber: z.string(),
      receiveNotifications: z.boolean(),
    }),
  ),
  property: UserPlaceSchema,
  isBillingAddress: z.boolean(),
  billing: UserPlaceSchema.nullable(),
  tags: z.array(z.string()),
  reference: z.string().nullable(),
  comment: z.string().nullable()
});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalName }) => {

  const { addNewCustomer, addNewCustomerResponse, addNewCustomerLoading, addNewCustomerError } = useAddNewCustomer();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      name: '',
      surname: '',
      alias: '',
      emails: [{ emailType: '', email: '', receiveNotifications: true }],
      phoneNumbers: [
        { phoneNumberType: '', phoneNumber: '', receiveNotifications: true },
      ],
      property: {},
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

const handleAddCustomer = () => {
  const formValues = form.getValues();
console.log('FORM VALUES ', formValues);
const customerData: AddNewCustomerRequestInput = {
  title: formValues.title,
  name: formValues.name,
  surname: formValues.surname,
  alias: formValues.alias,
  emails: formValues.emails.map(email => ({
    emailType: email.emailType,
    email: email.email,
    receiveNotifications: email.receiveNotifications,
  })),
  phoneNumbers: formValues.phoneNumbers.map(phone => ({
    phoneNumberType: phone.phoneNumberType,
    phoneNumber: phone.phoneNumber,
    receiveNotifications: phone.receiveNotifications,
  })),
  property: formValues.property ? {
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
  } : null,
  isBillingAddress: formValues.isBillingAddress,
  billing: formValues.isBillingAddress && formValues.billing ? {
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
  } : null,
  tags: formValues.tags,
  reference: formValues.reference,
  comment: formValues.comment,
};
  addNewCustomer(customerData);
  console.log('CUSTOMER DATA ', customerData);
};

  const addPhoneNumber = () => {
    appendPhone({
      phoneNumber: '',
      phoneNumberType: '',
      receiveNotifications: true,
    });
  };

  const addEmail = () => {
    appendEmail({ email: '', emailType: '', receiveNotifications: true });
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

  const handleClose = () =>{
    form.reset();
    onClose();
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className='w-full max-w-2xl font-roboto font-roboto'>
          <DialogHeader className='flex items-center justify-center'>
            {' '}
            <DialogTitle className='text-center'>{modalName}</DialogTitle>{' '}
          </DialogHeader>
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
                        field={field as ControllerRenderProps<AddCustomerFormRequest, 'title'>} // Cast the field prop to the correct type
                        options={titleOptions}
                        inputPlaceHolder='Other Title'
                        defaultValue='Empty'
                      />
                      <StyledFormMessage />
                    </FormItem>
                  )}
                />
                </div>
              </div>

              <div
                className='pd-2 flex flex-1 items-center gap-4 '
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
                        <StyledFormMessage />
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
                        <StyledFormMessage />
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
                        <StyledFormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Phone Numbers */}
              {phoneFields.map((field, index) => (
                <div key={field.id} className='flex items-center'>
                  {' '}
                  {/* Bottom margin for spacing between rows */}
                  <div className='w-1/4 pr-2'>
                    {' '}
                    {/* Assign width to 1/4 of container and padding to the right */}
                    <FormField
                      control={form.control}
                      name={`phoneNumbers.${index}.phoneNumberType`}
                      render={({ field }) => (<SelectWithInputForm<AddCustomerFormRequest,`phoneNumbers.${typeof index}.phoneNumberType`>
                          form={form as UseFormReturn<AddCustomerFormRequest>}
                          field={field as ControllerRenderProps<AddCustomerFormRequest, `phoneNumbers.${number}.phoneNumberType`>}
                          options={phoneNumberTypeOptions}
                          inputPlaceHolder='Number Type'
                          defaultValue='Mobile'
                        />
                      )}
                    />
                  </div>
                  <div className='flex-1 px-2'>
                    {' '}
                    {/* Flex grow and padding on both sides */}
                    <FormField
                      control={form.control}
                      name={`phoneNumbers.${index}.phoneNumber`}
                      render={({ field }) => (
                        <AuthInputWithIcon
                          field={field}
                          placeholder='Phone Number'
                          type='tel'
                        />
                      )}
                    />
                  </div>
                  <div className='w-20 px-2'>
                    {' '}
                    {/* Assign fixed width for the switch container and padding */}
                    <FormField
                      control={form.control}
                      name={`phoneNumbers.${index}.receiveNotifications`}
                      render={({ field }) => (
                        <SwitchWithLabel
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onLabel='ON'
                          offLabel='OFF'
                          aria-label='Notifications'
                          label='Notifications'
                        />
                      )}
                    />
                  </div>
                  <div className='w-12'>
                    {' '}
                    {/* Assign fixed width for the button container */}
                    {index !== 0 ? (
                      <Button
                        type='button'
                        variant={'ghost'}
                        onClick={() => removePhone(index)}
                        className='remove-button'
                        size='icon'
                      >
                        <RxCross2 />
                      </Button>
                    ) : (
                      <CustomButton
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={addPhoneNumber}
                      >
                        Add
                      </CustomButton>
                    )}
                  </div>
                </div>
              ))}

              {/* Email Addresses */}
              {emailFields.map((field, index) => (
                <div key={field.id} className='flex items-center'>
                  {' '}
                  {/* Bottom margin for spacing between rows */}
                  <div className='w-1/4 pr-2'>
                    {' '}
                    {/* Assign width to 1/4 of container and padding to the right */}
                    <FormField
                      control={form.control}
                      name={`emails.${index}.emailType`}
                      render={({ field }) => (
                        <SelectWithInputForm<
                          AddCustomerFormRequest,
                          `emails.${typeof index}.emailType`
                        >
                          form={form as UseFormReturn<AddCustomerFormRequest>}
                          field={field as ControllerRenderProps<AddCustomerFormRequest, `emails.${typeof index}.emailType`>}
                          options={emailTypeOptions}
                          inputPlaceHolder='Email Type'
                          defaultValue='Personal'
                        />
                      )}
                    />
                  </div>
                  <div className='flex-1 px-2'>
                    {' '}
                    {/* Flex grow and padding on both sides */}
                    <FormField
                      control={form.control}
                      name={`emails.${index}.email`}
                      render={({ field }) => (
                        <AuthInputWithIcon
                          field={field}
                          placeholder='Email Address'
                          type='email'
                        />
                      )}
                    />
                  </div>
                  <div className='w-20 px-2'>
                    {' '}
                    {/* Assign fixed width for the switch container and padding */}
                    <FormField
                      control={form.control}
                      name={`emails.${index}.receiveNotifications`}
                      render={({ field }) => (
                        <SwitchWithLabel
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onLabel='ON'
                          offLabel='OFF'
                          aria-label='Notifications'
                          label='Notifications'
                        />
                      )}
                    />
                  </div>
                  <div className='w-12'>
                    {' '}
                    {/* Assign fixed width for the button container */}
                    {index !== 0 ? (
                      <Button
                        type='button'
                        variant={'ghost'}
                        onClick={() => removeEmail(index)}
                        className='remove-button'
                        size='icon'
                      >
                        <RxCross2 />
                      </Button>
                    ) : (
                      <CustomButton
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={addEmail}
                      >
                        Add
                      </CustomButton>
                    )}
                  </div>
                </div>
              ))}

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
                                  // Optionally reset billingAddress when isBillingAddress is true
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
              <Button type='button' variant='outline' onClick={handleClose}>
                Close
              </Button>
            </DialogClose>
            <Button type='button' variant='default' onClick={handleAddCustomer}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
