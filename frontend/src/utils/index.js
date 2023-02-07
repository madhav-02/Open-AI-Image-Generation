import {surpriseMePrompts} from "../constants";

export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length )
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt)    // Just to make sure that no two successive calls get the same prompt.
        getRandomPrompt(prompt);

    return randomPrompt;
}