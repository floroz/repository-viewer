import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ArrowBackIcon, StarIcon } from "@chakra-ui/icons";
import { memo } from "react";
import { Repository } from "../../types/repository";

import { useColumnsState } from "../../hooks/use-columns-state.hook";
import { DroppableList } from "./draggable-item.component";

type ViewProps = Props & {
  repository: Repository;
};

const displayStarsCount = (stars: number) =>
  stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars;

const RepositoryEditorView = memo(({ repository, onGoBack }: ViewProps) => {
  const { column1, column2, column3, moveToColumn } = useColumnsState(
    repository?.branches ?? []
  );

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
        <Flex align="center">
          <Text size="sm" mr="2">
            {displayStarsCount(repository.stars)}
          </Text>
          <StarIcon />
        </Flex>
      </Flex>
      <Box as="main">
        <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap="8">
          <GridItem>
            <Text>In progress ({column1.length})</Text>
            <DroppableList
              branches={column1}
              onMove={moveToColumn}
              columnId="column1"
            />
          </GridItem>
          <GridItem>
            <Text>Review ({column2.length})</Text>
            <DroppableList
              branches={column2}
              onMove={moveToColumn}
              columnId="column2"
            />
          </GridItem>
          <GridItem>
            <Text>Ready to merge ({column3.length})</Text>
            <DroppableList
              branches={column3}
              onMove={moveToColumn}
              columnId="column3"
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
});

type Props = {
  repository: Repository | null;
  onGoBack: () => void;
};

export const RepositoryEditor = ({ onGoBack, repository }: Props) => {
  if (!repository) {
    return <Box>No Repository Data</Box>;
  }

  return <RepositoryEditorView onGoBack={onGoBack} repository={repository} />;
};
