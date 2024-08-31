import { useState } from 'react';

export const useDisclosure = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const [actionProps, setActionProps] = useState({});

  const onClose = () => {
    setActionProps({});
    setIsOpen(false);
  };
  const onOpen = () => setIsOpen(true);
  const onToggle = () => {
    if (isOpen) {
      setActionProps({});
    }
    setIsOpen(!isOpen);
  };
  const stageAction = (props) => {
    setActionProps(props);
    setIsOpen(true);
  };

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
    stageAction,
    actionProps,
  };
};
