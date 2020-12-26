import React from 'react';
import {StyleSheet} from 'react-native';
import {
  GoogleSocialButton,
  FacebookSocialButton,
} from 'react-native-social-buttons';
export default () => {
  return (
    <>
      <GoogleSocialButton
        buttonViewStyle={styles.socialBtn}
        buttonText={'Google-ээр нэвтрэх'}
      />
      <FacebookSocialButton
        buttonText={'Facebook-ээр нэвтрэх'}
        buttonViewStyle={styles.socialBtn}
      />
    </>
  );
};
const styles = StyleSheet.create({
  socialBtn: {
    width: 270,
    borderRadius: 10,
    elevation: 1,
  },
});
