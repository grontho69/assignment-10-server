const { z } = require('zod');

const createIssueSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        category: z.string().min(1, "Category is required"),
        description: z.string().min(1, "Description is required"),
        amount: z.number().min(0, "Amount must be zero or positive"),
        status: z.string().optional().default('Pending'),
        email: z.string().email("Invalid email address"),
        location: z.string().min(1, "Location is required"),
        image: z.string().min(1, "Image is required"),
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
