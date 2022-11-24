import React, { forwardRef } from "react";
import { Box, Flex } from "@chakra-ui/react";

export const ScreenLayout = forwardRef<
  any,
  {
    children: React.ReactNode;
    transitionStyles: any;
    defaultStyles: any;
  }
>(({ children, transitionStyles, defaultStyles }, ref) => {
  return (
    <Flex
      w="100vw"
      p="32"
      position="absolute"
      top="0"
      left="0"
      justify="center"
      ref={ref}
      style={{
        ...defaultStyles,
        ...transitionStyles,
      }}
    >
      <Box maxWidth="120rem">{children}</Box>
    </Flex>
  );
});
