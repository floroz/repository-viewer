import { useState } from "react";

export type Columns = {
  column1: string[];
  column2: string[];
  column3: string[];
};

export type Branch = {
  name: string;
};

export type MoveToColumnCallback = (props: {
  name: string;
  destination: keyof Columns;
  current: keyof Columns;
}) => void;

export function useColumnsState(branches: Branch[]) {
  const [columns, setColumns] = useState<Columns>({
    column1: branches.map(({ name }) => name),
    column2: [],
    column3: [],
  });

  const moveToColumn: MoveToColumnCallback = ({
    name,
    destination,
    current: origin,
  }) => {
    setColumns((state) => {
      console.log(`Moving ${name} from ${origin} to ${destination}`);
      // remove from current column
      const filtered = state[origin].filter((n) => name !== n);
      state[origin] = [...filtered];
      // add to destination column
      const added = state[destination].concat(name);
      state[destination] = [...added];

      return { ...state };
    });
  };

  return {
    column1: columns.column1,
    column2: columns.column2,
    column3: columns.column3,
    moveToColumn,
  };
}
