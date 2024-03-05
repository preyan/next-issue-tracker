"use client";

import "easymde/dist/easymde.min.css";

import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";

import { AiFillExclamationCircle } from "react-icons/ai";
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

  return (
    <div className="max-w-xl space-y-3 ">
      {error && (
        <CalloutRoot color="red">
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
            await axios.post("/api/issues", formData);
            router.push("/issues");
          } catch (error) {
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
