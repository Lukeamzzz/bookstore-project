import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-semibold mb-1'>{label}</label>
      <input
        type={type}
        {...register(name,  { required: true })}
        className='px-4 py-2 border w-full rounded-md focus:outline-none'
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;