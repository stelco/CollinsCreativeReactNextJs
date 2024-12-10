// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 bg-grey-100 text-slate-500 dark:bg-gray-600 dark:text-slate-100 shadow-sm`}
      style={{ height: '-webkit-fill-available' }}>

      <div style={{ height: '800px' }}>

          <div className={`mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-row lg:overflow-hidden lg:text-md`}
          style={{ height: '50%' }}>
          </div>

          <div className={`mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-row lg:overflow-hidden lg:text-md`}
          style={{ height: '20px' }}>
          </div>

          <div className={`mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-row lg:overflow-hidden lg:text-md`}
          style={{ height: '5px' }}>
          </div>
          <div className={`mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-row lg:overflow-hidden lg:text-md`}
          style={{ height: '5px' }}>
          </div>
          <div className={`mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-row lg:overflow-hidden lg:text-md`}
          style={{ height: '5px' }}>
          </div>
          <div className={`mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-row lg:overflow-hidden lg:text-md`}
          style={{ height: '5px' }}>
          </div>

          <div style={{height: '150px'}}></div>

          <div className={`mb-4`}>
            <div className={`mt-2 flex flex-col gap-6 rounded-xl bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-row lg:overflow-hidden lg:text-md`}
            style={{ height: '5%', width: '150px', margin: '0 auto', verticalAlign: 'bottom' }}>
            </div>
          </div>

      </div>

    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}