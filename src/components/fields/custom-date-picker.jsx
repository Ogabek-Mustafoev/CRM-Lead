import {DatePicker, Flex, Typography} from "antd"

import dayjs from "dayjs";
import {ControlError} from "@/components/index.js";


export const CustomDatePicker = (props) => {
  const {field, form, label, getDate, size = "large"} = props;

  const onChange = (date) => {
    const formattedDate = dayjs(date).add(5, 'hour').toISOString();
    form.setFieldValue(field.name, formattedDate);
    getDate && getDate(formattedDate)
  };

  return (
    <Flex vertical gap="8px" style={{width: "100%"}}>
      <Typography.Text style={{fontSize: '18px'}}>{label}</Typography.Text>
      <DatePicker
        style={{width: '100%'}}
        value={dayjs(field.value || new Date()).clone()}
        format={"DD-MM-YYYY"}
        onChange={onChange}
        size={size}
      />
      <ControlError form={form} field={field}/>
    </Flex>
  )
}
