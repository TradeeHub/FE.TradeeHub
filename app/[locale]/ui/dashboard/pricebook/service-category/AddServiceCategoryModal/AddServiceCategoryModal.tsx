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
import SingleImageUploadComponent from '@/app/[locale]/ui/general/SingleImageUploadComponent/SingleImageUploadComponent';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimpleInputForm } from '@/app/[locale]/ui/general/SimpleInputForm/SimpleInputForm';
import { Button } from '@/components/ui/button';

// Assuming AddNewServiceCategoryRequestInput is correctly imported and usable here
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  images: z.array(z.any()).optional(), // Adjust as needed for your application
  parentServiceCategoryId: z.string().optional(),
});

const AddServiceCategoryModal = ({ isOpen, onClose, onAdded, modalName }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

   const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = (data) => {
    console.log(data);
    // Here, you would handle your form submission, such as sending data to an API
    onAdded(); // Callback after adding
  };

    const handleAddCustomer = async (formData: z.infer<typeof formSchema>) => {
    console.log('formData', formData);

  

    addNewCustomer(customerData);
  };

return (
  <Dialog open={isOpen} onOpenChange={handleClose}>
    <DialogContent className='w-full max-w-2xl p-6'>
      <DialogHeader className='mb-4'>
        <DialogTitle className='text-center'>Create New Service Category</DialogTitle>
      </DialogHeader>


      <Form {...form}>
        <form className='grid grid-cols-3 gap-4'>
          <div className='col-span-1'>
            <SingleImageUploadComponent control={form.control} name='images' />
          </div>

          <div className='col-span-2 flex flex-col justify-between'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                    <FormItem>
                <FormControl>
                  <SimpleInputForm
                    field={field}
                    // autoFocus={true}
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
                    <FormLabel style={{ marginBottom: '0' }} className='text-xs pb-0 pl-3 text-primary font-bold'>
                    Parent Category (optional)
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger style={{marginTop: 0}}>
                      <SelectValue placeholder='Select Parent Category (optional)' />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Map your categories here */}
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
                    <Textarea placeholder='Please enter a service category description (optional)' className='min-h-[100px]' {...field} />
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
                onClick={form.handleSubmit(handleAddCustomer)}
              >
                Save
              </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);

};

export default AddServiceCategoryModal;