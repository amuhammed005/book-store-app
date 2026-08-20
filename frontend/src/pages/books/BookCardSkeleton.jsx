const BookCardSkeleton = () => (
  <div className="h-[22rem] animate-pulse rounded-xl bg-white p-4 shadow-sm">
    <div className="h-44 rounded-lg bg-gray-200" />
    <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
    <div className="mt-3 h-4 w-full rounded bg-gray-100" />
    <div className="mt-2 h-4 w-2/3 rounded bg-gray-100" />
  </div>
);

export default BookCardSkeleton;
