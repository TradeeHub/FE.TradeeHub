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
import React from 'react';
import { z } from 'zod';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectWithInputForm from '../SelectWithInputForm/SelectWithInputForm';
import { AddCustomerFormRequest, UserPlace } from '../../types/sharedTypes';
import { RxCross2 } from 'react-icons/rx';
import { SwitchWithLabel } from '../SwitchWithLabel/SwitchWithLabel';
import { CustomButton } from '../CustomButton/CustomButton';
import TagsInput from '../TagsInput/TagsInput';
import AddressAutocomplete from '../../ui/general/AddressAutocomplete/AddressAutocomplete';
import { Checkbox } from '@/components/ui/checkbox';

type ModalProps = {
  triggerButton: React.ReactElement;
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
  { label: 'No Title', value: 'No Title' },
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
  billingAddress: UserPlaceSchema,
  tags: z.array(z.string()),
  reference: z.string(),
  comment: z.string(),
});

const Modal: React.FC<ModalProps> = ({ triggerButton, modalName }) => {
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
      billingAddress: {},
      tags: [],
      reference: '',
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
    console.log('FORM VALUES ', form.getValues());
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
      setValue('billingAddress', place);
    } else {
      resetField('billingAddress'); // Or set to an initial empty state as per your schema
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className='w-full max-w-xl font-roboto font-roboto'>
          <DialogHeader className='flex items-center justify-center'>
            {' '}
            <DialogTitle className='text-center'>{modalName}</DialogTitle>{' '}
          </DialogHeader>

          <Form {...form}>
            <form className='space-y-6'>
              <div className='justify-left flex w-24'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <SelectWithInputForm<AddCustomerFormRequest, 'title'>
                        form={form}
                        field={field}
                        options={titleOptions}
                        inputPlaceHolder='Other Title'
                        defaultValue='No Title'
                      />
                      <StyledFormMessage />
                    </FormItem>
                  )}
                />
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
                      render={({ field }) => (
                        <SelectWithInputForm<
                          AddCustomerFormRequest,
                          `phoneNumbers.${typeof index}.phoneNumberType`
                        >
                          form={form}
                          field={field}
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
                          form={form}
                          field={field}
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
                                  resetField('billingAddress');
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
                      name='billingAddress'
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
            </form>
          </Form>
          <DialogFooter className='sm:justify-end'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
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
