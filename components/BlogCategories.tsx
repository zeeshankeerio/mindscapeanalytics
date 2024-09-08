import Link from "next/link"

import { Category } from "@/types/postTypes"

export default function BlogCategories({
  selectedCategory,
  categories,
}: {
  selectedCategory: string
  categories: Category[]
}) {
  return (
    <section>
      <h3 className="text-primary text-md mb-4 font-mono font-bold">
        Categories:
      </h3>
      <ul className="grid grid-cols-2 gap-y-4 text-sm md:grid-cols-4 lg:grid-cols-6">
        <li className="transition-colors duration-300">
          <Link
            href={`/blogs/?category=&page=1`}
            className={
              !selectedCategory
                ? "text-secondary-foreground font-normal"
                : "text-primary font-bold"
            }
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category._id} className="">
            <Link
              href={`/blogs/?category=${encodeURIComponent(
                category.slug.current
              )}&page=1`}
              className={
                selectedCategory === category.slug.current
                  ? "text-primary font-bold"
                  : ""
              }
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
