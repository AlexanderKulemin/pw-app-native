import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/images/parrot.png';
import { useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../store/auth';
import { IRootState, IsignUp } from '../models';
import { showMessage } from "react-native-flash-message";

const signUpSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is incorrect').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignUp: React.FC<any> = ({navigation}: {navigation: any}) => {
  const { error } = useSelector((state: IRootState) => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: IsignUp) => {
    const { username, email, password } = values;
    const response = await dispatch(signUp({username, email, password}));

    if (signUp.rejected.match(response)) {
      showMessage({
        message: error.message,
        backgroundColor: '#e91e63',
      })
    }
  }

  return (
    <View style={styles.login}>
      <View style={styles.imgBox}>
        <Image style={styles.img} source={logo} />
      </View>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={signUpSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => onSubmit(values)}
      >
        {({ handleChange, handleSubmit, values, errors }) => ( 
          <View style={styles.box}>
            <TextInput style={styles.input} placeholder="Name" value={values.username} onChangeText={handleChange('username')} />
            {errors.username && <View style={styles.errorBox}><Text style={styles.error}>{errors.username}</Text></View>}
            <TextInput style={styles.input} placeholder="Email" value={values.email} onChangeText={handleChange('email')} />
            {errors.email && <View style={styles.errorBox}><Text style={styles.error}>{errors.email}</Text></View>}
            <TextInput style={styles.input} placeholder="Password" value={values.password} secureTextEntry onChangeText={handleChange('password')} />
            {errors.password && <View style={styles.errorBox}><Text style={styles.error}>{errors.password}</Text></View>}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.9}>
              <Text style={styles.buttonText}>Registration</Text>
            </TouchableOpacity>
          </View>
      )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  imgBox: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginBottom: 15,
  },
  img: {
    width: 150,
    height: 150,
    marginHorizontal: 'auto',
  },
  input: {
    height: 60,
    backgroundColor: '#f7f7f7',
    paddingLeft: 22,
    borderRadius: 3,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
    color: '#333',
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e91e63',
    fontSize: 16,
    marginBottom: 10,
  },
  outline: {
    width: '100%',
    height: 60,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    borderColor: '#e91e63',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  outlineText: {
    color: '#e91e63',
    fontSize: 18,
  },
  errorBox: {
    marginTop: -10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 14
  }
})
export default SignUp;