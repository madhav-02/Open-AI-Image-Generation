import {surpriseMePrompts} from "../constants";
import FileSaver from 'file-saver';
export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length )
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt)    // Just to make sure that no two successive calls get the same prompt.
        getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`); // (actualphoto, name to be saved as for that photo)
    
}