import {Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {get, isFunction} from "lodash";
import {ControlError} from "@/components/index.js";
import PhoneInput from "antd-phone-input";

const MainInput = (props) => {
  const {
    label,
    type = "text",
    placeholder,
    field,
    form,
    inputProps,
    size = 'large',
    addonBefore,
    isValid = () => true,
    isPhone = false,
    isPassword = false,
    labelClass
  } = props;

  const setInputValue = ({countryCode, areaCode, phoneNumber}) => {
    const fixedPhoneNumber = `+${countryCode}${areaCode}${phoneNumber}`;
    form.setFieldValue(field.name, fixedPhoneNumber)
  }

  return (
    <div style={{marginTop: '8px', width: "100%"}}>
      <label
        className={`label font-semibold ${labelClass} ${get(form.touched, field.name) && get(form.errors, field.name) ? 'invalid_style' : ''}`}>{label}</label>
      <div style={{marginTop: '5px'}}
           className={`input-container ${get(form.touched, field.name) && get(form.errors, field.name) ? 'shake' : ''}`}>
        {isPhone ? (
          <PhoneInput
            {...field}
            country="uz"
            size="large"
            onlyCountries={["uz"]}
            disableDropdown={true}
            style={{
              borderColor: `${get(form.touched, field.name) &&
              get(form.errors, field.name) && "red"}`,
            }}
            placeholder={placeholder}
            onChange={setInputValue}
          />
        ) : isPassword ? (
          <Input.Password
            {...field}
            placeholder={placeholder}
            size="large"
            style={{
              borderColor: `${get(form.touched, field.name) &&
              get(form.errors, field.name) && "red"}`,
            }}
            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
            onChange={(event) => {
              if (isValid(event)) {
                isFunction(get(inputProps, "onChange")) &&
                inputProps.onChange(event);
                field.onChange(event);
              }
            }}
          />
        ) : (
          <Input
            {...field}
            addonBefore={addonBefore}
            size={size}
            style={{
              borderColor: `${get(form.touched, field.name) &&
              get(form.errors, field.name) && "red"}`,
            }}
            placeholder={placeholder}
            type={type}
            onChange={(event) => {
              if (isValid(event)) {
                isFunction(get(inputProps, "onChange")) &&
                inputProps.onChange(event);
                field.onChange(event);
              }
            }}
          />
        )}
      </div>
      <ControlError form={form} field={field}/>
    </div>
  )
}

export default MainInput
