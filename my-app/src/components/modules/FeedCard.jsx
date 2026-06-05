import { useContext } from 'react'
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import Context from '@/contexts/Context'

const TRANSCRIPT_URL = 'https://transcript.psu.ac.th/transcript_api'

const FeedCard = ({ item, language = 'th', onClick }) => {
  const { character } = useContext(Context)
  const primary = character?.color ?? '#4B8CD2'

  const title    = item.title?.[language] || item.title?.th || '-'
  const place    = item.place?.[language] || item.place?.th || '-'
  const imgUrl   = item.img ? `${TRANSCRIPT_URL}/${item.img}` : null
  const isOpen   = item.registration?.isOpen
  const registered = item.registrantsNoCanceled || 0
  const limit    = item.registration?.valid || 0
  const isFull   = limit > 0 && registered >= limit

  const startDate = item.start
    ? new Date(item.start).toLocaleDateString(
        language === 'th' ? 'th-TH' : 'en-US',
        { day: 'numeric', month: 'short', year: 'numeric' }
      )
    : '-'

  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer active:scale-95 transition"
    >
      {/* รูป */}
      <div className="relative h-36 bg-gray-100">
        {imgUrl ? (
          <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}

        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white ${
          isFull ? 'bg-gray-400' : isOpen ? 'bg-green-500' : 'bg-red-400'
        }`}>
          {isFull
            ? (language === 'th' ? 'เต็มแล้ว' : 'Full')
            : isOpen
            ? (language === 'th' ? 'เปิดรับสมัคร' : 'Open')
            : (language === 'th' ? 'ปิดรับสมัคร' : 'Closed')}
        </span>

        <span className="absolute bottom-2 right-2 text-xs bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700">
          {startDate}
        </span>
      </div>

      {/* เนื้อหา */}
      <div className="p-3 space-y-1">
        <p className="font-bold text-sm text-gray-900 line-clamp-2">{title}</p>

        <div className="flex items-center gap-1 text-gray-400">
          <FaMapMarkerAlt size={10} />
          <p className="text-xs line-clamp-1">{place}</p>
        </div>

        <div className="flex items-center gap-1 text-gray-400">
          <FaClock size={10} />
          <p className="text-xs">{item.hour?.total || 0} {language === 'th' ? 'ชม.' : 'hrs'}</p>
        </div>

        {limit > 0 && (
          <div className="pt-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{language === 'th' ? 'ผู้สมัคร' : 'Registered'}</span>
              <span>{registered}/{limit}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: `${Math.min((registered / limit) * 100, 100)}%`,
                  backgroundColor: primary,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedCard