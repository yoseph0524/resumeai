// app/page.js
"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./logo";
import {
  Container,
  Text,
  Flex,
  Box,
  Spacer,
  Button,
  VStack,
} from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export default function analyze() {
  const router = useRouter();

  const handleAnalyzeClick = () => {
    router.push("/analyze");
  };

  const handleCreateClick = () => {
    router.push("/create");
  };

  return (
    <CacheProvider>
      <ChakraProvider>
        {" "}
        <div>
          <Container centerContent>
            <Flex alignContent="center">
              <Spacer />
              <Box>
                <Box>
                  <Text
                    as={motion.p}
                    style={{ color: "#FF0080" }}
                    bgClip="text"
                    fontSize="8xl"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: { delay: 5, duration: 2.3 },
                    }}
                  >
                    Resume AI
                  </Text>
                  <Flex>
                    <Text
                      as={motion.p}
                      bgClip="text"
                      fontSize="2xl"
                      fontWeight="bold"
                      style={{ color: "#FF0080" }}
                      initial={{ opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { delay: 6, duration: 2.5 },
                      }}
                    >
                      Upload.
                    </Text>
                    <Spacer />
                    <Text
                      as={motion.p}
                      bgClip="text"
                      fontSize="2xl"
                      fontWeight="bold"
                      style={{ color: "#FF0080" }}
                      initial={{ opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { delay: 7, duration: 2.5 },
                      }}
                    >
                      Analyze.
                    </Text>
                    <Spacer />

                    <Text
                      as={motion.p}
                      bgClip="text"
                      fontSize="2xl"
                      fontWeight="bold"
                      style={{ color: "#FF0080" }}
                      initial={{ opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { delay: 8, duration: 2.5 },
                      }}
                    >
                      Change.
                    </Text>
                    <Spacer />

                    <Text
                      as={motion.p}
                      bgClip="text"
                      fontSize="2xl"
                      fontWeight="bold"
                      style={{ color: "#FF0080" }}
                      initial={{ opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { delay: 9.5, duration: 3 },
                      }}
                    >
                      Create.
                    </Text>
                  </Flex>
                </Box>
                <Logo />
              </Box>
            </Flex>
            <VStack
              as={motion.div}
              initial={{
                opacity: 0,
                y: 100,
              }}
              gap={4}
              animate={{
                y: -40,
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 11,
                  type: "spring",
                  damping: 9,
                  stiffness: 60,
                },
              }}
            >
              <Flex
                justify="center"
                align="center"
                gap={4} // You can specify the gap size here
                mt={4}
              >
                <Button
                  as={motion.button}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  onClick={handleAnalyzeClick}
                  bg={"#FF0080"}
                  href={"#"}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#e00071",
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Analyze
                </Button>
                <br />
                <Button
                  as={motion.button}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  onClick={handleCreateClick}
                  bg={"#FF0080"}
                  href={"#"}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#e00071",
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Create
                </Button>
              </Flex>
              <Flex
                justify="center"
                align="center"
                gap={4} // You can specify the gap size here
                mt={4}
              >
                <Link href="/Auth/SignUp">
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
                    Sign Up
                  </Button>
                </Link>
                <Link href="/Auth/SignIn">
                  <Button
                    as={motion.button}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"#FF0080"}
                    href={"#"}
                    whileHover={{
                      scale: 1.1,
                      opacity: 0.8,
                      backgroundColor: "#e00071",
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              </Flex>
            </VStack>
          </Container>
        </div>
      </ChakraProvider>
    </CacheProvider>
  );
}
