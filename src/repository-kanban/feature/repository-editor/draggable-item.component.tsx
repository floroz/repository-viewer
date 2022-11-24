import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Icon, List, ListItem, Text } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import {
  Columns,
  MoveToColumnCallback,
} from "../../hooks/use-columns-state.hook";

const ITEM_TYPE = "BRANCH";

export const DroppableList = ({
  branches,
  onMove,
  columnId,
}: {
  branches: string[];
  onMove: MoveToColumnCallback;
  columnId: keyof Columns;
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item: any) => item.origin !== columnId,
    drop(item: any) {
      onMove({
        destination: columnId,
        name: item.name,
        current: item.origin,
      });
    },
  }));

  return (
    <List
      minHeight="36rem"
      ref={drop}
      bgColor={isOver && canDrop ? "gray.200" : "unset"}
    >
      {branches.map((name) => (
        <DraggableBranchTag name={name} key={name} columnId={columnId} />
      ))}
      {canDrop && <Text>"Release to drop"</Text>}
    </List>
  );
};

export const DraggableBranchTag = ({
  name,
  columnId,
}: {
  name: string;
  columnId: keyof Columns;
}) => {
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: ITEM_TYPE,
      item: { name, origin: columnId },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <ListItem
      ref={drag}
      style={{ opacity, cursor: isDragging ? "grabbing" : "grab" }}
    >
      <Flex
        h="4rem"
        w="16rem"
        p="4"
        display="flex"
        bgColor="gray.200"
        mb="4"
        align="center"
      >
        <Text flexBasis="80%">{name}</Text>
        <Icon as={ChevronRightIcon} justifySelf="flex-end" />
      </Flex>
    </ListItem>
  );
};
