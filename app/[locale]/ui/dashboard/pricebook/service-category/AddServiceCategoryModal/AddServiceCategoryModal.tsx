import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ImageUploadComponent from '@/app/[locale]/ui/general/ImageUploadComponent/ImageUploadComponent';
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
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SingleImageUploadComponent from '@/app/[locale]/ui/general/SingleImageUploadComponent/SingleImageUploadComponent';

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

  const onSubmit = (data) => {
    console.log(data);
    // Here, you would handle your form submission, such as sending data to an API
    onAdded(); // Callback after adding
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='w-full max-w-xl font-roboto'>
          <DialogHeader className='relative flex items-center justify-center'>
            <DialogTitle className='text-center'>{modalName}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form className='grid w-full gap-2'>
                    <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter Item Name' {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
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
                      <>
                        <div className='grid w-full gap-1.5'>
                          <Label htmlFor='service-category-description'>
                            Description
                          </Label>

                          <Textarea
                            placeholder='Please enter a service category description'
                            // className='resize-none'
                            id='service-category-description'
                            {...field}
                          />
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SingleImageUploadComponent control={form.control} name='images' />

              <DialogFooter className='sm:justify-end'>
                <button
                  type='button'
                  onClick={onClose}
                  className='inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                >
                  Close
                </button>
                <button
                  type='submit'
                  className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Add Service Category
                </button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddServiceCategoryModal;
