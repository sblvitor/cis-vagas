import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    config: defineTable({
        totalSpots: v.number(),
        rotationGenerated: v.boolean(),
        generatedUntil: v.optional(v.string()),
        updatedAt: v.number()
    }),

    employees: defineTable({
        name: v.string(),
        position: v.number(),
        licensePlate: v.optional(v.string()),
        active: v.boolean(),
        createdAt: v.number()
    })
        .index("by_position", ['position'])
        .index("by_active", ['active'])
        .index("by_name", ['name']),
    
    dailySchedule: defineTable({
        date: v.string(),
        startPosition: v.number(),
        endPosition: v.number(),
        spots: v.array(
            v.object({
                position: v.number(),
                employee: v.string(),
                licensePlate: v.optional(v.string())
            })
        ),
        weekDay: v.number() // 0-6 (Sunday - Saturday)
    })
        .index("by_date", ['date'])
        .index("by_position_range", ['startPosition', 'endPosition'])
})