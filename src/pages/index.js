
import styles from './index.css';
import React from 'react';
import { Button, Input, Avatar, Rate, Switch, Radio, Checkbox, TitleBar, Typography } from 'fntd';
const { Title, Paragraph, Text } = Typography;

import { Menu, Dropdown, Icon } from 'fntd';
import { Pagination, ConfigProvider } from 'fntd';

const country = ["阿拉伯语", "ar_EG", "亚美尼亚", "hy_AM", "保加利亚语", "bg_BG", "加泰罗尼亚语", "ca_ES", "捷克语", "cs_CZ", "德语", "de_DE", "希腊语", "el_GR", "英语", "en_GB", "英语（美式）", "en_US", "西班牙语", "es_ES", "爱沙尼亚语", "et_EE", "波斯语", "fa_IR", "芬兰语", "fi_FI", "法语（比利时）", "fr_BE", "法语", "fr_FR", "希伯来语", "he_IL", "印地语", "hi_IN", "克罗地亚语", "hr_HR", "匈牙利语", "hu_HU", "冰岛语", "is_IS", "印度尼西亚语", "id_ID", "意大利语", "it_IT", "日语", "ja_JP", "卡纳达语", "kn_IN", "韩语/朝鲜语", "ko_KR", "挪威语", "nb_NO", "尼泊尔语", "ne_NP", "荷兰语（比利时）", "nl_BE", "荷兰语", "nl_NL", "波兰语", "pl_PL", "葡萄牙语(巴西)", "pt_BR", "葡萄牙语", "pt_PT", "斯洛伐克语", "sk_SK", "塞尔维亚语", "sr_RS", "斯洛文尼亚语", "sl_SI", "瑞典语", "sv_SE", "泰米尔语", "ta_IN", "泰语", "th_TH", "土耳其语", "tr_TR", "罗马尼亚语", "ro_RO", "俄罗斯语", "ru_RU", "乌克兰语", "uk_UA", "越南语", "vi_VN", "简体中文", "zh_CN", "繁体中文", "zh_TW"]

let locales = []
country.map((item, index) => {
  if (index % 2 === 0) {
    let obj = {}
    obj.value = item
    locales.push(obj)
  } else {
    let obj = locales[locales.length - 1]
    obj.key = item
  }
})

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: "en_US",
    };
  }

  changeLocale = e => {
    const localeValue = e.target.value;
    this.setState({ locale: localeValue });
  };

  menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
      </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
      </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
      </a>
      </Menu.Item>
    </Menu>
  );

  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }


  render() {
    const { locale } = this.state;


    return (<div style={{ width: 1000, margin: '20px auto' }}>
      <div style={{ marginBottom: 20 }}>
        <Button type='primary'>primary</Button>
        <b style={{ marginRight: 20 }} />
        <Button type='primary' type="ghost">ghost</Button>
        <b style={{ marginRight: 20 }} />
        <Button type='primary' disabled type="ghost">disabled</Button>
      </div >

      <div style={{ marginBottom: 20 }}>
        <Avatar name='张三' src='' size={64} />
        <b style={{ marginRight: 20 }} />
        <Avatar name='张三' src='http://hbimg.b0.upaiyun.com/e9d35b3852716876576dd060d7f83261cfd9d96ee6d0-y4EOMD_fw658' size={64} />

      </div>
      <div>
        <Input />
      </div>
      <Rate allowHalf defaultValue={2.5} />

      <Switch disabled={false} defaultChecked />

      <Radio>Radio</Radio>

      <Checkbox defaultChecked />

      <TitleBar title={'基本信息'} desc={'所有员工通用的信息'} />

      <Typography>
        <Title>Introduction</Title>
        <Paragraph>
          In the process of internal desktop applications development, many different design specs and
          implementations would be involved, which might cause designers and developers difficulties and
          duplication and reduce the efficiency of development.
    </Paragraph>
      </Typography>
      <Dropdown overlay={this.menu}>
        <a className="ant-dropdown-link" href="#">
          Hover me
      </a>
      </Dropdown>

      <div>
        <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />
        <br />
        <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} disabled />
      </div>

      <TitleBar title='点击切换语言观察分页条语言变化' />

      <Radio.Group style={{ margin: '20px 0' }} value={locale} onChange={this.changeLocale}>
        {locales.map(item => {
          return <Radio.Button style={{ margin: '5px' }} key={item.key} value={item.key}>
            {item.value}
          </Radio.Button>
        })}
      </Radio.Group>

      <ConfigProvider locale={locale} iconFontUrl="//at.alicdn.com/t/font_985067_ahlo2tokgnh.js">
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
      </ConfigProvider>

      <TitleBar style={{ margin: '20px 0' }} title='支持的国家代码' />
      <ul style={{ marginTop: 20 }}>
        {locales.map(item => {
          return <li key={'li' + item.key} style={{ marginBottom: 10, listStyle: 'none' }}><span style={{ width: 100, display: 'inline-block' }}>{item.value}</span><span>{item.key}</span></li>
        })}
      </ul>
    </div>
    );
  }

}
