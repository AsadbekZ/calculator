import React from 'react';

const Symbols = ({ handleOperationClick }) => {
  const symbols = ['/', 'x', '-', '+'];
  
  return (
    <div className='symbols'>
      {symbols.map((item) => (
        <div className='symbol' key={item} onClick={() => handleOperationClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Symbols;
