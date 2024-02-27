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
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import SingleImageUploadForm from '@/app/[locale]/ui/general/SingleImageUploadComponent/SingleImageUploadComponent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAddNewServiceCategory, useGetAllServiceCategoriesLazy } from '@/app/[locale]/hooks/pricebook/usePriceBook';
import { AddNewServiceCategoryRequestInput, ServiceCategoryEntity } from '@/generatedGraphql';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AuthInputWithIcon } from '@/app/[locale]/ui/auth/AuthInputWithIcon/AuthInputWithIcon';

// Assuming AddNewServiceCategoryRequestInput is correctly imported and usable here
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(), // Now accepts string, undefined, or null
  images: z.array(z.any()).optional().nullable(), // Now accepts array, undefined, or null
  parentServiceCategoryId: z.string().optional().nullable(), // Now accepts string, undefined, or null
});

const AddServiceCategoryModal = ({
  isOpen,
  onClose,
  onAdded,
  modalName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
  modalName: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      parentServiceCategoryId: null,
    }
  });
  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories
  const { getAllServiceCategories, serviceCategories, loading, error } = useGetAllServiceCategoriesLazy(); // Fetch categories
  const [fetched, setFetched] = useState(false); // State to track if categories have been fetched

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
    // const formattedCategories = serviceCategories.map(category => ({
    //   id: category.id,
    //   name: category.name,
    // }));
    setCategories(serviceCategories);
  }
}, [serviceCategories]);


  const handleSelectTriggerClick = () => {
    console.log('handleSelectTriggerClick');
    if (!fetched) {
      getAllServiceCategories();
      setFetched(true); // Mark as fetched to prevent future fetches
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
    const request: AddNewServiceCategoryRequestInput = {
      images: formData.images,
      name: formData.name,
      description: formData.description,
      parentServiceCategoryId: formData.parentServiceCategoryId,
    };

    console.log('request', request);
    addNewServiceCategory(request);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='w-full max-w-2xl p-6'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-center'>{modalName}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className='grid grid-cols-3 gap-4'>
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

            <div className='col-span-2 flex flex-col justify-between'>
 

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInputWithIcon
                      field={field}
                      autoFocus={true}
                      placeholder='Category Name'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name='parentServiceCategoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      style={{ marginBottom: '0' }}
                      className='pb-0 pl-3 text-xs font-bold text-primary'
                    >
                      Parent Category (optional)
                    </FormLabel>
                    <Select
                      onOpenChange={handleSelectTriggerClick}
                      onValueChange={field.onChange}
                      defaultValue={field.value || ''}
                    >
                      <SelectTrigger style={{ marginTop: 0 }} onClick={handleSelectTriggerClick}>
                        <SelectValue placeholder='Select Parent Category (optional)' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-3'>
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

            <DialogFooter className='col-span-3 flex justify-between'>
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

export default AddServiceCategoryModal;
