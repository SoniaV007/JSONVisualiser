import React from 'react'

const jsonValidator = ({jsonString}) => {

    if(!jsonString.trim()){
        throw new Error("JSON is empty string");
    }

    try{
        const parsed = JSON.parse(jsonString.trim());
        if(typeof parsed === 'object' && Object.keys(parsed).length === 0) {
            if(Array.isArray(parsed)){
                throw new Error("JSON is empty array");
            }
            else{
                throw new Error("JSON is empty object");
            }
        }

        return parsed;
    }
    catch (error){
        throw new Error(`Invalid JSON: ${error.message}`);
    }

}

export default jsonValidator