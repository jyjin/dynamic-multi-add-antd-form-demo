import { Form, Input, Icon, Button, Divider } from 'antd';

let id = 0;

const data = [{
  id: 1,
  field_code: 'email',
  field_value: '邮箱'
}, {
  id: 2,
  field_code: 'phone',
  field_value: '手机'
}]

class DynamicFieldSet extends React.Component {

  add1 = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys1');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys1: nextKeys,
    });
    this.setState({
      type: 'A'
    })
  };

  add2 = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys2');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys2: nextKeys,
    });
    this.setState({
      type: 'B'
    })
  };

  input1(k) {
    const { getFieldDecorator } = this.props.form;

    return <Form.Item
      key={k}
    >
      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
          },
        ],
      })(<Input placeholder="邮箱" style={{ width: '60%', marginRight: 8 }} />)}

    </Form.Item>
  }

  input2(k) {
    const { getFieldDecorator } = this.props.form;

    return <Form.Item
      key={k}
    >
      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
          },
        ],
      })(<Input placeholder="手机" style={{ width: '60%', marginRight: 8 }} />)}

    </Form.Item>

  }

  handleSubmit1 = (e, objKeys, obj) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys1, keys2, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values key1:', keys1.map(keys1 => names[keys1]));
        console.log('Merged values key2:', keys2.map(keys2 => names[keys2]));
      }
    });
  };

  render1() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys1', { initialValue: [] });
    getFieldDecorator('keys2', { initialValue: [] });

    const keys1 = getFieldValue('keys1');
    const keys2 = getFieldValue('keys2');

    console.log('keys1 == ', keys1)
    console.log('keys2 == ', keys2)

    const formItems1 = []
    const formItems2 = []


    keys1.map(k => {
      const input1 = this.input1(k)
      formItems1.push(input1)
    })

    keys2.map(k => {
      const input2 = this.input2(k)
      formItems2.push(input2)
    })

    console.log('email == ', formItems1)
    console.log('phone == ', formItems2)


    return (
      <Form onSubmit={this.handleSubmit}>
        {/* 邮箱 */}
        {formItems1}
        <Form.Item>
          <Button type="dashed" onClick={this.add1} style={{ width: '60%' }}>
            <Icon type="新增邮箱" /> Add AAA
          </Button>
        </Form.Item>
        <Divider />
        {/* 手机 */}
        {formItems2}
        <Form.Item>
          <Button type="dashed" onClick={this.add2} style={{ width: '60%' }}>
            <Icon type="新增手机" /> Add BBB
          </Button>
        </Form.Item>

        {/* 保存 */}
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }


  addAction(item, objKeys) {

    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(`keys_${item.id}`);
    debugger
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [`keys_${item.id}`]: nextKeys,
    });
  }

  getInput(k, field) {
    const { getFieldDecorator } = this.props.form;

    return <Form.Item
      key={k}
    >
      {getFieldDecorator(`field[${k}]`, {
        // validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
          },
        ],
      })(<Input placeholder={field.field_value} style={{ width: '60%', marginRight: 8 }} />)}

    </Form.Item>
  }

  handleSubmit = (e, objKeys, obj) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { field } = values;
        console.log('Received values of form: ', values);

        // console.log('Merged values:', keys1.map(key => names[key]));
        // console.log('Merged values:', keys2.map(key => names[key]));

        let result = []

        data.map(item => {
          result.push(
            values[`keys_${item.id}`].map(key => field[key])
          )

        })
        console.log('result == ', result)
      } else {
        console.log('err jyjin == ', err)
      }
    });
  };

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    let objKeys = {}
    let obj = {}

    data.map((item) => {

      getFieldDecorator(`keys_${item.id}`, { initialValue: [] });

      objKeys[`keys_${item.id}`] = getFieldValue(`keys_${item.id}`)
      obj[`arr_${item.id}`] = []

      // console.log("objKeys == ", objKeys)
      // console.log("obj == ", obj)

      Object.keys(objKeys).map(_obj => {

        objKeys[_obj].map(k => {

          const input = this.getInput(k, item)


          const id = _obj.split('_')[1]


          if (id == item.id) {
            obj[`arr_${item.id}`].push(input)
          }

        })

      })

    })


    return (
      <Form onSubmit={(e) => this.handleSubmit(e, objKeys, obj)}>

        {data.map(item => {
          return <>
            {obj[`arr_${item.id}`]}
            <Form.Item>
              <Button type="dashed" onClick={() => this.addAction(item, objKeys)} style={{ width: '60%' }}>
                <Icon type={`新增${item.field_value}`} /> Add {item.field_value}
              </Button>
            </Form.Item>
          </>
        })}

        {/* 保存 */}
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

}

export default Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);