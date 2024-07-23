import {Form, Input} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";
import {FormItemLayout} from "antd/es/form/Form";

const {TextArea} = Input;

export interface IFormSelectValue {
    value: string,
    label: string,
    disabled?: boolean
}

interface IFormSelect {
    name: string,
    label: string,
    value?: string,
    onChange?: any,
    placeholder?: string,
    rules?: RuleObject[] | RuleRender[],
    layout?: FormItemLayout
}

export default function FormTextarea({
                                         name,
                                         label,
                                         onChange,
                                         placeholder,
                                         rules,
                                         value,
                                         layout = "vertical"
                                     }: IFormSelect) {
    return <Form.Item name={name} layout={layout} label={label} rules={rules} className={"capitalize"}>
        <TextArea rows={4} onChange={onChange} placeholder={placeholder} value={value}/>
    </Form.Item>

}
