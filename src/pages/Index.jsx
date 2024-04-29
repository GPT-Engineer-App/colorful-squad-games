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
        return <GridGame />;
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
    <Container maxW="container.xl" py={10} bg="linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 100%), linear-gradient(45deg, rgba(255,0,0,0.6), rgba(0,255,0,0.6))" bgBlendMode="multiply" minHeight="100vh">
      <VStack spacing={8} align="center" justify="center" height="100vh">
        <Heading size="4xl" mb={20}>
          VOTAR
        </Heading>

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

const GridGame = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [gridData, setGridData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handlePlayerCountChange = (event) => {
    setPlayerCount(Number(event.target.value));
    setGridData(Array(Number(event.target.value)).fill(""));
  };

  const handleInputChange = (index, value) => {
    const newData = [...gridData];
    const existingValues = new Set(newData);
    if (!existingValues.has(value) || value.length > 1) {
      newData[index] = value;
      setGridData(newData);
    }
  };

  const startGame = () => {
    if (gridData.every((value) => value !== "")) {
      setGameStarted(true);
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * gridData.length);
        const newGridData = gridData.map((value, idx) => (idx === randomIndex ? "red" : value));
        setGridData(newGridData);
        if (gridData.filter((value) => typeof value === "string").length <= 1) {
          clearInterval(interval);
          alert("Game Over. Winner is the last remaining square!");
        }
      }, 1000);
    }
  };

  return (
    <VStack>
      <Input placeholder="Enter number of players" onChange={handlePlayerCountChange} type="number" />
      <SimpleGrid columns={Math.sqrt(playerCount)} spacing={2}>
        {gridData.map((value, index) => (
          <Input key={index} value={value} onChange={(e) => handleInputChange(index, e.target.value)} placeholder="Enter a letter" />
        ))}
      </SimpleGrid>
      <Button onClick={startGame} mt={4} colorScheme="blue">
        Start Game
      </Button>
    </VStack>
  );
};

export default Index;
