import { useCallback, useState } from "react";
import { repositoryStorageService } from "../data-access/repository-storage.service";
import cloneDeep from "lodash.clonedeep";

export type Columns = {
  column1: string[];
  column2: string[];
  column3: string[];
};

export type MoveToColumnCallback = (props: {
  name: string;
  destination: keyof Columns;
  current: keyof Columns;
}) => void;

type Props = {
  owner: string;
  repo: string;
  initialValue: Columns;
};

function updateColumns(
  prevColumns: Columns,
  name: string,
  destination: keyof Columns,
  origin: keyof Columns,
  owner: string,
  repo: string
) {
  const newColumns = cloneDeep(prevColumns);
  // remove from current column
  const filtered = newColumns[origin].filter((n) => name !== n);
  newColumns[origin] = [...filtered];
  // add to destination column
  const added = newColumns[destination].concat(name);
  newColumns[destination] = [...added];
  repositoryStorageService.saveRepositoryToStorage(owner, repo, newColumns);
  return newColumns;
}

export function useColumnsState({ initialValue, owner, repo }: Props) {
  const [columns, setColumns] = useState(initialValue);

  const moveToColumn: MoveToColumnCallback = useCallback(
    ({ name, destination, current: origin }) => {
      setColumns((prevColumns) =>
        updateColumns(prevColumns, name, destination, origin, owner, repo)
      );
    },
    [columns]
  );

  return {
    column1: columns.column1,
    column2: columns.column2,
    column3: columns.column3,
    moveToColumn,
  };
}
