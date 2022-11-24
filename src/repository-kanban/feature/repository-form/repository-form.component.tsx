import { memo, useEffect } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const FORM_FIELD_REPOSITORY_ID = "repositoryURI";

type Props = {
  onSubmit: (uri: string) => Promise<void>;
  error: string | null;
};

type FormValues = {
  repositoryURI: string;
};

export const RepositoryForm = memo(({ onSubmit, error }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (error) {
      setError("repositoryURI", {
        message: error,
      });
      return;
    }

    if (!error) {
      clearErrors();
      return;
    }
  }, [error]);

  const onSubmitHandler = handleSubmit(async ({ repositoryURI }: FormValues) =>
    onSubmit(repositoryURI)
  );

  return (
    <Flex padding="32" gap="2rem">
      <Box flexBasis="30%">
        <Heading size="lg">CodeSandbox</Heading>
      </Box>
      <Box flexGrow="1">
        <Heading size="4xl" mb="4rem">
          Start by Pasting the RepositoryURL
        </Heading>
        <form onSubmit={onSubmitHandler} noValidate>
          <Flex>
            <FormControl isInvalid={!!errors.repositoryURI}>
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
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
});
