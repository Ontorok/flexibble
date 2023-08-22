"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { categoryFilters } from "@/constant";

type Props = {};

const Categories = (props: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");

  const handleTag = (category: string) => {
    router.push(`${pathName}?category=${category}`);
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((category) => (
          <button
            key={category}
            type="button"
            className={`${
              categoryParam === category ? "bg-light-white-300 font-medium" : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            onClick={() => handleTag(category)}
          >
            {category}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
