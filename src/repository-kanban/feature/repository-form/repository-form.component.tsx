import { memo, useEffect } from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const FORM_FIELD_REPOSITORY_ID = "repositoryURI";

type Props = {
  onSubmit: (uri: string) => Promise<void>;
  error: string | null;
  onSuccess?: () => void;
};

type FormValues = {
  repositoryURI: string;
};

export const RepositoryForm = memo(({ onSubmit, error, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (error) {
      setError("repositoryURI", {
        message: error,
      });
    }

    if (!error) {
      clearErrors();
    }
  }, [error]);

  const onSubmitHandler = async ({ repositoryURI }: FormValues) => {
    try {
      await onSubmit(repositoryURI);
      onSuccess?.();
    } catch (error) {}
  };

  return (
    <div>
      <div>Logo</div>
      <div>
        <h1>Title</h1>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormControl>
            <FormLabel>
              <Input
                type="text"
                placeholder="https://"
                {...register(FORM_FIELD_REPOSITORY_ID, { required: true })}
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
});
