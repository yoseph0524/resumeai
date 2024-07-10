/** @format */

"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Logo from "./logo";
import {
  Center,
  Container,
  HStack,
  Text,
  Flex,
  Box,
  Spacer,
  Button,
  VStack,
} from "@chakra-ui/react";

function Landing() {
  return (
    <div>
      <Container centerContent>
        <Flex alignContent="center">
          <Spacer />
          <Box>
            <Box>
              <Text
                as={motion.p}
                bgGradient="linear(to-r, #FF0000, #b742ff)"
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
                Coincase
              </Text>
              <Flex>
                <Text
                  as={motion.p}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="#FF0000"
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 6, duration: 2.5 },
                  }}
                >
                  Buy.
                </Text>
                <Spacer />
                <Text
                  as={motion.p}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="#FF0000"
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 7, duration: 2.5 },
                  }}
                >
                  Sell.
                </Text>
                <Spacer />

                <Text
                  as={motion.p}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="#FF0000"
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 8, duration: 2.5 },
                  }}
                >
                  Trade.
                </Text>
                <Spacer />

                <Text
                  as={motion.p}
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="#b742ff"
                  initial={{ opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 9.5, duration: 3 },
                  }}
                >
                  Crypto.
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
          <Link href="/Auth/SignUp">
            <Button
              as={motion.button}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#FF0000"}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#e00071",
              }}
              whileTap={{
                scale: 0.9,
              }}
            >
              Get Started
            </Button>
          </Link>
          <Link href="/Auth/SignIn">
            <Button
              as={motion.button}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#FF0000"}
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
        </VStack>
      </Container>
    </div>
  );
}

export default Landing;
