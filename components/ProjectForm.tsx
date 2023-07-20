"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent, FormEvent } from "react";
import FormField from "./FormField";

type Props = {
  type: "create" | "update";
  session: SessionInterface;
};

const ProjectForm = ({ session, type }: Props) => {
  const form = {
    image: null,
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleStateChange = (fieldName: keyof typeof form, value: string) => {};

  return (
    <form className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="poster"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleImageChange}
        />
        {form.image && <Image src={form?.image} className="sm:p-10 object-contain z-20" alt="Project Poster" fill />}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://yoursite.domain"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://githubname.github.com"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />

      {/* Custom Category */}
      <div className="flexStart w-full">
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
