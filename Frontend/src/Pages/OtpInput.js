import React, { useState, useRef } from 'react';

const OtpInput = ({ numInputs,onOtpChange }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(''));
  const inputs = useRef([]);

  const handleChange = (index, event) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    // Move to the next input field automatically
    if (event.target.nextSibling && event.target.value !== '') {
      event.target.nextSibling.focus();
    }
    onOtpChange(newOtp.join(''))
  };

  const handleKeyDown = (index, event) => {
    // Move to the previous input field when pressing backspace
    if (event.key === 'Backspace' && index !== 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className='otpInput-style'>
      {[...Array(numInputs)].map((_, index) => (
        
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputs.current[index] = el)}
          required
          className='input-varifiy-otp'
        />
      ))}
    </div>
  );
};

export default OtpInput;