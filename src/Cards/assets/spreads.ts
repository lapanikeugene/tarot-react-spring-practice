import { dispatchCommand } from "./dispatchCommands"

export const spreadsDB:{[key:string]: any} =
    {
        "one card":{
            title:"Card of the day",
            description:"Simple tarot spread that can say you about next day",
            position:[{
                x:50,
                y:50,
                desc:'card of the day'
            }]
        },
        "three cards":{
            title:"3 Cards",
            description:"3 cards tarot spread, that that predict future, and shows reasons of questions",
            position:[{
                x:50,
                y:50,
                desc:'Previous/Reason'
            },{
                x:50,
                y:150,
                desc:'Today'
            },{
                x:50,
                y:250,
                desc:'result/Future'
            }]
        }


    }
