import {get} from "lodash";
import {FastField} from "formik";
import {Button, Drawer} from "antd";
import {toast} from "react-toastify";
import FormContainer from "@/containers/index.jsx";
import MainInput from "@/components/fields/main-input.jsx";

const LeadModal = (props) => {
  const {onClose, open, values, setValues, refetch} = props;

  return (
    <Drawer title={get(values, '_id') ? 'Edit Lead' : 'Create Lead'} onClose={onClose} open={open}>
      <FormContainer
        method={get(values, '_id') ? 'put' : "post"}
        url={get(values, '_id') ? `lid/update/${get(values, '_id')}` : 'lid/create'}
        onSuccess={() => {
          refetch()
          setValues({})
          toast.success(get(values, '_id') ? "Lead updated successfully" : "Lead created successfully")
          onClose()
        }}
        onError={(err) => {
          console.log(err);
          toast.error("Data is incorrect!");
        }}
        fields={[
          {
            name: "fullname",
            validations: [{type: "required"}],
            value: get(values, "fullname") || null,
            validationType: "string",
            onSubmitValue: (value) => value,
          },
          {
            name: "status",
            value: get(values, "statusId") || null,
            validationType: "string",
            onSubmitValue: (value) => value,
          },
          {
            name: "phoneNumber",
            validations: [{type: "required"}],
            validationType: "string",
            value: get(values, "phoneNumber") || '',
            onSubmitValue: (value) => value,
          },
        ]}
      >
        {({isSubmitting}) => {
          return (
            <>
              <div>
                <FastField
                  label='Name'
                  name="fullname"
                  component={MainInput}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <FastField
                  isPhone
                  name="phoneNumber"
                  label='Phone Number'
                  component={MainInput}
                  placeholder='+998 (##) ### ####'
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

export default LeadModal

