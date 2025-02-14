import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";
import { useState } from "react";
import '../CSS/SimpleFilter.css';

const client = generateClient<Schema>();

const SimpleFilter = (props: any) => {
    const [query, setQuery] = useState('');

    const handleFilter = async () => {
        const results = await filter(query);
        props.filterTodos(results);
    };

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleFilter();
        }
    };

    const clearFilter = async () => {
        setQuery('')
        props.clearTodos();
    }

    const filter = async (q: string) => {

        const json = await client.models.Todo.list({
            filter: {
                or: [
                    {
                        folderName: {
                            contains: q
                        }
                    },
                    {
                        subFolderName: {
                            contains: q
                        }
                    },
                    {
                        range: {
                            contains: q
                        }
                    },
                    {
                        category: {
                            contains: q
                        }
                    },
                    {
                        filePath: {
                            contains: q
                        }
                    },
                    {
                        area: {
                            contains: q
                        }
                    },
                    {
                        year: {
                            contains: q
                        }
                    },
                    {
                        protocolNo: {
                            contains: q
                        }
                    },
                    {
                        buildingBlock: {
                            contains: q
                        }
                    },
                    {
                        aproovalNo: {
                            contains: q
                        }
                    },
                ]
            }
        });
        //console.log( client.models.Todo.list())
        console.log(json.data);
        return json.data;
    };
    return (
        <div className='simple-filter'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for anything..."
            />
            <button onClick={handleFilter}>Search</button>
            <button className="clear-button" onClick={clearFilter}>Clear</button>
        </div>
    );
};

export default SimpleFilter;