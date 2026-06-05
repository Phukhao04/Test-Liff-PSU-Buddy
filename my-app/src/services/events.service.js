import Axios from '@/config/Axios'

export const getOpenEvents = async (campus = '01') => {
  const { data } = await Axios.get('/api/events', { params: { campus } })
  return data
}

export const getFeed = async (campus = '01') => {
  const events = await getOpenEvents(campus)
  return events.map(e => ({ ...e, _type: 'event' }))
}

// export const getFeed = async (campus = '01') => {
//   return [
//     {
//       _id: '1',
//       _type: 'event',
//       title: { th: 'ค่ายอาสาพัฒนาชนบท ครั้งที่ 5', en: 'Rural Development Camp #5' },
//       img: null,
//       start: '2026-05-20T00:00:00.000Z',
//       place: { th: 'อาคารร่มศรีตรัง มหาวิทยาลัยสงขลานครินทร์', en: 'Sritrang Building, PSU' },
//       hour: { total: 12 },
//       registration: { isOpen: true, valid: 50 },
//       registrantsNoCanceled: 30,
//       createdAt: '2026-05-10T00:00:00.000Z',
//     },
//     {
//       _id: '2',
//       _type: 'event',
//       title: { th: 'กิจกรรมจิตอาสา บริจาคโลหิต', en: 'Blood Donation Volunteer' },
//       img: null,
//       start: '2026-06-01T00:00:00.000Z',
//       place: { th: 'โรงพยาบาลสงขลานครินทร์', en: 'Songklanagarind Hospital' },
//       hour: { total: 6 },
//       registration: { isOpen: true, valid: 100 },
//       registrantsNoCanceled: 100,
//       createdAt: '2026-05-12T00:00:00.000Z',
//     },
//     {
//       _id: '3',
//       _type: 'event',
//       title: { th: 'อบรมทักษะภาวะผู้นำนักศึกษา', en: 'Student Leadership Skills Training' },
//       img: null,
//       start: '2026-06-10T00:00:00.000Z',
//       place: { th: 'ห้องประชุมชั้น 2 กองพัฒนานักศึกษา', en: 'SDA Meeting Room' },
//       hour: { total: 8 },
//       registration: { isOpen: false, valid: 40 },
//       registrantsNoCanceled: 25,
//       createdAt: '2026-05-14T00:00:00.000Z',
//     },
//   ]
// }


