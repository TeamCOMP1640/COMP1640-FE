import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { FC } from 'react';

import './TextField.scss';

type TextFieldProp = {
  children: React.ReactNode;
  active?: boolean;
  disable?: boolean;
} & FormItemProps;

const { Item } = Form;

export const TextField: FC<TextFieldProp> = ({
  disable = false,
  active,
  children,
  ...props
}) => {
  const className = props.required ? 'required' : '';
  const isActive =
    active === true && disable === false
      ? 'active'
      : disable === false
      ? ''
      : 'active-disable';

  return (
    <Item
      {...props}
      className={`text-field ${className} ${isActive} `}
      colon={false}
    >
      {children}
    </Item>
  );
};
