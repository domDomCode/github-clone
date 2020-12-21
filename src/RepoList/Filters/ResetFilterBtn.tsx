import React, { FC, useContext } from 'react';
import { Link, SelectMenu } from '@primer/components';
import { XIcon } from '@primer/octicons-react';

interface Props {
  setActiveFilter: (type: null) => void
}
const ResetFilterBtn: FC<Props> = ({setActiveFilter}) => {
  const menuContext = useContext(SelectMenu.MenuContext);

  return (
    <Link
      as={'button'}
      hoverColor={'gray.8'}
      color={'gray.4'}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        setActiveFilter(null)
        menuContext.setOpen(false);
      }}
    >
      <XIcon size={16}/>
    </Link>

  )
}

export default ResetFilterBtn;