"use client";

import "easymde/dist/easymde.min.css";

import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  TextField,
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";

import { AiFillExclamationCircle } from "react-icons/ai";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { createIssueSchema } from "@/app/validationSchemas";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// import SimpleMDE from "react-simplemde-editor"; // This import produces "ReferenceError: navigator is not defined"

// This is needed to avoid "ReferenceError: navigator is not defined"
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface IssueForm {
//   title: string;
//   description: string;
// }

// This is the same as the commented out interface above
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-5">
          <CalloutIcon>
            <AiFillExclamationCircle />
          </CalloutIcon>
          <CalloutText> {error}</CalloutText>
        </CalloutRoot>
      )}

      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (formData) => {
          try {
            setIsSubmitting(true);
            await axios.post("/api/issues", formData);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occurred. Please try again.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
