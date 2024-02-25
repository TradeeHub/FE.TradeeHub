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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

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
  <Dialog open={isOpen} onOpenChange={onClose}>
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
                  <FormLabel>Service Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Service Category Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='parentServiceCategoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose parent service category (optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Parent Category(optional)' />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Please enter a service category description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <DialogFooter className='col-span-3 flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            >
              Close
            </button>
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);





};

export default AddServiceCategoryModal;