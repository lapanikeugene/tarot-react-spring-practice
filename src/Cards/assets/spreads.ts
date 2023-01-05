import { dispatchCommand } from "./dispatchCommands"

export const spreadsDB:{[key:string]: any} =
    {
        "one card":{
            title:"Card of the day",
            description:"Simple tarot layout that can say you about next day, or answer yes/no to the question",
            position:[{
                x:350,
                y:300,
                desc:'card of the day'
            }]
        },
        "three cards":{
            title:"3 Cards",
            description:"3 cards tarot layout, that that predict future, and shows reasons of questions",
            position:[{
                x:150,
                y:200,
                desc:'Previous/Reason'
            },{
                x:350,
                y:200,
                desc:'Today'
            },{
                x:550,
                y:200,
                desc:'result/Future'
            }]
        },
        "celtic cross":{
            title:"Celtic Cross",
            description:"The Celtic Cross spread is classic Tarot readings of all time, explain question from different sides",
            position:[{
                x:150,
                y:400,
                desc:'You'
            },{
                x:150,
                y:400,
                rotate:90,
                desc:'The Challange'
            },{
                x:-50,
                y:400,
                desc:'The Past'
            },{
                x:350,
                y:400,
                desc:'The Future'
            },{
                x:150,
                y:150,
                desc:'Aspiration'
            },{
                x:150,
                y:650,
                desc:'Underlying feelings'
            },{
                x:600,
                y:760,
                desc:'Advice'
            },{
                x:600,
                y:550,
                desc:'External Influences'
            },{
                x:600,
                y:340,
                desc:'Hopes And/Or Fears'
            },{
                x:600,
                y:130,
                desc:'Outcome'
            }]
        }


    }
