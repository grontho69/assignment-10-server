const { z } = require('zod');

const createIssueSchema = z.object({
    body: z.object({
        title: z.string().min(5, "Title must be at least 5 characters"),
        category: z.string().min(2, "Category is required"),
        description: z.string().min(10, "Description must be at least 10 characters"),
        amount: z.number().positive("Amount must be a positive number"),
        status: z.enum(['Pending', 'Approved', 'Rejected']).optional().default('Pending'),
        email: z.string().email("Invalid email address"),
        location: z.string().optional(),
        image: z.string().url("Invalid image URL"),
        userName: z.string().min(1, "User name is required"),
        userPhoto: z.string().optional(),
    })
});

const updateIssueSchema = z.object({
    params: z.object({
        id: z.string().length(24, "Invalid Issue ID format")
    }),
    body: z.object({
        title: z.string().min(5).optional(),
        category: z.string().min(2).optional(),
        description: z.string().min(10).optional(),
        amount: z.number().positive().optional(),
        status: z.enum(['Pending', 'Approved', 'Rejected']).optional(),
    })
});

module.exports = {
    createIssueSchema,
    updateIssueSchema
};
