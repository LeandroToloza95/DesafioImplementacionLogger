import winston from 'winston';
import config from './config.js'


const customeLevel = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5

    },
    colors:{
        fatal:"red",
        error:"magenta",
        warning:"yellow",
        info:"green",
        http:"blue",
        debug:"grey"
    }
}

export let logger

if (config.enviroment === 'production') {
    logger = winston.createLogger({
        levels: customeLevel.levels,
        transports:[
            new winston.transports.File({
                filename:'./errors.log',
                level:'error',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                )
            }),
            new winston.transports.Console({
                level:"info",
                format: winston.format.combine(
                    winston.format.colorize({colors:customeLevel.colors}),
                    winston.format.simple()
                )
            })
        ]
    })
} else{
    logger = winston.createLogger({
        levels: customeLevel.levels,
        transports:[
            new winston.transports.File({
                filename:'./errors.log',
                level:'error',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                )
            }),
            new winston.transports.Console({
                level:"debug",
                format: winston.format.combine(
                    winston.format.colorize({colors:customeLevel.colors}),
                    winston.format.simple()
                )
            })
        ]
    })
}