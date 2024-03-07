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
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { issueSchema } from "@/app/validationSchemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// interface IssueForm {
//   title: string;
//   description: string;
// }

// This is the same as the commented out interface above
type IssueFormType = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (formData: IssueFormType) => {
    try {
      setIsSubmitting(true);
      //If issue exists, it means we are editing an existing issue.
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, formData);
      } else {
        await axios.post("/api/issues", formData);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-5">
          <CalloutIcon>
            <AiFillExclamationCircle />
          </CalloutIcon>
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}&nbsp;
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
