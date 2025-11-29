"use client"

import { motion } from "framer-motion"

export default function Logo() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex items-center space-x-2">
      <div className="relative w-10 h-10">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top red nodes */}
          <motion.div
            className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
          />

          {/* Center squares */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rotate-45"
            animate={{ rotate: [45, 90, 45] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-gray-700 rotate-45"
            animate={{ rotate: [45, 0, 45] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Bottom nodes */}
          <motion.div
            className="absolute bottom-0 left-1/4 w-2 h-2 bg-gray-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-2 h-2 bg-gray-800 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          />

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.path
              d="M 4 4 L 8 8 L 12 4"
              stroke="rgba(255, 0, 0, 0.5)"
              strokeWidth="0.5"
              fill="none"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.path
              d="M 4 12 L 8 8 L 12 12"
              stroke="rgba(75, 75, 75, 0.5)"
              strokeWidth="0.5"
              fill="none"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />
          </svg>
        </motion.div>
      </div>

      <div className="flex flex-col">
        <motion.span
          className="text-lg font-bold tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          MINDSCAPE
        </motion.span>
        <motion.span
          className="text-xs text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ANALYTICS
        </motion.span>
      </div>
    </motion.div>
  )
}

