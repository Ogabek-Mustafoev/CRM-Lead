import TextArea from "antd/es/input/TextArea";
import {get, isFunction} from "lodash";
import {ControlError} from "@/components/index.js";


const Description = (props) => {
  const {
    label,
    placeholder,
    field,
    form,
    inputProps,
    isValid = () => true,
  } = props;

  return (
    <div style={{marginTop: '8px'}}>
      <label
        className={`label ${get(form.touched, field.name) && get(form.errors, field.name) ? 'invalid_style' : ''}`}>{label}</label>
      <div style={{marginTop: '5px'}}
           className={`input-container ${get(form.touched, field.name) && get(form.errors, field.name) ? 'shake' : ''}`}>
        <TextArea {...field}
                  value={field?.value}
                  style={{
                    borderColor: `${get(form.touched, field.name) && get(form.errors, field.name) && 'red'} `,
                    height: 120,
                    resize: 'none'
                  }}
                  placeholder={placeholder}
                  showCount
                  maxLength={100}
                  onChange={(event) => {
                    if (isValid(event)) {
                      isFunction(get(inputProps, "onChange")) &&
                      inputProps.onChange(event);
                      field.onChange(event);
                    }
                  }}/>
      </div>
      <ControlError form={form} field={field}/>
    </div>
  )
}

export default Description
