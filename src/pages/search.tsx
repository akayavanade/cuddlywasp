import React, { KeyboardEvent, useEffect, useState } from 'react';

const SearchPage = (): JSX.Element => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Array<Doc>>([]);

    useEffect(() => {

    }, []);

    const indexUrl = 'https://ss758201-kycc1l2x-eastus-azure.searchstax.com/solr/mmpoc-995/emselect';
    var indexUsername = 'app995-api';
    var indexPassword = 'Rerfhtre1!';

    const search = async (e: KeyboardEvent<HTMLInputElement>) => {

        const url = `${indexUrl}?q=${query}&language=en`;
        if (e.key === 'Enter') {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${btoa(`${indexUsername}:${indexPassword}`)}`
                }
            });
            const data: RootObject = await response.json();
            setResults(data.response.docs);
        }
    };

    return (
        <>
            <div className='row' style={{ marginTop: '50px' }}>
                <div className='col-md-3'>
                    Facets go here
                </div>
                <div className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <input type={'text'}
                                style={{ width: '200px' }}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={search} />
                        </div>
                        <div className='col-md-12'>
                            {results.length > 0 && results.map((result) => {
                                return (
                                    <div key={result.resulturl_s} style={{ border: '1px solid black', margin: '10px' }}>
                                        <h2>{result.pagetitle_t}</h2>
                                        <h4>{result.resulturl_s}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export interface Params {
    q: string;
    language: string;
    echoParams: string;
    wt: string;
    rows: string;
    hl: string;
    facet: string;
    fl: string;
    defType: string;
    qf: string;
    uniqueId: string;
    rid: string;
}

export interface ResponseHeader {
    zkConnected: boolean;
    status: number;
    QTime: number;
    params: Params;
}

export interface Doc {
    _uniqueid: string;
    pagetitle_t: string;
    resulturl_s: string;
}

export interface SearchResponse {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: Doc[];
}

export interface Result {
    name: string;
    title: string;
    result_card: string;
}

export interface Metadata {
    results: Result[];
}

export interface RootObject {
    responseHeader: ResponseHeader;
    response: SearchResponse;
    metadata: Metadata;
}

export default SearchPage;
