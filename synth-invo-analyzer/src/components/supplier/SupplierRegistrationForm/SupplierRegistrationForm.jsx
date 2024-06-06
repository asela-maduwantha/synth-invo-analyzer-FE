import React from 'react'
import GenericSignUp from '../../common/GenericSignUp/GenericSignUp'

const SupplierRegistrationForm = () => {
  return (
    <div>
      <GenericSignUp
       title="Register as a supplier"
       checkboxLabel="I agree to Terms Of Service and Privacy Policy."
       endpointUrl="http://127.0.0.1:8000/auth/register-new-supplier/" 
       navigateLink = 'supplier/uplaodtemplate'
      
      />
    </div>
  )
}

export default SupplierRegistrationForm
