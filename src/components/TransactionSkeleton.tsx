import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TransactionSkeleton = () => {
  return Array.from({ length: 7 }).map((_, index) => (
    <div
      key={index}
      className="flex  justify-between items-center bg-white border-b w-full border-[#E2E8F0] last:border-b-0 md:p-4  py-3"
    >
      {/* Left Side: Icon and Info */}
      <div className="flex items-center gap-4">
        {/* Skeleton Icon */}
        <Skeleton circle width={48} height={48} />

        {/* Skeleton Details */}
        <div className="flex flex-col gap-1">
          <Skeleton width={120} height={14} /> {/* Category */}
          <div className="flex items-center gap-2">
            <Skeleton width={60} height={10} /> {/* ID */}
            <Skeleton width={50} height={10} /> {/* Status */}
          </div>
        </div>
      </div>

      {/* Right Side: Amount & Date */}
      <div className="text-right flex flex-col gap-1">
        <Skeleton width={60} height={14} />
        <Skeleton width={100} height={10} />
      </div>
    </div>
  ));
};
export default TransactionSkeleton;