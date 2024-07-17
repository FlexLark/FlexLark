// i18n.js  
import i18n from 'i18next';  
import { initReactI18next } from 'react-i18next';  
import en from './locales/en';  
import zh from './locales/zh-cn';  
  
const resources = {  
  en: {  
    translation: en,  
  },  
  zh: {  
    translation: zh,  
  },  
};  
  
i18n  
  .use(initReactI18next)  
  .init({  
    resources,  
    lng: 'zh', // 默认语言  
    fallbackLng: 'zh', // 备用语言  
    interpolation: {  
      escapeValue: false, // React 默认会转义，这里设置为 false  
    },  
  });  
  
export default i18n;