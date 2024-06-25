import React, { useState, useRef } from 'react';

const OtpInput = ({ numInputs, onOtpChange }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(''));
  const inputs = useRef([]);

  const handleChange = (index, event) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    if (event.target.nextSibling && event.target.value !== '') {
      event.target.nextSibling.focus();
    }
    onOtpChange(newOtp.join(''));
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index !== 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
          style={{
            width: '40px',
            height: '40px',
            margin: '0 10px',
            textAlign: 'center',
            fontSize: '18px',
            borderRadius: '5px',
            border: '1px solid #FF5151',
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
