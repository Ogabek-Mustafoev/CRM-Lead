import { get, isArray, isBoolean, isFunction } from "lodash";
import * as yup from "yup";

const createFormSchema = (fields) => {
  const initialValues = {};
  const validationSchema = {};
  fields.forEach((item) => {
    if ("value" in item && item.value !== undefined) {
      initialValues[item.name] = item.value;
    } else initialValues[item.name] = "";

    validationSchema[item.name] = createYupSchema(item, item.name);
  });
  return {
    initialValues,
    validationSchema: yup.object().shape(validationSchema),
  };
};

const createYupSchema = (field, languages) => {
  const {
    validationType = "string",
    validations = [],
    lazy,
    isLanguageSchema,
  } = field;

  let validator = yup[validationType]();
  validations.forEach(({ type, params }) => {
    switch (type) {
      case "typeError":
        validator = validator.typeError(
          params ? params : `Invalid ${validationType}`
        );
        break;
      case "required":
        validator = validator.required(params ? params : "Bu maydon to'ldirish majburiy");
        break;
      case "price":
        validator = validator
          .min(100000, "Belgilangan minimal narx 100,000 so'm")
          .max(10000000, "10,000,000 so'm dan ortiq narx kiritish mumkin emas!")
          .required(params ? params : "Bu maydon to'ldirish majburiy");
        break;
      case "nameValidation":
        validator = validator
          .min(3, "Ism 3ta harfdan kam bo'lmasligi kerak!")
          .max(64, "Ism 64ta harfdan ko'p bo'lmasligi kerak!")
          .required(params ? params : "Bu maydon to'ldirish majburiy");
        break;
      case "room":
        validator = validator
          .min(1, "Kiritilishi mumkin bo'lgan minimal son! 1")
          .max(1000, "Kiritilishi mumkin bo'lgan maksimal son 1000")
          .required(params ? params : "Bu maydon to'ldirish majburiy");
        break;
      case "duration":
        validator = validator
          .min(1, "Kiritilishi mumkin bo'lgan minimal son! 1")
          .max(1000, "Kiritilishi mumkin bo'lgan maksimal son 1000")
          .required(params ? params : "Bu maydon to'ldirish majburiy");
        break;
      case "amount":
        validator = validator
          .min(1, "Kiritilishi mumkin bo'lgan minimal son! 1")
          .max(100000000, "Kiritilishi mumkin bo'lgan maksimal son 100 000 000")
          .required(params ? params : "Bu maydon to'ldirish majburiy");
        break;
      case "lessonDuration":
        validator = validator
          .min(1, "Kiritilishi mumkin bo'lgan minimal son! 1")
          .max(1000, "Kiritilishi mumkin bo'lgan maksimal son 1000")
          .required(params ? params : "Bu maydon to'ldirish majburiy");
        break;
      case "email":
        validator = validator.email(params ? params : "Invalid email");
        break;

      case "phone":
        validator = validator.matches(
          /(\+9{2}8 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2})/g,
          "Phone number is not valid"
        );
        break;
      case "password": // Add a new case for password validation
        validator = validator
          .min(7, "Password must be at least 7 characters long")
          .test(
            "password",
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            (value) => {
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
                value
              );
            }
          );
        break;
      default:
        if (isArray(params)) validator = validator[type](...params);
        else validator = validator[type](params);
        break;
    }
  });

  if (isFunction(lazy)) {
    validator = lazy(validator, yup);
  }

  if (isBoolean(isLanguageSchema)) {
    validator = validator.shape(
      languages.reduce(
        (prev, item) => ({
          ...prev,
          [item.code]: yup.string().typeError("Invalid"),
        }),
        {}
      )
    );
  }

  return validator;
};

const mapFormValues = (values, fields) => {
  const formValues = {};

  fields.forEach((field) => {
    if (isFunction(field.onSubmitValue)) {
      formValues[field.name] = field.onSubmitValue(values[field.name], values);
    } else formValues[field.name] = values[field.name];
    if (field.disabled) delete formValues[field.name];
  });

  return formValues;
};

const getFormValues = (values, fields, isFormData, serialize, normalizeData) => {
  const createdValues = mapFormValues(values, fields);
  let formValues = isFormData ? serialize(createdValues) : createdValues;
  if (isFunction(normalizeData)) formValues = normalizeData(createdValues);

  return formValues;
};

const gerErrorMessage = (error) => {
  const defaultMessage = get(error, "response.data.error.message");
  const customMessage = get(
    Object.values(get(error, "response.data.message", {})),
    "0"
  );

  return customMessage || defaultMessage;
};

export const formHelpers = {
  createFormSchema,
  gerErrorMessage,
  getFormValues,
};
