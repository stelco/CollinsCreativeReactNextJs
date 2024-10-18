import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { exo2 } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import Image from 'next/image';
import Pill from '@/app/ui/pill';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  person: UserGroupIcon,
};

interface CardBasicProps {
  CardContent: {
    title?: string;
    heading?: string;
    value?: string | number;
    value2?: string;
    image?: string;
    skills?: { id: number; name: string; color: string }[];
    isWorkItem?: boolean;
  };
}


export function CardBasic({ CardContent }: CardBasicProps) {
  return <Card
    title={CardContent.title}
    heading={CardContent.heading}
    value={CardContent.value}
    value2={CardContent.value2}
    image={CardContent.image}
    skills={CardContent.skills}
    isWorkItem={!!CardContent.isWorkItem}
    type="person"
  />;
}

export async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  heading,
  value,
  value2,
  type,
  image,
  skills,
  isWorkItem
}: {
  title?: string;
  heading?: string;
  value?: number | string;
  value2?: string | undefined;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'person';
  image?: string;
  skills?: { id: number; name: string; color: string }[];
  isWorkItem?: boolean;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-100 p-2 shadow-sm">

      {!isWorkItem && (
        <div className="flex p-2 align-top items-center">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-md font-medium">{title}</h3>
        </div>
        )}

      <div className={`${exo2.className} mt-2 flex flex-col gap-6 rounded-xl bg-white px-4 py-4 text-left text-lg ${isWorkItem == false ? 'lg:flex-row' : 'lg:flex-col'} lg:overflow-hidden lg:text-md`}>
        
        {image && (
          <Image
            src={image}
            width={isWorkItem ? 500 : 250}
            height={320}
            alt={image}
            style={{ height: 'fit-content', borderRadius: '4px', border: '1px solid #f3f4f6' }}
          />
        )}

        <div className="flex flex-col flex-1 gap-6">

          <div className="flex flex-col gap-3">
            <div style={{ color: '#d36d00' }}>
              {heading && (
                <h2>{heading}</h2>
              )}
            </div>
            <div>
              {value && (
                <div className='text-gray-400'>{value}</div>
              )}
            </div>
            <div>
              {value2 && (
                <div className='text-gray-400'>{value2}</div>
              )}
            </div>
          </div>

          <div>
            {skills && !isWorkItem && (
              <h2 style={{ color: '#d36d00' }}>Skills</h2>
            )}
            {skills && isWorkItem && (
              <h2 style={{ color: '#d36d00' }}>Skills Used</h2>
            )}
          </div>

          <div>
            {skills && !isWorkItem && (
              <div className="flex flex-wrap gap-4">
                {skills.map((pill) => (
                  <div key={pill.id}>
                    <Pill text={pill.name} color={pill.color} />
                  </div>
                ))}
              </div>
            )}
            {skills && isWorkItem && (
              <div className="flex flex-wrap gap-4">
                {skills.map((pill) => (
                  <div key={pill.id}>
                    <Pill text={pill.name} color={pill.color} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}