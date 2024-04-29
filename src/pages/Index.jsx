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
      <Button leftIcon={<FaLock />} colorScheme="green" onClick={() => handleGameSelection("Vault Game")}>
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
        return <VaultGame />;
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
      let currentPlayers = gridData.length;
      const rounds = 4;
      const interval = setInterval(() => {
        const playersToRemove = Math.ceil(currentPlayers / (rounds - (rounds - (currentPlayers % rounds))));
        const newGridData = [...gridData];
        for (let i = 0; i < playersToRemove; i++) {
          const randomIndex = Math.floor(Math.random() * newGridData.length);
          newGridData.splice(randomIndex, 1);
        }
        setGridData(newGridData);
        currentPlayers -= playersToRemove;
        if (currentPlayers === 1) {
          clearInterval(interval);
          alert("Game Over. Winner is the last remaining player!");
        }
      }, 1000);
    }
  };

  return (
    <VStack>
      <Input placeholder="Enter number of players" onChange={handlePlayerCountChange} type="number" />
      <Box border="2px" borderColor="white" p={4}>
        <SimpleGrid columns={Math.sqrt(playerCount)} spacing={2}>
          {gridData.map((value, index) => (
            <Box border="1px" borderColor="gray.200" p={2}>
              <Input key={index} value={value} onChange={(e) => handleInputChange(index, e.target.value)} placeholder="Enter a letter" />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Button onClick={startGame} mt={4} colorScheme="blue">
        Start Game
      </Button>
    </VStack>
  );
};

const VaultGame = () => {
  const [digits, setDigits] = useState([]);
  const [actualNumber, setActualNumber] = useState("1178");
  const [triesLeft, setTriesLeft] = useState(actualNumber.length - 1);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [fact, setFact] = useState("The longest street in the world is Yonge street in Toronto Canada measuring 1,178 miles");

  const handleDigitInput = (index, value) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (newDigits.join("") === actualNumber) {
      setVaultOpen(true);
    } else {
      setTriesLeft(triesLeft - 1);
    }
  };

  return (
    <VStack>
      {digits.map((digit, index) => (
        <Input key={index} value={digit} isReadOnly={digit === actualNumber[index]} onChange={(e) => handleDigitInput(index, e.target.value)} type="number" bg={digit === actualNumber[index] ? "green.200" : "transparent"} />
      ))}
      <Button onClick={() => setDigits(Array(actualNumber.length).fill(""))} colorScheme="red">
        Reset
      </Button>
      {vaultOpen && <Text>{fact}</Text>}
    </VStack>
  );
};

export default Index;
