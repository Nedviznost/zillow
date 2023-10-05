import React, { InputHTMLAttributes, Ref } from 'react';

interface HtmlSelectProps extends InputHTMLAttributes<HTMLSelectElement> { }

const HtmlSelect = React.forwardRef<HTMLSelectElement, HtmlSelectProps>(
  ({ children, ...props }: HtmlSelectProps, ref: Ref<HTMLSelectElement>) => (
    <select
      {...props}
      ref={ref}
      className='block w-full px-3 py-2 placeholder-gray-500 border border-gray-200 rounded shadow-sm appearance-none bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
    >
      {children}
    </select>
  )
);

export default HtmlSelect;
