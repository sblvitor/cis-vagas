import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const addEmployees = mutation({
    args: {
        employees: v.array(
            v.object({
                name: v.string(),
                licensePlate: v.optional(v.string())
            })
        )
    },
    handler: async (ctx, args) => {
        const lastEmployee = await ctx.db
            .query("employees")
            .withIndex("by_position")
            .order("desc") // Do maior para o menor
            .first()

        let currentMaxPosition = lastEmployee ? lastEmployee.position : 0

        for(const employee of args.employees) {
            currentMaxPosition++

            await ctx.db.insert('employees', { 
                name: employee.name,
                licensePlate: employee.licensePlate,
                active: true,
                position: currentMaxPosition
            })
        }
    }
})

export const getEmployees = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("employees").collect()
    }
})