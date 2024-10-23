import { pinoLogger as logger } from "hono-pino"
import Pino from 'pino';
import pretty from "pino-pretty"
import env from "@/env"

export function pinoLogger() {
    return logger({
        pino: Pino({
            level: env.LOG_LEVEL || "info"
        },
            env.NODE_ENV === "production" ? undefined : pretty()),
        http: {
            // give unique random id to each request
            reqId: () => crypto.randomUUID()
        }
    });
} 
