import React from 'react';
import type { NextPage } from 'next';
import { Switch } from '@chakra-ui/react';

interface DarkModeSwitchProps {
  isDark: boolean;
  toggleColorMode: () => void;
}

export const DarkModeSwitch: NextPage<DarkModeSwitchProps> = ({
  isDark,
  toggleColorMode,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Switch
        mt={2.5}
        mx={2}
        color={'green'}
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </React.Fragment>
  );
};
