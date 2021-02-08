import { Field, Formik } from "formik";
import { loginUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../shared/config";
import OrSeperator from "./OrSeperator";
import {
  LeftFormContainer,
  RightFormContainer,
  FormContainer,
  FormWrapper,
} from "../../shared/Form";


const SignUpTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
`;

const NameContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const AccountBtn = styled(Button)`
  width: 200px;
  height: 38px;
  background: ${colors.blue1};
  font-weight: 700;
  margin-top: 15px;
`;
const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

const Login = ({handleUser}) =>{
    const dispatch = useDispatch();
    let history = useHistory();
    return(
        <FormContainer>
        <LeftFormContainer />
        <RightFormContainer>
          <SignUpTitle>Log in to Embark</SignUpTitle>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              const { email, password } = values;
              const oldUser = {
                email,
                password,
              };
              dispatch(loginUser(oldUser, history));
              handleUser(values);
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors }) => (
              <FormWrapper>
                <Field
                  name="email"
                  placeholder="Email"
                  as={TextField}
                  margin="normal"
                  helperText={errors.email}
                  error={!!errors.email}
                ></Field>
                <Field
                  name="password"
                  placeholder="Password"
                  as={TextField}
                  margin="normal"
                  helperText={errors.password}
                  error={!!errors.password}
                  type="password"
                ></Field>
                <AccountBtn type="submit">Log in</AccountBtn>
              </FormWrapper>
            )}
          </Formik>
        </RightFormContainer>
      </FormContainer>
    )
}

export default Login;