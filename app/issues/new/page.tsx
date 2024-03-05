"use client";

import "easymde/dist/easymde.min.css";

import { AiFillAlert, AiFillExclamationCircle } from "react-icons/ai";
import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  TextField,
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

// import SimpleMDE from "react-simplemde-editor"; // This import produces "ReferenceError: navigator is not defined"

// This is needed to avoid "ReferenceError: navigator is not defined"
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
