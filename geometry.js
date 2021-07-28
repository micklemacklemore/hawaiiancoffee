export default {
    // TODO: Figure out how async function works and how promises work. 
    // but this will do for now.
    objText: async function (path) {
        const response = await fetch(path);  
        const text = await response.text();
        return text;
    }
}