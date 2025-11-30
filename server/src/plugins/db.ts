import fp from "fastify-plugin";
import { PrismaClient } from "../../generated/prisma";

declare module "fastify" {
	interface FastifyInstance {
		db: PrismaClient;
	}
}

const dbPlugin = fp(async (fastify) => {
	const prisma = new PrismaClient();
	fastify.decorate("db", prisma);
	fastify.addHook("onClose", async () => {
		await prisma.$disconnect();
	});
});

export default dbPlugin;
