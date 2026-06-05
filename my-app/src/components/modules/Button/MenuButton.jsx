import { useContext } from 'react';
import { TbArrowUpRight } from 'react-icons/tb';
import Context from '@/contexts/Context';

const CARD_PATH = "M10 26C10 14.9543 18.9543 6 30 6H82.7474H106.06C113.273 6 119.121 11.8479 119.121 19.0616C119.121 19.8378 119.19 20.6125 119.328 21.3765L119.395 21.7467C121.056 30.9739 129.803 37.1864 139.068 35.75C147.881 33.2071 156.591 40.058 156.196 49.2222L155.495 65.5V105C155.495 116.046 146.541 125 135.495 125H30C18.9543 125 10 116.046 10 105V26Z";

const MenuCard = ({ id, label, onClick, children }) => {
  const { character } = useContext(Context);
  const primary = character?.mid ?? '#93CDFF';

  return (
    <div>
      <div className="relative">
        <button
          onClick={onClick}
          className="relative w-full active:scale-[0.97] transition-transform"
          style={{ aspectRatio: '167/139' }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 167 139"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id={`shadow-${id}`} x="-10%" y="-10%" width="130%" height="140%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="10" />
                <feGaussianBlur stdDeviation="30" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.67 0" />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
              </filter>
            </defs>
            <g filter={`url(#shadow-${id})`}>
              <path d={CARD_PATH} fill={primary} />
            </g>
          </svg>

          {/* content ตรงกลาง */}
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>

          {/* วงกลม ↗ */}
          <div
            className="absolute flex items-center justify-center rounded-full pointer-events-none"
            style={{
              width: 24,
              height: 24,
              top: '6%',
              right: '12%',
              backgroundColor: primary,
              boxShadow: '0px 2px 6px rgba(0,0,0,0.25), 0px 4px 12px rgba(255,255,255,0.6) inset',
            }}
          >
            <TbArrowUpRight size={12} style={{ color: character?.color ?? '#3a5a80' }} />
          </div>
        </button>
      </div>

      <p className="mt-2 text-center text-[13px] font-semibold text-[#222] whitespace-pre-line">
        {label}
      </p>
    </div>
  );
};

export default MenuCard;