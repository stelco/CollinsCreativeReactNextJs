'use server';

//zod is used to convert type before saving to database
//for example, we convert amount to number using coerce as its actually a string in db
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
 
const CreateCustomer = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Please enter a name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  file: z.string().min(1, { message: 'Image is required.' }),
});
const CreateInvoice = z.object({
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  })
});

const UpdateInvoice = z.object({
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  })
});

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

  export type CustomerState = {
    errors?: {
      id?: string[];
      name?: string[];
      email?: string[];
      file?: string[];

    };
    message?: string;
  };

  export async function createCustomer(prevState: CustomerState, formData: FormData) {

    const uploadsDir = '/customers'; // Define the uploads directory path
    const file = formData.get('file') as File;

    if (!file) {
      return {
        errors: { file: ['No file uploaded'] },
        message: 'Missing Fields. Failed to Create Customer.',
      };
    }
  
    let filePath = path.join(uploadsDir, file.name); // Concatenate the uploadsDir path with the file name
    filePath = filePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes

    const validatedFields = CreateCustomer.safeParse({
      id: crypto.randomUUID(),
      name: formData.get('name'),
      email: formData.get('email'),
      file: filePath, // Use the full path and file name
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Customer.',
      };
    }

    const { id, name, email, file: validatedFile } = validatedFields.data;

    console.log("validatedFields----",validatedFields.data);
   
    try {
      await sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${id}, ${name}, ${email}, ${validatedFile})
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Create Customer.' };
    }
   
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
  }

  export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    console.log("validatedFields----",validatedFields);
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
   
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
  ) {
    const validatedFields = UpdateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }
   
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
  }

  export async function getPosts() {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`
      );
      const posts = await response.json();
      return posts;
  }

  export async function getSinglePost(postId: number) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}`
    );
    const post = await response.json();
    return post;
  }