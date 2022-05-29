import {
  PixelRatio,
  Dimensions,
  NativeModules,
  Platform,
  EmitterSubscription,
} from 'react-native';
import { Toast } from 'teaset';
import OpenFile from 'react-native-doc-viewer';
import GlobalVar from '@/GlobalVar';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 375;
const defaultHeight = 667;

//缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;
interface ImageInfo {
  width: number;
  height: number;
}

interface SelectItem {
  id?: number | string;
}
/* 工具类 */
class Utils {
  constructor() {}
  /* 屏幕尺寸宽度*/
  public screenW(): number {
    return screenW;
  }
  /* 屏幕尺寸高度*/
  public screenH(): number {
    return screenH;
  }
  /**
   * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
   * 横向的尺寸直接使用此方法
   * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
   * @param size 设计图的尺寸
   * @returns {number}
   */
  public scaleSize(size: number): number {
    return size * _scaleWidth;
  }
  /**
   * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
   * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
   * @param size 设计图的尺寸
   * @returns {number}
   */
  public scaleHeight(size: number): number {
    return size * _scaleHeight;
  }
  /**
   * 设置字体的size（单位px）
   * @param size 传入设计稿上的px , allowFontScaling 是否根据设备文字缩放比例调整，默认不会
   * @returns {Number} 返回实际sp
   */
  public setSpText(size: number, allowFontScaling: boolean = false): number {
    const scale = Math.min(_scaleWidth, _scaleHeight);
    const fontSize = allowFontScaling ? 1 : fontScale;
    return (size * scale) / fontSize;
  }

  /**
   * 时间戳转时间格式
   * @param dayStyle 日期间隔的样式需要默认是横杆（-）
   * @param dayConTimeStyle 日期间隔的样式需要默认是空格（' '）
   * @param timeStyle 日期间隔的样式需要默认是冒号（:）
   * @param timeStyle 日期间隔的样式需要默认是冒号（:）
   * @returns {time:'2020-01-01 10:20:00'}
   */
  // 获取当前时间格式 （time:'2020-01-01 10:20:00',timeStamp:时间戳）
  public getTimeStyle({
    dayStyle = '-',
    dayConTimeStyle = ' ',
    timeStyle = ':',
    timeStamp = 0,
  }): { time: string } {
    const nowDate = timeStamp ? new Date(timeStamp) : new Date();
    const Y = nowDate.getFullYear();
    const M =
      nowDate.getMonth() + 1 < 10
        ? `0${nowDate.getMonth() + 1}`
        : nowDate.getMonth() + 1;
    const D =
      nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate();
    const HH =
      nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours();
    const MM =
      nowDate.getMinutes() < 10
        ? `0${nowDate.getMinutes()}`
        : nowDate.getMinutes();
    const SS =
      nowDate.getSeconds() < 10
        ? `0${nowDate.getSeconds()}`
        : nowDate.getSeconds();
    return {
      time: `${Y}${dayStyle}${M}${dayStyle}${D}${dayConTimeStyle}${HH}${timeStyle}${MM}${timeStyle}${SS}`,
    };
  }

