import React from 'react';
import GenericSignUp from '../../common/GenericSignUp/GenericSignUp';

const OrganizationSignUp = () => {


  return (
    <GenericSignUp
      title="Sign Up"
      checkboxLabel="I agree to Terms Of Service and Privacy Policy."
      endpointUrl="http://127.0.0.1:8000/auth/organization/signup/" 
      navigateLink = 'organization/verify-otp'
    />
  );
};

export default OrganizationSignUp;