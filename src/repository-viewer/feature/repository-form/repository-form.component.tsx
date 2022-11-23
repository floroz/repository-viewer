import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type Props = {};

type FormValues = {
  repositoryURI: string;
};

import { useForm } from "react-hook-form";

export const RepositoryForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = ({ repositoryURI }: FormValues) => {
    alert(JSON.stringify(repositoryURI));
  };

  return (
    <div>
      <div>Logo</div>
      <div>
        <h1>Title</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>
              <Input
                type="text"
                placeholder="https://"
                {...register("repositoryURI", { required: true })}
              />
            </FormLabel>
            <FormErrorMessage>
              {errors.repositoryURI && errors.repositoryURI.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};
