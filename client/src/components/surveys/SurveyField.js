import React from 'react';

// this is the same as saying props.input
export default ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      {/* get everything in input, brought here by redux form */}
      <label>{label}</label>
      <input {...input} style={{ marginBottom: 5 }} />
      <div className='red-text' style={{ marginBottom: 10 }}>
        {touched && error}
      </div>
    </div>
  );
};
