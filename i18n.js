// i18n.js  
import i18n from 'i18next';  
import { initReactI18next } from 'react-i18next';  
import en from './locales/en';  
import zhCN from './locales/zh-cn';  

let language = navigator.language || navigator.browserLanguage || navigator.userLanguage;
console.log(language);
const resources = {  
  en: {  
    translation: en,  
  },  
  'zh-CN': {  
    translation: zhCN,  
  },  
};
  
i18n  
  .use(initReactI18next)  
  .init({
    resources,  
    lng: language, // 默认语言  
    fallbackLng: 'en', // 备用语言  
    interpolation: {  
      escapeValue: false, // React 默认会转义，这里设置为 false  
    },
  });
  
export default i18n;