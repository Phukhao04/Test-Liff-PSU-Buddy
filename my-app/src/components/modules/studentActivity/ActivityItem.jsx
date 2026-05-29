import { FaChevronRight } from 'react-icons/fa';

const ActivityItem = ({
  item,
  language,
}) => (
  <button className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition active:scale-95">
    <div className="flex-1 text-left">
      <p className="line-clamp-1 text-[13px] font-semibold text-gray-900">
        {item.title}
      </p>

      <p className="mt-0.5 text-[11px] text-gray-400">
        {item.date} • {item.hours}{' '}
        {language === 'th'
          ? 'ชม.'
          : 'hrs.'}
      </p>
    </div>

    <div className="flex shrink-0 items-center gap-2">
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${item.tagColor}`}
      >
        {item.tag}
      </span>
    </div>
  </button>
);

export default ActivityItem;