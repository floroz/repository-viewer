import {
  Box,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  TagRightIcon,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ArrowBackIcon, ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
import { memo } from "react";
import { Repository } from "../../types/repository";

type Props = {
  repository: Repository | null;
  onGoBack: () => void;
};

export const RepositoryEditor = memo(({ repository, onGoBack }: Props) => {
  if (!repository) {
    return <Box>No Repository Data</Box>;
  }

  return (
    <Box w="100%">
      <Flex justify="space-between" mb="16">
        <Box>
          <IconButton
            aria-label="Go Back to Repo search"
            onClick={onGoBack}
            icon={<ArrowBackIcon />}
          />
        </Box>
        <Heading>{repository.name}</Heading>
        <Box>
          <StarIcon />
        </Box>
      </Flex>
      <Box as="main">
        <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap="8">
          <GridItem>
            <Text>in progress (6)</Text>
            <List>
              {repository.branches.map((branch: any) => (
                <ListItem>
                  <Flex
                    h="4rem"
                    w="16rem"
                    p="4"
                    display="flex"
                    bgColor="gray.200"
                    mb="4"
                    align="center"
                  >
                    <Text flexBasis="80%">{branch.name}</Text>
                    <Icon as={ChevronRightIcon} justifySelf="flex-end" />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </GridItem>
          <GridItem>
            <Text>in progress (6)</Text>
            <List>
              {repository.branches.map((branch: any) => (
                <ListItem>
                  <Flex
                    h="4rem"
                    w="16rem"
                    p="4"
                    display="flex"
                    bgColor="gray.200"
                    mb="4"
                    align="center"
                  >
                    <Text flexBasis="80%">{branch.name}</Text>
                    <Icon as={ChevronRightIcon} justifySelf="flex-end" />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </GridItem>
          <GridItem>
            <Text>in progress (6)</Text>
            <List>
              {repository.branches.map((branch: any) => (
                <ListItem>
                  <Flex
                    h="4rem"
                    w="16rem"
                    p="4"
                    display="flex"
                    bgColor="gray.200"
                    mb="4"
                    align="center"
                  >
                    <Text flexBasis="80%">{branch.name}</Text>
                    <Icon as={ChevronRightIcon} justifySelf="flex-end" />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
});
