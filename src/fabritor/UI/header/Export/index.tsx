import { Dropdown, Button, message } from 'antd';
import { ExportOutlined, FileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { downloadFile, base64ToBlob } from '@/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { GloablStateContext } from '@/context';
import LocalFileSelector from '@/fabritor/components/LocalFileSelector';
import { CenterV } from '@/fabritor/components/Center';
import { SETTER_WIDTH } from '@/config';
import axios from 'axios'
import { Trans, useTranslation } from '@/i18n/utils';
import jsPDF from 'jspdf';

// const fs = require('fs');



const i18nKeySuffix = 'header.export';

const items: MenuProps['items'] = ['jpg', 'png', 'svg','pdf', 'json', 'divider', 'clipboard'].map(
  item => item === 'divider' ? ({ type: 'divider' }) : ({ key: item, label: <Trans i18nKey={`${i18nKeySuffix}.${item}`} /> })
)

export default function Export () {
  const { editor, setReady, setActiveObject } = useContext(GloablStateContext);
  const localFileSelectorRef = useRef<any>();
  const { t } = useTranslation();

  const [urlParam, setUrlParam] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get('url');
    console.log(url);
    
    setUrlParam(url);
  }, []);
  const selectJsonFile = () => {
    localFileSelectorRef.current?.start?.();
  }


  const handleFileChange = (file) => {
    setReady(false);
    const reader = new FileReader();
    reader.onload = (async (evt) => {
      const json = evt.target?.result as string;
      if (json) {
        await editor.loadFromJSON(json, true);
        editor.fhistory.reset();
        setReady(true);
        setActiveObject(null);
        editor.fireCustomModifiedEvent();
      }
    });
    reader.readAsText(file);
  }

  const copyImage = async () => {
    try {
      const png = editor.export2Img({ format: 'png' });
      const blob = await base64ToBlob(png);
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);
      message.success(translate(`${i18nKeySuffix}.copy_success`));
    } catch(e) {
      message.error(translate(`${i18nKeySuffix}.copy_fail`));
    }
  }
  const handlePost = async (urlParam,value) => {
    console.log(urlParam);
    
    const data = {
      // Your data here
      key: value,
    };

    try {
      const response = await axios.post(`http://${urlParam}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const fs = require('fs');
  const handleClick = ({ key }) => {
    const { sketch } = editor;
    // @ts-ignore
    const name = sketch.fabritor_desc;
    switch (key) {
      case 'png':
        const png = editor.export2Img({ format: 'png' });
        downloadFile(png, 'png', name);
        break;
      case 'jpg':
        const jpg = editor.export2Img({ format: 'jpg' });
        downloadFile(jpg, 'jpg', name);
        break;
      case 'svg':
        const svg = editor.export2Svg();
        downloadFile(svg, 'svg', name);
        break;
        case 'pdf':
    const pdf = new jsPDF();
    const imgData = editor.export2Img({ format: 'png' }); // Export as an image first
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${name}.pdf`);
    break;
      case 'json':
        const json = editor.canvas2Json();
        // Define and add the new element to the JSON object
    const newElementKey = 'imageDisplay'; // Change this to your desired key
    const newElementValue = editor.export2Img({ format: 'png' }); // Change this to your desired value
    json[newElementKey] = newElementValue;
    handlePost(urlParam,json)
  //  downloadFile(`data:text/json;charset=utf-8,${encodeURIComponent(
  //         JSON.stringify(json, null, 2)
  //       )}`, 'json', name);
        break;
      case 'clipboard':
        copyImage();
        break;
      default:
        break;
    }
  }
  return (
    <CenterV
      justify="flex-end"
      gap={16}
      style={{
        width: SETTER_WIDTH,
        paddingRight: 16
      }}
    >
      <Button onClick={selectJsonFile} icon={<FileOutlined />}>
        {t(`${i18nKeySuffix}.load`)}
      </Button>
      <Dropdown 
        menu={{ items, onClick: handleClick }} 
        arrow={{ pointAtCenter: true }}
        placement="bottom"
      >
        <Button type="primary" icon={<ExportOutlined />}>{t(`${i18nKeySuffix}.export`)}</Button>
      </Dropdown>
      <LocalFileSelector accept="application/json" ref={localFileSelectorRef} onChange={handleFileChange} />
    </CenterV>
  )
}