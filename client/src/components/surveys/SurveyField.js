import React from 'react';

// this is the same as saying props.input
export default ({ input, label }) => {
  return (
    <div>
      {/* get everything in input, brought here by redux form */}
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
