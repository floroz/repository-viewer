import { memo } from "react";

type Props = {
  branches: null | any;
};

export const RepositoryEditor = memo(({ branches }: Props) => {
  console.log(branches);
  return <div>Editor</div>;
});
