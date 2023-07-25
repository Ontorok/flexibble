"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constant";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: "create" | "update";
  session: SessionInterface;
};

type initialState = {
  image: string;
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

const ProjectForm = ({ session, type }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setform] = useState<initialState>({
    image: "",
    title: "Flexibble",
    description: "Flexibble Description",
    liveSiteUrl: "https://mysite.com",
    githubUrl: "https://mysite.com",
    category: "Frontend",
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();
    console.log(token);

    try {
      if (type === "create") {
        // Create Project
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      } else {
        // Update Project
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) return alert("Please upload an image file");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: keyof typeof form, value: string) => {
    setform((form) => ({
      ...form,
      [fieldName]: value,
    }));
  };

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

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={isSubmitting ? (type === "create" ? "Creating" : "Updating") : type === "create" ? "Create" : "Update"}
          type="submit"
          leftIcon="/plus.svg"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
