"use client";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const GoogleSignIn = () => {
  return (
    <Button
      as={motion.button}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"#FF0080"}
      href={"#"}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#e00071",
      }}
      whileTap={{
        scale: 0.9,
      }}
    >
      Sign In WIth Google
    </Button>
  );
};

export default GoogleSignIn;
