import { useContext, useCallback } from 'react';
import Context from '@/contexts/Context';

/**
 * useHaptic — Haptic feedback ผ่าน LINE LIFF
 * fallback เป็น navigator.vibrate บน Android ถ้า LIFF ไม่รองรับ
 *
 * การใช้งาน:
 *   const haptic = useHaptic();
 *   <button onClick={() => haptic.light()}>กด</button>
 */
const useHaptic = () => {
  const { liff } = useContext(Context);

  const trigger = useCallback((style = 'light') => {
    try {
      // LIFF Haptics API (LINE >= 12.x)
      if (liff?.haptics?.impactOccurred) {
        liff.haptics.impactOccurred(style); // 'light' | 'medium' | 'heavy'
        return;
      }
      // fallback — Android vibration
      if (navigator?.vibrate) {
        const ms = style === 'light' ? 30 : style === 'medium' ? 50 : 80;
        navigator.vibrate(ms);
      }
    } catch (_) {
      // ไม่ทำอะไรถ้า API ไม่รองรับ
    }
  }, [liff]);

  return {
    light:  () => trigger('light'),   // กดปุ่มทั่วไป
    medium: () => trigger('medium'),  // confirm / เปลี่ยนหน้า
    heavy:  () => trigger('heavy'),   // action สำคัญ เช่น logout
  };
};

export default useHaptic;