import { useState} from 'react';

import {message, Select} from 'antd';
import {httpClient} from "@/utils/index.js";

export const CustomSelect = (props) => {
  const {url, placeholder, classes = '', styles, size = 'middle', form, field, getValue} = props;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await httpClient({
        method: "GET",
        url,
        params: {page: 1, pageSize: 1000},
      });
      if (response.data?.data) {
        const newOptions = response.data.map((item) => ({
          value: item.id,
          label: item?.title
        }));
        setOptions(newOptions);
      }
    } catch (err) {
      message.error(err)
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    form && form?.setFieldValue(field?.name, value);
    getValue && getValue(value)
  };

  const handleFocus = () => {
    url?.length && fetchData();
  };


  return (
    <Select
      size={size}
      style={styles}
      options={options}
      loading={loading}
      className={classes}
      onFocus={handleFocus}
      onChange={handleChange}
      placeholder={placeholder}
      value={field?.value || null}
      // onBlur={() => setFocused(false)}
    />
  )
}
