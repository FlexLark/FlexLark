import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Aside() {
  const { t } = useTranslation();
  return (
    <aside className="w-64 h-full lg:w-80 bg-slate-100 flex-none">
      <ul className="menu rounded-box w-full truncate">
        <li className="menu-title truncate select-none">{ t("Library") }</li>
        <li><a>{ t("Local") }</a></li>
        <li><a>{ t("Podcast") }</a></li>
        <li><a>{t("Radio Station")}</a></li>
        <li><a>网易云音乐</a></li>
        <li><a>QQ音乐</a></li>
        <li className="menu-title flex flex-row truncate select-none">
          {t("List ({{number}})", { number: 12 })}
        </li>
        <li><a>我最喜欢</a></li>
        <li><a>每日推荐</a></li>
        <li><a>当春风吹进民谣里【欧美篇】</a></li>
      </ul>
    </aside>
  );
}