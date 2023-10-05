import React, { HTMLProps, ReactNode, Ref } from 'react';
import { FieldError } from 'react-hook-form';
import { FormError } from 'src/components/organisms/AgentContactForm/AgentContactForm';

export interface IHtmlLabelProps { }

const HtmlLabel = React.forwardRef<
  HTMLLabelElement,
  {
    error?: FieldError | undefined;
  } & HTMLProps<HTMLLabelElement>
>(({ children, title, error, className }, ref: Ref<HTMLLabelElement>) => (
  <label ref={ref} className={`block text-sm ${className}`}>
    <div className='mb-1 ml-1'>{title}</div>
    {children}
    {error && <FormError error={error} />}
  </label>
));

HtmlLabel.displayName = 'HtmlLabel';

export default HtmlLabel;
