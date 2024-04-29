import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Text, VStack, useToast, Image, SimpleGrid, Radio, RadioGroup, Stack, Textarea, Select, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaPlay, FaHome, FaQuestionCircle, FaLock } from "react-icons/fa";

const Index = () => {
  const [gameMode, setGameMode] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGameSelection = (mode) => {
    setGameMode(mode);
    toast({
      title: `Game mode set to ${mode}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const resetGame = () => {
    setGameMode(null);
  };

  const GameSelection = () => (
    <VStack spacing={4}>
      <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={() => handleGameSelection("Grid Game")}>
        Play Grid Game
      </Button>
      <Button leftIcon={<FaPlay />} colorScheme="blue" onClick={() => handleGameSelection("Red or Blue")}>
        Play Red or Blue
      </Button>
      <Button leftIcon={<FaPlay />} colorScheme="purple" onClick={() => handleGameSelection("Team vs Team")}>
        Play Team vs Team
      </Button>
      <Button leftIcon={<FaPlay />} colorScheme="green" onClick={() => handleGameSelection("Vault Game")}>
        Play Vault Game
      </Button>
    </VStack>
  );

  const GameArea = () => {
    switch (gameMode) {
      case "Grid Game":
        return <Text>Grid Game Component</Text>;
      case "Red or Blue":
        return <Text>Red or Blue Game Component</Text>;
      case "Team vs Team":
        return <Text>Team vs Team Game Component</Text>;
      case "Vault Game":
        return <Text>Vault Game Component</Text>;
      default:
        return <GameSelection />;
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading>Welcome to the Game Center</Heading>
        <Image src="https://images.unsplash.com/photo-1673372816109-bee8f5fd6f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxnYW1lJTIwY2VudGVyfGVufDB8fHx8MTcxNDQxODQwNXww&ixlib=rb-4.0.3&q=80&w=1080" alt="Game Center" />
        {gameMode ? (
          <Flex direction="column" align="center">
            <GameArea />
            <Button leftIcon={<FaHome />} mt={4} colorScheme="red" onClick={resetGame}>
              Back to Game Selection
            </Button>
          </Flex>
        ) : (
          <GameSelection />
        )}
      </VStack>
    </Container>
  );
};

export default Index;
