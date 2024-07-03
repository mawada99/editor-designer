import {  Empty, Divider ,Image,Col,Row} from 'antd';
import { useContext } from 'react';
import { GloablStateContext } from '@/context';
import { HeartTwoTone } from '@ant-design/icons';
import DEMOJSON from '@/assets/demo.json';
import { useTranslation } from '@/i18n/utils';

export default function Layer () {
  const { setReady, setActiveObject, editor } = useContext(GloablStateContext);
  const { t } = useTranslation();



  const loadDemo = async (demo) => {
    // setReady(false);
    await editor.loadFromJSON(demo, true);
    editor.fhistory.reset();
    setReady(true);
    setActiveObject(null);
    editor.fireCustomModifiedEvent();
  }
  // const url = window.location.href;
  const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    console.log('URL parameter:', urlParam);
  




  return (
    <div
      className="fabritor-panel-wrapper"
    >
{!DEMOJSON?<Empty
          image={null}
          description={
            <div>
              <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 40 }} />
              <p style={{ color: '#aaa', fontSize: 16 }}>{t('panel.design.start')}</p>
              <Divider />
            </div>
          }
        />:
          <Row>
     
       {DEMOJSON.map((demo,index)=> (
         <Col span={12} offset={3}>  <Image
           width={200}
           height={159}
           preview={false}
           src={demo.imageDisplay?demo.imageDisplay:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
           onClick={() => loadDemo(demo)}
         /> </Col>
         ))}   
     </Row>
}
    </div>
  )
}