export const APP_NAME = 'fabritor';
export const APP_VERSION = '3.0.0';
export const SCHEMA_VERSION = 3;
export const SCHEMA_VERSION_KEY = 'fabritor_schema_version';
export const LOG_PREFIX = `${APP_NAME}_log：`;

export const OBJECT_DEFAULT_CONFIG = {
  // controls
  borderColor: '#FF2222',
  borderScaleFactor: 2,
  cornerStrokeColor: '#2222',
  cornerColor: '#FF2222',
  cornerSize: 12,
  cornerStyle: 'circle',
  transparentCorners: false,
  padding: 0,
  centeredScaling: false,
  strokeUniform: true,
  paintFirst: 'stroke'
}

export const TEXTBOX_DEFAULT_CONFIG = {
  // styles
  fill: '#000000',
  fontWeight: 'normal',
  fontSize: 50,
  lineHeight: 1.30,
  textAlign: 'center',
  fontFamily: 'AlibabaPuHuiTi',
  // size
  width: 500,
  // 中文处理
  splitByGrapheme: true
}

export const FONT_PRESET_FAMILY_LIST = [
  { 
    label: <span style={{ fontFamily: 'SmileySans', fontSize: 16 }}>SmileySans</span>, 
    value: 'SmileySans' 
  },
  { 
    label: <span style={{ fontFamily: '霞鹜新晰黑', fontSize: 16 }}>LXGW New Clear Black</span>, 
    value: '霞鹜新晰黑' 
  },
  { 
    label: <span style={{ fontFamily: '霞鹜文楷', fontSize: 16 }}>LXGW WenKai</span>, 
    value: '霞鹜文楷' 
  },
  { 
    label: <span style={{ fontFamily: '小赖字体', fontSize: 16 }}>Xiao Lai</span>, 
    value: '小赖字体' 
  },
  { 
    label: <span style={{ fontFamily: '悠哉字体', fontSize: 16 }}>YouZai</span>, 
    value: '悠哉字体' 
  },
  { 
    label: <span style={{ fontFamily: 'AlibabaPuHuiTi', fontSize: 16 }}>Alibaba PuHuiTi</span>, 
    value: 'AlibabaPuHuiTi'
  },
  { 
    label: <span style={{ fontFamily: '霞鹜尚智黑', fontSize: 16 }}>LXGW ShangZhiHei</span>, 
    value: '霞鹜尚智黑' 
  },
  { 
    label: <span style={{ fontFamily: 'SourceHanSans', fontSize: 16 }}>SourceHanSans</span>, 
    value: 'SourceHanSans' 
  },
  { 
    label: <span style={{ fontFamily: 'SourceHanSerif', fontSize: 16 }}>SourceHanSerif</span>, 
    value: 'SourceHanSerif' 
  },
  { 
    label: <span style={{ fontFamily: '方正楷体', fontSize: 16 }}>FZKai</span>, 
    value: '方正楷体' 
  },
  { 
    label: <span style={{ fontFamily: '包图小白体', fontSize: 16 }}>Baotu Xiaobai</span>, 
    value: '包图小白体' 
  },
  { 
    label: <span style={{ fontFamily: '手写杂字体', fontSize: 16 }}>Shou Xie Za</span>, 
    value: '手写杂字体' 
  },
  { 
    label: <span style={{ fontFamily: '胡晓波男神体', fontSize: 16 }}>Hu Xiaobo Nanshen</span>, 
    value: '胡晓波男神体' 
  },
  { 
    label: <span style={{ fontFamily: '胡晓波骚包体', fontSize: 16 }}>Hu Xiaobo Saobao</span>, 
    value: '胡晓波骚包体' 
  },
  { 
    label: <span style={{ fontFamily: '站酷快乐体', fontSize: 16 }}>ZCOOL KuaiLe</span>, 
    value: '站酷快乐体' 
  },
  { 
    label: <span style={{ fontFamily: '站酷文艺体', fontSize: 16 }}>ZCOOL WenYi</span>, 
    value: '站酷文艺体' 
  },
  { 
    label: <span style={{ fontFamily: '站酷小薇LOGO体', fontSize: 16 }}>ZCOOL XiaoWei</span>, 
    value: '站酷小薇LOGO体' 
  }
];

const fontFamilyArray = FONT_PRESET_FAMILY_LIST.map(font => ({
  english: font.label.props.children,
  fontFamily: font.value
}));

console.log(fontFamilyArray);

export const SKETCH_ID = 'fabritor-sketch';

export const FABRITOR_CUSTOM_PROPS = [
  'id',
  'fabritor_desc',
  'selectable',
  'hasControls',
  'sub_type',
  'imageSource',
  'imageBorder',
  'oldArrowInfo'
];