  public getUuid(): string {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s[19] = hexDigits.substr(((s[19] as any) & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    const uuid = s.join('');
    return uuid;
  }
  // 图片的缩放比
  public imageAutoSize(
    maxWidth: number,
    maxHeight: number,
    imgWidth: number,
    imgHeight: number,
  ): ImageInfo {
    const imgInfo = {
      width: 0,
      height: 0,
    };
    // 当图片比图片框小时不做任何改变
    if (imgWidth < maxWidth && imgHeight < maxHeight) {
      imgInfo.width = imgWidth;
      imgInfo.height = imgHeight;
    }
    //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
    else {
      //原图片宽高比例 大于 图片框宽高比例
      if (maxWidth / maxHeight <= imgWidth / imgHeight) {
        imgInfo.width = maxWidth; //以框的宽度为标准
        imgInfo.height = maxWidth * (imgHeight / imgWidth);
      }
      //原图片宽高比例 小于 图片框宽高比例
      else {
        imgInfo.width = maxHeight * (imgWidth / imgHeight);
        imgInfo.height = maxHeight; //以框的高度为标准
      }
    }
    return imgInfo;
  }

  public isIos: boolean = Platform.OS === 'ios';

  /**
   * @Description: 判断文档类型
   */
  public onGetType(fileType: string): string {
    let type = '';
    //world文档
    if (/(docx|doc)$/.test(fileType)) {
      type = 'word';
    }
    //execl文档
    else if (/(xlsx|xls)$/.test(fileType)) {
      type = 'excel';
    }
    //ppt文档
    else if (/(pptx|ppt)$/.test(fileType)) {
      type = 'ppt';
    }
    //pdf文档
    else if (/(pdf)$/.test(fileType)) {
      type = 'pdf';
    }
    //txt文档
    else if (/(rtf|txt)$/.test(fileType)) {
      type = 'txt';
    }
    //rar压缩文件
    else if (/(zip|rar)$/.test(fileType)) {
      type = 'rar';
    }
    //视屏
    else if (/(AVI|mov|rmvb|rm|mkv|FLV|mp4|3GP)$/.test(fileType)) {
      type = 'video';
    }
    //音频
    else if (/(mp3|wma|rm|wav|midi|ape|flac)$/.test(fileType)) {
      type = 'audio';
      //图片
    } else if (/(png|tif|gif|bmp|jpg|jpeg|JPEG)$/.test(fileType)) {
      type = 'pic';
      //psd
    } else if (/(psd)$/.test(fileType)) {
      type = 'psd';
    } else {
      type = 'unknownFile';
    }
    return type;
  }

  // 获取文件类型-暂用于预览文件
  public onGetFileType(fileType: string): string {
    let type = '';
    //world文档
    if (/(docx)$/.test(fileType)) {
      type = 'docx';
    } else if (/(doc)$/.test(fileType)) {
      type = 'doc';
    }
    //execl文档
    else if (/(xlsx|xls)$/.test(fileType)) {
      type = 'excel';
    } else if (/(xls)$/.test(fileType)) {
      type = 'xls';
    }
    //ppt文档
    else if (/(pptx)$/.test(fileType)) {
      type = 'pptx';
    } else if (/(ppt)$/.test(fileType)) {
      type = 'ppt';
    }
    //pdf文档
    else if (/(pdf)$/.test(fileType)) {
      type = 'pdf';
    }
    //txt文档
    else if (/(rtf|txt)$/.test(fileType)) {
      type = 'txt';
    }
    //视屏
    else if (/(AVI|mov|rmvb|rm|mkv|FLV|mp4|3GP)$/.test(fileType)) {
      type = 'mp4';
    }
    //图片
    else if (/(png)$/.test(fileType)) {
      type = 'png';
    } else if (/(jpg|jpeg|JPEG)$/.test(fileType)) {
      type = 'jpg';
    }
    // 不支持的文件类型
    else {
      type = '';
    }
    return type;
  }

  // 预览文件 支持的文档格式：xls,ppt,doc,xlsx,pptx,docx,png,jpg,pdf,mp4
  public prevFile(url: string, _fileName?: string | undefined) {
    if (!url) {
      this.showToast('文件打开错误');
      return;
    }
    const fileType = this.onGetFileType(
      _fileName === undefined ? url : _fileName,
    );
    if (!fileType) {
      this.showToast('暂不支持该类型文件预览'); //不支持类型文件将进行下载
      return;
    }

    OpenFile.openDoc(
      [
        {
          url: this.isNetworkFile(url) ? url : 'file://' + url, //打开本地文件必须加上file://
          fileName: _fileName || '',
          cache: true,
          fileType: fileType,
        },
      ],
      (error) => {
        if (error) {
          this.showToast('文件打开错误');
          //console.log(error);
        }
      },
    );
  }

  // 是否网络路径
  public isNetworkFile(url: string): boolean {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }

  // 计算文件大小
  public wechtFileSize(filesize: number) {
    let obj: {
      size: number;
      unit: string;
    } = {
      size: 0,
      unit: 'B',
    };

    if (filesize > 1024 * 1024 * 1024) {
      //G
      obj.size = filesize / 1024 / 1024 / 1024;
      obj.unit = 'G';
    } else if (filesize > 1024 * 1024) {
      //M
      obj.size = filesize / 1024 / 1024;
      obj.unit = 'M';
    } else if (filesize > 1024) {
      //K
      obj.size = filesize / 1024;
      obj.unit = 'K';
    } else {
      //B
      obj.size = filesize;
      obj.unit = 'B';
    }

    return obj;
  }

  //定义一个公共Toast函数
  showToast(message: string) {
    Platform.OS === 'android'
      ? NativeModules.CircleModule.show(message)
      : Toast.info(message);
  }

  // 多选选项
  // 对对象进行增删时。必须id属性
  public selectMore<T>(selectList: Array<T>, selectItem: T) {
    // 如果不存在id属性
    if (typeof selectItem === 'string' || typeof selectItem === 'number') {
      // 判断是否已选择
      // 已选择，即去除
      // 否则添加
      if (selectList.some((item) => selectItem === item)) {
        return selectList.filter((item) => selectItem !== item);
      } else {
        return [...selectList, selectItem];
      }
    } else {
      // 判断是否已选择
      // 已选择，即去除
      // 否则添加
      if (selectList.some((item) => selectItem.id === item.id)) {
        return selectList.filter((item) => selectItem.id !== item.id);
      } else {
        return [...selectList, selectItem];
      }
    }
  }

  // 小于九时格式转化
  format(time: number) {
    return time <= 9 ? '0' + time : time;
  }

  // 转化时间戳
  // 若内容为
  // 今天以前发布则显示 日期 MM -DD  hh：mm时间精确到分，
  // 若是当天则显示时间  hh：mm ，若时间为上一年时间格式
  // 为YYYY-MM-DD
  transformTime(tiemNumber: number): string {
    const now = new Date();
    const time = new Date(tiemNumber);

    const result = (now.getTime() - tiemNumber) / 1000;

    const nowYear = now.getFullYear();
    const nowDay = this.format(now.getDate());

    const year = time.getFullYear();
    const month = this.format(time.getMonth() + 1);
    const day = this.format(time.getDate());
    const hour = this.format(time.getHours());
    const minutes = this.format(time.getMinutes());

    // 今日内，且天日期相同。
    if (nowDay === day && result < 60 * 60 * 24) {
      return hour + ':' + minutes;
    }
    // 今日以前,不同天但同年
    if (nowDay !== day && nowYear === year) {
      return month + '-' + day + ' ' + hour + ':' + minutes;
    }
    // 去年
    if (nowYear !== year || result > 60 * 60 * 24 * 356) {
      return year + '-' + month + '-' + day;
    }
    return ' ';
  }

  removeEmitter(emitter: EmitterSubscription | null) {
    if (emitter) {
      emitter.remove();
      emitter = null;
    }
  }
}

export default new Utils();
