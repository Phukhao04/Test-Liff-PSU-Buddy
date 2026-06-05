import { FaChevronRight } from 'react-icons/fa';

const ActivityItem = ({
  item,
  language,
  onClick,
}) => {
  const content = (
    <>
      <div className="flex-1 text-left">
        <p className="line-clamp-1 text-base font-semibold text-gray-900">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-gray-400">
          {item.date} • {item.hours}{' '}
          {language === 'th' ? 'ชม.' : 'hrs.'}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {/* text-[10px] → text-xs (11px) — tag badge */}
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${item.tagColor}`}
        >
          {item.tag}
        </span>
        {onClick && <FaChevronRight size={11} className="text-gray-300" />}
      </div>
    </>
  );

  const baseClass =
    'flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} active:scale-95`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={baseClass}>
      {content}
    </div>
  );
};

export default ActivityItem;