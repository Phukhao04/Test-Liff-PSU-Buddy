const isProduction = import.meta.env.MODE === 'production';
const { VITE_frontUrl, VITE_frontUrl_DEV } = import.meta.env;
const { VITE_backUrl, VITE_backUrl_DEV } = import.meta.env;

export const frontUrl = isProduction ? VITE_frontUrl : VITE_frontUrl_DEV;
export const backUrl  = isProduction ? VITE_backUrl  : VITE_backUrl_DEV;
