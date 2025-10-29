import React from 'react'

const treeConverter = (parsedData) => {
    const nodes = [];
    const edges = [];

    let nodeIdCount = 0;

    const generateID = () => { return `node-${nodeIdCount++}`};

    const processValue = (value, key, parentId = null, depth = 0) => {
        const nodeId = generateID();
        let label = key;

        if(value === null){
            label = `${key}: null`;
        } else if(Array.isArray(value)){
            label = `${key}: (array)`;
        } else if(typeof value === 'object'){
            label = key;
        } else{
            label = `${key}: ${value}`;
        }

        const node = {
            id : nodeId,
            data : {label : label},
            position: {x: depth*250, y: nodeIdCount*80}
        };

        nodes.push(node);

        if(parentId !== null){
            const edge = {
                id: `edge-${parentId}-${nodeId}`,
                source: parentId,
                target: nodeId,
                animated: true
            };
            edges.push(edge);
        }

        if(value !== null && typeof value === 'object'){
            if(Array.isArray(value)){
                value.forEach((item, index) =>{
                    processValue(item, `[${index}]`, nodeId, depth+1);
                });
            } else{
                Object.entries(value).forEach(([childrenKey, childrenValue]) => {
                    processValue(childrenValue, childrenKey, nodeId,depth+1);
                });
            }
        }

        return nodeId;
    };

    if(typeof parsedData === 'object' && parsedData !== null){
        if(Array.isArray(parsedData)) {
            processValue(parsedData, 'root', null, 0);
        } else{
            Object.entries(parsedData).forEach(([key, value]) => {
                processValue(value, key, null, 0);
            });
        } 
    }
    else {
        processValue(parsedData, 'value' , null, 0);
    }

    return {nodes, edges};
}

export default treeConverter