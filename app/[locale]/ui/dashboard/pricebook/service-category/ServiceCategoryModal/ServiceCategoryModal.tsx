import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form
} from '@/components/ui/form';
import SingleImageUploadForm from '@/app/[locale]/ui/general/SingleImageUploadComponent/SingleImageUploadComponent';
import { Button } from '@/components/ui/button';
import {
  useAddNewServiceCategory,
  useGetAllServiceCategoriesLazy,
  useUpdateServiceCategory
} from '@/app/[locale]/hooks/pricebook/usePriceBook';
import {
  AddNewServiceCategoryRequestInput,
  ServiceCategoryEntity,
  SortEnumType,
  UpdateServiceCategoryRequestInput
} from '@/generatedGraphql';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimpleInput } from '@/app/[locale]/ui/general/SimpleInput/SimpleInput';
import {
  SimpleSelect,
  SimpleSelectContent,
  SimpleSelectItem,
  SimpleSelectTrigger,
  SimpleSelectValue
} from '@/app/[locale]/ui/general/SimpleSelect/SimpleSelect';

// Assuming AddNewServiceCategoryRequestInput is correctly imported and usable here
const formSchema = z.object({
  id: z.string().optional().nullable(), // Now accepts string, undefined, or null
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(), // Now accepts string, undefined, or null
  images: z.array(z.any()).optional().nullable(), // Now accepts array, undefined, or null
  parentServiceCategoryId: z.string().optional().nullable() // Now accepts string, undefined, or null
});

const ServiceCategoryModal = ({
  isOpen,
  onClose,
  onAdded,
  modalName,
  updateData
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: (newCategory: ServiceCategoryEntity) => void;
  modalName: string;
  updateData?: ServiceCategoryEntity;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: updateData
      ? {
          id: updateData.id,
          name: updateData.name,
          description: updateData.description,
          parentServiceCategoryId: updateData.parentServiceCategoryId,
          images: updateData.images
        }
      : {
          name: '',
          description: '',
          parentServiceCategoryId: null
        }
  });

  const [categories, setCategories] = useState<ServiceCategoryEntity[]>([]); // State to hold categories
  const { searchServiceCategories, serviceCategories } =
    useGetAllServiceCategoriesLazy(); // Fetch categories
  const { updateServiceCategory, updateServiceCategoryResponse } =
    useUpdateServiceCategory(); // Fetch categories

  const fetchedRef = useRef<boolean>(false);

  const { toast } = useToast();

  const {
    addNewServiceCategory,
    addNewServiceCategoryResponse,
    addNewServiceCategoryLoading
  } = useAddNewServiceCategory();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (serviceCategories) {
      const data = serviceCategories?.edges?.map((edge) => edge?.node) as [];
      setCategories(data as ServiceCategoryEntity[]);
    }
  }, [serviceCategories]);

  const handleSelectTriggerClick = () => {
    if (!fetchedRef.current) {
      searchServiceCategories({
        variables: {
          name: '',
          order: [{ modifiedAt: SortEnumType.Desc }],
          pageSize: 100
        },
        fetchPolicy: 'network-only'
      });
      fetchedRef.current = true;
    }
  };

  useEffect(() => {
    if (updateData) {
      handleSelectTriggerClick();
    }
  }, []);

  useEffect(() => {
    const resp = updateServiceCategoryResponse?.updateServiceCategory.data;
    if (resp?.id) {
      handleClose();
      toast({
        title: 'Successfully Update Service Category!',
        description: (
          <span>
            You have successfully update the service category{' '}
            <b>
              <u>{resp.name}</u>
            </b>
          </span>
        )
      });
    }
  }, [updateServiceCategoryResponse]);

  useEffect(() => {
    const resp = addNewServiceCategoryResponse?.addNewServiceCategory;
    if (resp?.id) {
      if (onAdded) {
        onAdded(resp as ServiceCategoryEntity);
      }
      handleClose();
      toast({
        title: 'Successfully Created a New Service Category!',
        description: (
          <span>
            You have successfully created a new service category{' '}
            <b>
              <u>{resp.name}</u>
            </b>
          </span>
        )
      });
    }
  }, [addNewServiceCategoryResponse]);

  const handleSave = async (formData: z.infer<typeof formSchema>) => {
    if (updateData) {
      const request = generateUpdateRequest(formData, updateData, form);
      updateServiceCategory(request);
    } else {
      const request = generateCreateRequest(formData);
      addNewServiceCategory(request);
    }
    fetchedRef.current = false;
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
                      <SimpleInput
                        title='Category Name'
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
                    <SimpleSelect
                      onOpenChange={handleSelectTriggerClick}
                      onValueChange={field.onChange}
                      defaultValue={field.value || ''}
                    >
                      <SimpleSelectTrigger
                        style={{ marginTop: 0 }}
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
            </div>

            <div className='col-span-3'>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder='Please enter a service category description (optional) text-md'
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
                disabled={
                  updateData
                    ? form.formState.isDirty === false
                    : addNewServiceCategoryLoading
                }
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

export default ServiceCategoryModal;

const generateCreateRequest = (
  formData: z.infer<typeof formSchema>
): AddNewServiceCategoryRequestInput => {
  return {
    images: formData.images,
    name: formData.name,
    description: formData.description,
    parentServiceCategoryId: formData.parentServiceCategoryId
  };
};

const generateUpdateRequest = (
  formData: z.infer<typeof formSchema>,
  updateData: ServiceCategoryEntity,
  form: UseFormReturn<z.infer<typeof formSchema>>
): UpdateServiceCategoryRequestInput => {
  const isNewImageFile =
    formData.images &&
    formData.images.length > 0 &&
    formData.images[0] instanceof File;

  let s3KeyToDelete;

  const hasExistingImage =
    updateData && updateData.images && updateData.images?.length > 0;

  const shouldDeleteImage =
    (hasExistingImage && formData.images?.length === 0) ||
    (hasExistingImage && isNewImageFile);

  if (shouldDeleteImage) {
    s3KeyToDelete = updateData.images?.[0].s3Key;
  }

  const dirtyFields = form.formState.dirtyFields;

  const request: UpdateServiceCategoryRequestInput = {
    id: formData.id!,
    newImage: isNewImageFile ? formData.images?.[0] : null,
    name: dirtyFields.name ? formData.name : null,
    description: dirtyFields.description ? formData.description : null,
    parentServiceCategoryId: dirtyFields.parentServiceCategoryId
      ? formData.parentServiceCategoryId
      : null,
    s3KeyToDelete: s3KeyToDelete
  };

  return request;
};
