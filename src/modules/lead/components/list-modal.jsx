import {get} from "lodash";
import {FastField} from "formik";
import {Button, Drawer} from "antd";
import {toast} from "react-toastify";
import FormContainer from "@/containers/index.jsx";
import MainInput from "@/components/fields/main-input.jsx";

const ListModal = (props) => {
  const {onClose, open, values, setValues, refetch} = props;

  return (
    <Drawer title={get(values, '_id') ? 'Edit List' : 'Create List'} onClose={onClose} open={open}>
      <FormContainer
        method={get(values, '_id') ? 'put' : "post"}
        url={get(values, '_id') ? `status/update/${get(values, '_id')}` : 'status/create'}
        onSuccess={() => {
          refetch()
          setValues({})
          toast.success(get(values, '_id') ? "List updated successfully" : "List created successfully")
          onClose()
        }}
        onError={(err) => {
          console.log(err);
          toast.error("Data is incorrect!");
        }}
        fields={[
          {
            name: "name",
            validations: [{type: "required"}],
            value: get(values, "name"),
            validationType: "string",
            onSubmitValue: (value) => value,
          },
          {
            name: "statusName",
            validations: [{type: "required"}],
            validationType: "string",
            value: get(values, "statusName"),
            onSubmitValue: (value) => value,
          },
        ]}
      >
        {({isSubmitting}) => {
          return (
            <>
              <div>
                <FastField
                  name="name"
                  label='List Name'
                  component={MainInput}
                  placeholder='List Name'

                />
              </div>
              <div>
                <FastField
                  name="statusName"
                  label='Status Name'
                  component={MainInput}
                  placeholder='Status name'
                />
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  size="large"
                  htmlType="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className='bg-[#001529] text-white hover:bg-white hover:text-[#001529]'
                >
                  {get(values, '_id') ? "Save" : "Submit"}
                </Button>
              </div>
            </>
          );
        }}
      </FormContainer>
    </Drawer>
  )
}

export default ListModal

