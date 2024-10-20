
import { SERVER_LOG_LEVEL } from '$env/static/private';
import pino from 'pino';
import pretty from "pino-pretty";

const stream = pretty({
    levelFirst: true,
    colorize: true,
});

let options: pino.LoggerOptions = {
    level: SERVER_LOG_LEVEL || 'debug',
};

export const logger = pino(options, stream);

export const infoLog = (message: string, context: any = {}) => logger.info({message, context})
export const errorLog = (message: string, code: number, context: any = {}) => logger.error({message, code, context})
export const warnLog = (message: string, context: any = {}) => logger.warn({message, context})