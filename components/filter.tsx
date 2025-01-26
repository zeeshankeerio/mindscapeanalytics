import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

interface FilterProps {
  categories: string[]
  onFilterChange: (category: string) => void
  activeCategory: string
}

export function Filter({
  categories,
  onFilterChange,
  activeCategory,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => onFilterChange(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
