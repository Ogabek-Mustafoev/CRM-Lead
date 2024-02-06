import {FastField} from "formik";
import {toast} from "react-toastify";
import logo from "@/assets/icons/logo.svg";
import {Button, Card, Checkbox} from "antd";
import {useNavigate} from "react-router-dom";
import FormContainer from "@/containers/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import MainInput from "@/components/fields/main-input.jsx";
import {logIn, setIsRememberMe} from "@/store/auth-slice/index.js";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isRememberMe} = useSelector((state) => state.auth);

  localStorage.clear();
  sessionStorage.clear();

  return (
    <section
      className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 bg-no-repeat bg-gradient-to-b from-stone-200 to-stone-800">
      <Card className="shadow-2xl mb-10 w-full max-w-md rounded-3xl backdrop-blur-xl border-y-green-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-28 object-cover"
            src={logo}
            alt="Texnolife Company"
          />
          <h2 className="mt-4 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-[#603310]">
            Sign in to your account
          </h2>
        </div>
        <FormContainer
          method={"post"}
          url={"/auth/login/"}
          onSuccess={({token, ...item}) => {
            if (isRememberMe) {
              localStorage.setItem("accessToken", token);
            } else {
              sessionStorage.setItem("accessToken", token);
            }
            toast.success("Вы успешно зарегистрировались!");
            dispatch(logIn(item));
            navigate('/lead');
          }}
          onError={(err) => {
            console.log(err);
            toast.error("Пароль или номер телефона неверный!");
          }}
          fields={[
            {
              name: "phoneNumber",
              validations: [{type: "required"}],
              value: "+998995252284",
              onSubmitValue: (value) => value,
            },
            {
              name: "password",
              validations: [{type: "required"}],
              value: "password",
              onSubmitValue: (value) => value,
            },
          ]}
        >
          {({isSubmitting}) => {
            return (
              <div className="flex flex-col gap-2.5">
                <div>
                  <FastField
                    name="phoneNumber"
                    component={MainInput}
                    placeholder="+998 ..."
                    label="Номер телефона"
                    isPhone={true}
                    labelClass="text-base text-[#603310] font-semibold"
                  />
                </div>
                <div>
                  <FastField
                    name="password"
                    component={MainInput}
                    placeholder="***********"
                    label="Пароль"
                    isPassword={true}
                    labelClass="text-base text-[#603310] font-semibold"
                  />
                </div>
                <Checkbox
                  className="cursor-pointer mt-2 mb-4"
                  checked={isRememberMe}
                  id="remember-me"
                  onChange={() => dispatch(setIsRememberMe(!isRememberMe))}
                >
                  <label
                    htmlFor="remember-me"
                    className="cursor-pointer text-[#603310] text-base"
                  >
                    Запомнить меня
                  </label>
                </Checkbox>
                <Button
                  htmlType="submit"
                  size="large"
                  loading={isSubmitting}
                  className="w-full bg-stone-500 hover:bg-stone-700"
                >
                  <span className="text-white"> Отправлять</span>
                </Button>
              </div>
            );
          }}
        </FormContainer>
      </Card>
    </section>
  );
};
