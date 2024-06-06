// AdminSignUp.js

import React from 'react';
import GenericSignUp from '../../common/GenericSignUp/GenericSignUp';

const AdminSignUp = () => {

  return (
    <GenericSignUp
      title="Admin Sign Up"
      checkboxLabel="I agree to Admin's Terms Of Service and Privacy Policy."
      endpointUrl="http://127.0.0.1:8000/auth/systemadmin/signup/" 
      navigateLink = 'admin/verify-otp'
    />
  );
};

export default AdminSignUp;
