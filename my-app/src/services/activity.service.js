import Axios from '../config/Axios';

/**
 * ดึงชั่วโมงกิจกรรมและรายการกิจกรรมของนักศึกษาที่ login อยู่
 * Authorization header ถูกใส่ไว้ใน Axios instance แล้วโดย ContextProvider
 */
export const getActivityData = async () => {
  const response = await Axios.get('/liff/student/activity-check');
  return response.data;
};
