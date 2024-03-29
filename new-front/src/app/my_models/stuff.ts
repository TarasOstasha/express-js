const log = console.log;

//////////////////////////////////////////////////////////////////////////////////////////
//                                    work with URL                                     //
//////////////////////////////////////////////////////////////////////////////////////////

const toQueryString = (params) => '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');

const parseQuery = (queryString) => {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};

const getUrlQueries:any = () => parseQuery(location.search); // get query from url
//create setQuery


export { log, toQueryString, parseQuery, getUrlQueries };
