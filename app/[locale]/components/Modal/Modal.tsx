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
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import React from 'react';
import { z } from 'zod';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@/components/ui/select';
import SelectWithInputForm from '../SelectWithInputForm/SelectWithInputForm';
import { AddCustomerFormRequest } from '../../types/sharedTypes';

type ModalProps = {
  triggerButton: React.ReactElement;
  modalName: string; // Added prop for the name of the modal
};

const titleOptions = [
  { label: 'No Title', value: 'No Title' },

  { label: 'Mr.', value: 'Mr.' },
  { label: 'Mrs.', value: 'Mrs.' },
  { label: 'Ms.', value: 'Ms.' },
  { label: 'Miss.', value: 'Miss.' },
  { label: 'Dr.', value: 'Dr.' },
  { label: 'Other', value: 'Other' },
];

const formSchema = z.object({
  title: z.string(),
  name: z.string(),
  surname: z.string(),
  alias: z.string(),
  emails: z.string(),
  phoneNumbers: z.array(
    z.object({
      type: z.string(),
      number: z.string(),
    }),
  ),
  properties: z.string(),
  tags: z.string(),
  reference: z.string(),
  comments: z.string(),
});

const Modal: React.FC<ModalProps> = ({ triggerButton, modalName }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      name: '',
      surname: '',
      alias: '',
      emails: '',
      phoneNumbers: [{ type: '', number: '' }],
      tags: '',
      reference: '',
      comments: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'phoneNumbers',
  });

  const handleAddCustomer = () => {
    console.log('FORM VALUES ', form.getValues());
  };

  const addPhoneNumber = () => {
    append({ type: '', number: '' });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className=''>
          <DialogHeader>
            <DialogTitle>{modalName}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form className='space-y-8'>
              <div className='justify-left flex'>
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

              <div className='flex flex-1 items-center gap-4'>
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
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className='flex items-center gap-4'>
                  <FormField
                    control={form.control}
                    name={`phoneNumbers.${index}.type`}
                    render={({ field }) => (
                      <Select {...field}>
                        {/* options for phone number type, e.g., mobile, home, etc. */}
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`phoneNumbers.${index}.number`}
                    render={({ field }) => (
                      <AuthInputWithIcon
                        field={field}
                        placeholder='Phone Number'
                        type='tel' // Setting the type to 'tel' for telephone input
                      />
                    )}
                  />
                  <button type='button' onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type='button' onClick={addPhoneNumber}>
                Add Phone Number
              </button>
              {/* ... other form fields */}
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AuthInputWithIcon
                        field={field}
                        autoFocus={false}
                        placeholder='Tags'
                      />
                    </FormControl>
                    <StyledFormMessage />
                  </FormItem>
                )}
              />
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
