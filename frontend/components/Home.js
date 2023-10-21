import { StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useState, useRef, useEffect } from "react";
import theme from "../utils/theme";
import { sendEmail } from "../services/nodemailerapi";
import {
  Heading,
  VStack,
  Box,
  Center,
  FormControl,
  Input,
  Button,
  TextArea,
  ScrollView,
} from "native-base";
import PhoneInput from "react-native-phone-number-input";

const Home = () => {
  const [formData, setData] = useState({});
  const [formError, setformError] = useState({});
  const [load,setload]=useState(false);
  const phoneInput = useRef(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateForm = () => {
    setformError({});
    console.log(formData);
    let errorObj = {};
    if (!formData.name) {
      errorObj = { ...errorObj, name: "cannot be empty" };
    }
    if (formData.email) {
      if (!validateEmail(formData.email)) {
        errorObj = { ...errorObj, email: "incorrect email address" };
      }
    } else {
      errorObj = { ...errorObj, email: "cannot be empty" };
    }
    if (formData.PhoneNumber) {
      const checkValid = phoneInput.current?.isValidNumber(
        formData.PhoneNumber
      );
      if (!checkValid) {
        errorObj = { ...errorObj, PhoneNumber: "incorrect mobile number" };
      }
    } else {
      errorObj = { ...errorObj, PhoneNumber: "cannot be empty" };
    }
    if (!formData.message) {
      errorObj = { ...errorObj, message: "cannot be empty" };
    }
    console.log(errorObj);
    setformError(errorObj);
    setload(true);
    if(Object.entries(errorObj).length === 0)return true;
    else return false;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      console.log("ama to ave che ne");
       const res = await sendEmail(formData);
      
       setload(false);
    } 
  };

  return (
    <>
      <VStack mt="20" flexDirection="column" justifyContent="center">
        <Box>
          <Heading size="3xl" color={"primary.600"} textAlign={"center"}>
            contact us
          </Heading>
        </Box>
        <ScrollView>
          <Box m="10">
            <FormControl isRequired mb="2" isInvalid={"name" in formError}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Name
              </FormControl.Label>
              <Input
                placeholder="John"
                value={formData.name}
                onChangeText={(value) => setData({ ...formData, name: value })}
              />
              {/* <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
              enter your name
            </FormControl.HelperText> */}

              <FormControl.ErrorMessage
                _text={{
                  fontSize: "xs",
                }}
              >
                {formError.name}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired mb="2" isInvalid={"email" in formError}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Email
              </FormControl.Label>
              <Input
                placeholder="example@xyz.com"
                value={formData.email}
                onChangeText={(value) => setData({ ...formData, email: value })}
              />
              {/* <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
             
            </FormControl.HelperText> */}
              <FormControl.ErrorMessage
                _text={{
                  fontSize: "xs",
                }}
              >
                {formError.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              mb="2"
              isInvalid={"PhoneNumber" in formError}
            >
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Phone Number
              </FormControl.Label>
              <PhoneInput
                ref={phoneInput}
                defaultValue={formData.PhoneNumber}
                defaultCode="IN"
                onChangeFormattedText={(text) => {
                  setData({ ...formData, PhoneNumber: text });
                }}
                //   withDarkTheme={true}
                // withShadow
                // autoFocus
              />
              {/* <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            ></FormControl.HelperText> */}
              <FormControl.ErrorMessage
                _text={{
                  fontSize: "xs",
                }}
              >
                {formError.PhoneNumber}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired mb="7" isInvalid={"message" in formError}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Message
              </FormControl.Label>
              <TextArea
                h={40}
                placeholder="Message"
                w="100%"
                value={formData.message}
                onChangeText={(value) =>
                  setData({ ...formData, message: value })
                }
              />
              <FormControl.ErrorMessage
                _text={{
                  fontSize: "xs",
                }}
              >
                {formError.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button onPress={onSubmit}>Send</Button>
          </Box>
        </ScrollView>
      </VStack>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 10,
    marginTop: 30,
  },
  Heading: {
    backgroundColor: theme.colors.primary,
    margin: 0,
    padding: 0,
  },
});
export default Home;
