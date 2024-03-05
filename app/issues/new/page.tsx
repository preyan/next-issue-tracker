"use client";

import "easymde/dist/easymde.min.css";

import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";

import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (formData) => {
        await axios.post("/api/issues", formData);
        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register("title", { required: true })}
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
  );
};

export default NewIssuePage;
