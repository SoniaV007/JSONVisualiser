const treeConverter = (parsedData, searchPath = null) => {
    const nodes = [];
    const edges = [];

    let nodeIdCount = 0;

    const generateID = () => { return `node-${nodeIdCount++}`};

    const processValue = (value, key, parentId = null, depth = 0, currentPath = '') => {
        const nodeId = generateID();
        let label = key;
        let nodeType = "";
        let backgroundColor = "";

        let nodePath = currentPath;
        if(parentId === null || key === 'JSON') {
            nodePath = '$';
        } else if(key.match(/^\d+$/)) {
            nodePath = currentPath + `[${key}]`;
        } else {
            nodePath = currentPath + (currentPath === '$' ? '.' : '.') + key;
        }

        const isMatch = searchPath && nodePath === searchPath;

        if(value === null){
            label = `${key}: null`;
            nodeType = "primitive";
            backgroundColor = "#E879F9";
        } else if(Array.isArray(value)){
            label = `${key}`;
            nodeType = "array";
            backgroundColor = "#A855F7";
        } else if(typeof value === 'object'){
            label = key;
            nodeType = "object";
            backgroundColor = "#7C3AED";
        } else{
            label = `${key}: ${value}`;
            nodeType = "primitive";
            backgroundColor = "#E879F9";
        }

        const node = {
            id : nodeId,
            data : {
                label : label,
                nodeType: nodeType,
                path: nodePath
            },
            position: {x: depth*250, y: nodeIdCount*80},
            style: {
                background: isMatch
                    ? 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)'
                    : `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`,
                color: "white",
                padding: "12px 16px",
                borderRadius: "12px",
                border: isMatch
                    ? "2px solid #FBBF24"
                    : "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "13px",
                fontWeight: "500",
                boxShadow: isMatch
                    ? "0 0 20px rgba(251, 191, 36, 0.6), 0 8px 16px rgba(0, 0, 0, 0.3)"
                    : "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
                backdropFilter: "blur(10px)",
                maxWidth: "220px",
                wordWrap: "break-word",
                whiteSpace: "normal",
                minWidth: "100px"
            }
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
                    const childResult = processValue(item, `${index}`, nodeId, depth+1, nodePath);
                    if(childResult.path === searchPath && !matchedNode) {
                        matchedNode = childResult;
                    }
                });
            } else{
                Object.entries(value).forEach(([childrenKey, childrenValue]) => {
                    const childResult = processValue(childrenValue, childrenKey, nodeId, depth+1, nodePath);
                    if(childResult.path === searchPath && !matchedNode) {
                        matchedNode = childResult;
                    }
                });
            }
        }

        return { nodeId, path: nodePath, position: node.position };
    };

    let matchedNode = null;

    if(typeof parsedData === 'object' && parsedData !== null){
        if(Array.isArray(parsedData)) {
            const result = processValue(parsedData, 'JSON', null, 0, '$');
            if(result.path === searchPath) {
                matchedNode = result;
            }
        } else{
            const rootId = generateID();
            const isRootMatch = searchPath === '$';

            const rootNode = {
                id: rootId,
                data: {
                    label: 'JSON',
                    nodeType: 'object',
                    path: '$'
                },
                position: { x: 0, y: 0 },
                style: {
                    background: isRootMatch
                        ? 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)'
                        : 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                    color: 'white',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: isRootMatch
                        ? '2px solid #FBBF24'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    boxShadow: isRootMatch
                        ? '0 0 20px rgba(251, 191, 36, 0.6), 0 10px 20px rgba(139, 92, 246, 0.4)'
                        : '0 10px 20px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                    backdropFilter: 'blur(10px)'
                }
            };

            nodes.push(rootNode);

            if(isRootMatch) {
                matchedNode = { nodeId: rootId, path: '$', position: { x: 0, y: 0 } };
            }

            Object.entries(parsedData).forEach(([key, value]) => {
                const result = processValue(value, key, rootId, 1, '$');
                if(result.path === searchPath && !matchedNode) {
                    matchedNode = result;
                }
            });
        }
    }
    else {
        const rootId = generateID();
        const isRootMatch = searchPath === '$';

        const rootNode = {
            id: rootId,
            data: {
                label: 'JSON',
                nodeType: 'object',
                path: '$'
            },
            position: { x: 0, y: 0 },
            style: {
                background: isRootMatch
                    ? 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)'
                    : 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                color: 'white',
                padding: '14px 20px',
                borderRadius: '12px',
                border: isRootMatch
                    ? '2px solid #FBBF24'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '15px',
                fontWeight: 'bold',
                boxShadow: isRootMatch
                    ? '0 0 20px rgba(251, 191, 36, 0.6), 0 10px 20px rgba(139, 92, 246, 0.4)'
                    : '0 10px 20px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                backdropFilter: 'blur(10px)'
            }
        };

        nodes.push(rootNode);

        if(isRootMatch) {
            matchedNode = { nodeId: rootId, path: '$', position: { x: 0, y: 0 } };
        }

        const result = processValue(parsedData, 'value', rootId, 1, '$');
        if(result.path === searchPath && !matchedNode) {
            matchedNode = result;
        }
    }

    return { nodes, edges, matchedNode };
}

export default treeConverter