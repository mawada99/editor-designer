import { Outlet} from 'ice';
import { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import * as dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import enUS from 'antd/locale/en_US';
import arEG from 'antd/locale/ar_EG';
import type { Locale } from 'antd/es/locale';
import 'dayjs/locale/zh-cn';

export default function Layout() {
  const params = new URLSearchParams(window.location.search);
  const lng = params.get('lang') || 'ar_EG';
  const { i18n } = useTranslation();
  const [antDLocale, setAntDLocale] = useState<Locale>(enUS);

  useEffect(() => {
    if (lng === 'en-US' || lng === 'en') {
      setAntDLocale(enUS);
      dayjs.locale('en');
      i18n.changeLanguage('en-US');
    } else {
      setAntDLocale(arEG);
      dayjs.locale('ar-EG');
      i18n.changeLanguage('ar-EG');
    }
  }, [lng]);

  return (
    <ConfigProvider locale={antDLocale}>
      <Outlet />
    </ConfigProvider>
  );
}