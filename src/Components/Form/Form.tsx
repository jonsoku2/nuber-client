import React from 'react';

interface Props {
  onSubmit: any;
  className?: string;
}

const Form: React.FC<Props> = ({ onSubmit, className, children, ...props }) => {
  return (
    <form
      className={className}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
      }}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
