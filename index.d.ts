import { FastifyPlugin } from "fastify";

export const fastifyBlocklist: FastifyPlugin<NonNullable<{
	blocklist?: string[],
	error?: {
		handler?: (req: any, res: any: next: any) => void,
		code?: number,
		body?: any,
	}
}>>;

export default fastifyBlocklist;
