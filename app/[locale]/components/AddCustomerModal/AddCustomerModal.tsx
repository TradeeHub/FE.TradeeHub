import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCustomerFormRequest } from '../../types/sharedTypes';
import TagsInput from '../TagsInput/TagsInput';
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
import ProgressBar from '../../ui/auth/ProgressBar/ProgressBar';
import MultiPhoneNumber from './AddPhoneNumber/AddPhoneNumber';
import MultiEmail from './MultiEmail/MultiEmail';
import MultiProperty from './MultiProperty/MultiProperty';
import CustomerIdentityForm from './CustomerIdentityForm/CustomerIdentityForm';
import CustomerTypeForm from '../CustomerTypeForm/CustomerTypeForm';
import { IoArrowBack } from 'react-icons/io5';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCustomerAdded: () => void;
  modalName: string;
};

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
  const [currentStep, setCurrentStep] = useState(1);

  const { addNewCustomer, addNewCustomerResponse, addNewCustomerLoading } =
    useAddNewCustomer();
  // const user = useSelector((state: RootState) => state.user.data);

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
              .optional()
              .nullable()
              .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
                message: 'Invalid email format',
              }),
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
                // Assuming you have a way to access the user's calling code dynamically
                const callingCode = '+'; // Placeholder, replace with dynamic code
                return (
                  !phoneNumber ||
                  phoneNumber === callingCode ||
                  (phoneNumber.startsWith(callingCode) &&
                    /^\+\d{9,14}$/.test(phoneNumber))
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
      properties: z
        .array(
          z.object({
            isBillingAddress: z.boolean(),
            billing: UserPlaceSchema.optional().nullable(), // Assuming UserPlaceSchema is already defined and suitable
            property: UserPlaceSchema.optional().nullable(),
          }),
        )
        .optional()
        .nullable(),
      tags: z.array(z.string()).nullable(),
      reference: z
        .object({
          id: z.string(),
          referenceType: z.string(),
        })
        .optional()
        .nullable(),
      comment: z.string().nullable(),
      multiValidation: z.string().nullable().optional(),
    })
    .refine(
      (data) =>
        !data.useCompanyName ||
        (data.useCompanyName && Boolean(data.companyName)),
      {
        message:
          'Company Name is required when "Use company name as main" checkbox is checked.',
        path: ['companyName'],
      },
    )
    .refine(
      (data) =>
        data.useCompanyName ||
        (!data.useCompanyName &&
          Boolean(data.name || data.surname || data.alias)),
      {
        message:
          'At least one of the Name, Surname, or Alias must be provided.',
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
      properties: [
        {
          isBillingAddress: true, // Assuming this is a mandatory field in your schema
          billing: null, // Initialize as null or provide a default structure
          property: null, // Initialize as null or provide a default structure
        },
      ],
      tags: [],
      reference: null,
      comment: '',
    },
  });

  const handleAddCustomer = async (formData: z.infer<typeof formSchema>) => {
    console.log('formData', formData);

    const customerData: AddNewCustomerRequestInput = {
      title: formData.title ?? '',
      name: formData.name ?? '',
      surname: formData.surname ?? '',
      alias: formData.alias ?? '',
      customerType: formData.customerType ?? '',
      companyName: formData.companyName ?? '',
      useCompanyName: formData.useCompanyName ?? false,
      emails:
        formData.emails?.map((email) => ({
          emailType: email.emailType,
          email: email.email ?? '',
          receiveNotifications: email.receiveNotifications,
        })) ?? [],
      phoneNumbers:
        formData.phoneNumbers?.map((phone) => ({
          phoneNumberType: phone.phoneNumberType,
          phoneNumber: phone.phoneNumber ?? '',
          receiveNotifications: phone.receiveNotifications,
        })) ?? [],
      properties:
        formData.properties?.map((property) => ({
          isBillingAddress: property.isBillingAddress,
          billing: property.billing
            ? {
                placeId: property.billing.PlaceId,
                address: property.billing.Address,
                country: property.billing.Country,
                countryCode: property.billing.CountryCode,
                callingCode: property.billing.CallingCode,
                location: {
                  lat: property.billing.Location.lat,
                  lng: property.billing.Location.lng,
                },
                viewport: {
                  northeast: property.billing.Viewport.northeast,
                  southwest: property.billing.Viewport.southwest,
                },
              }
            : null,
          property: property.property
            ? {
                placeId: property.property.PlaceId,
                address: property.property.Address,
                country: property.property.Country,
                countryCode: property.property.CountryCode,
                callingCode: property.property.CallingCode,
                location: {
                  lat: property.property.Location.lat,
                  lng: property.property.Location.lng,
                },
                viewport: {
                  northeast: property.property.Viewport.northeast,
                  southwest: property.property.Viewport.southwest,
                },
              }
            : null,
        })) ?? [],
      tags: formData.tags ?? [],
      reference: formData.reference
        ? {
            id: formData.reference.id,
            referenceType: formData.reference.referenceType as ReferenceType,
          }
        : null,
      comment: formData.comment ?? '',
    };

    addNewCustomer(customerData);
  };

  const handleClose = () => {
    form.reset();
    setCurrentStep(1);
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

  const onContinue = async () => {
    if (currentStep < TOTAL_STEPS) {
      const isFormValid = await form.trigger();
      const { errors } = form.formState;
      const criticalFields = ['companyName', 'multiValidation', 'phoneNumbers'];
      console.log('errors', errors);
      const hasCriticalErrors = criticalFields.some((fieldName) => errors[fieldName]);
      if (isFormValid || !hasCriticalErrors) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

return (
  <>
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='w-full max-w-2xl font-roboto'>
        <DialogHeader className='relative flex items-center justify-center'>
          {currentStep > 1 && (
            <button
              onClick={goBack}
              className='absolute left-0 text-primary focus:outline-none dark:text-accent'
              aria-label='Go back'
            >
              <IoArrowBack size={24} />
            </button>
          )}

          <div className='inline-block w-full'>
            <DialogTitle className='text-center'>{modalName}</DialogTitle>
          </div>

          {/* Placeholder for symmetry. It's hidden but maintains the space. */}
          <div className='absolute right-4 opacity-0'>
            <IoArrowBack size={24} />
          </div>
        </DialogHeader>

        <ProgressBar
          totalSteps={TOTAL_STEPS}
          currentStep={currentStep}
          labels={['Details', ' Additional Info']}
        />

        <Form {...form}>
          <form className='space-y-8'> {/* Increased vertical spacing */}
            {currentStep === 1 && (
              <>
                <CustomerIdentityForm
                  form={form as UseFormReturn<AddCustomerFormRequest>}
                />

                <CustomerTypeForm
                  form={form as UseFormReturn<AddCustomerFormRequest>}
                />

                <MultiPhoneNumber
                  form={form as UseFormReturn<AddCustomerFormRequest>}
                />

                <MultiProperty
                  form={form as UseFormReturn<AddCustomerFormRequest>}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className='pt-4'>
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
                <MultiEmail
                  form={form as UseFormReturn<AddCustomerFormRequest>}
                />

                <div className='pt-2'> {/* Increased top padding */}
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

                <div className='pt-2'> {/* Increased top padding */}
                  <FormField
                    control={form.control}
                    name='comment'
                    render={({ field }) => (
                      <CommentSection
                        field={field}
                        placeholder='Add an internal comment' // Optional: customize the placeholder text
                      />
                    )}
                  />
                </div>
              </>
            )}
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
          {currentStep === 1 && (
            <Button
              type='button'
              variant='default'
              onClick={onContinue}
              disabled={addNewCustomerLoading}
            >
              {addNewCustomerLoading ? (
                <>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  Adding...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          )}
          {currentStep === 2 && (
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
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
);

};

export default AddCustomerModal;
