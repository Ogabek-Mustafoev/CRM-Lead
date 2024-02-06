import {Form, Formik} from "formik";
import {isFunction} from "lodash";
import {httpClient, formHelpers, queryBuilder} from "@/utils";
import {ErrorHandle} from "@/utils/api-helpers.js";

const FormContainer = ({
                         url,
                         params,
                         method = "post",
                         children,
                         isFormData = false,
                         fields = [],
                         normalizeData,
                         axiosConfig = {},
                         onSuccess = () => {
                         },
                         onFinal = () => {
                         },
                         customData = {},
                         onSubmit,
                         validateOnMount = false,
                         validate,
                         ...formProps
                       }) => {
  const {initialValues, validationSchema} =
    formHelpers.createFormSchema(fields);
  const handleSubmit = async (values, formHelper) => {
    try {
      const formValues = formHelpers.getFormValues(
        values,
        fields,
        isFormData,
        normalizeData
      );
      const requestUrl = params ? queryBuilder(url, params) : url;
      const {data} = await httpClient[method](
        requestUrl,
        {...formValues, ...customData},
        axiosConfig
      );
      formHelper.resetForm();
      onSuccess(data);
    } catch (err) {
      const statusCode = err?.response?.status;
      ErrorHandle(statusCode);
    } finally {
      formHelper.setSubmitting(false);
      onFinal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={validateOnMount}
      validate={validate}
      onSubmit={(value, formHelper) => {
        isFunction(onSubmit)
          ? onSubmit(value, formHelper)
          : handleSubmit(value, formHelper);
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        return <Form {...formProps}>{children(formik)}</Form>;
      }}
    </Formik>
  );
};

export default FormContainer;
