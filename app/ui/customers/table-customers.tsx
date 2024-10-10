import Image from 'next/image';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
    const limit = 6;
    const offset = (currentPage - 1) * limit;
    const customers = await fetchFilteredCustomers(query, limit, offset);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers?.map((customer) => (
              <div
                key={customer.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={customer.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${customer.name}'s profile picture`}
                      />
                      <p>{customer.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((customer) => (
                <tr
                  key={customer.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={customer.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${customer.name}'s profile picture`}
                      />
                      <p>{customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
