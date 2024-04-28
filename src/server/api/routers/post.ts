import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.post.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  deletePost: publicProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.delete({
        where: { id: input.postId },
      });
      return true;
    }),

  updatePost: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
      return true;
    }),

  listPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
});
