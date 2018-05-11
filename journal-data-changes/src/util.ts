/**
 * Common utility functionality.
 */
import * as winston from 'winston';

/**
 * Get a logger to use.
 * 
 * The logger is for the console, includes timestamps, the module name and coloured log levels.
 * 
 * @param name      The name of the module
 * @param logLevel  The log level to set (silly, debug, info, warning, error)
 */
export function getLogger(name: string, logLevel: string): winston.LoggerInstance {
    winston.loggers.add(name, {
    console: {
        level: logLevel,
        colorize: true,
        label: name,
        timestamp: true
    }
    });

    return winston.loggers.get(name);
}