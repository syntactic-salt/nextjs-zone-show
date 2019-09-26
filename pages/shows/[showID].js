import React from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

const Show = props => {
    const router = useRouter();
    const { year, month } = router.query;

    return (
        <>
            <h1>{props.show.name}</h1>
            <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
            <img alt={`Poster image for ${props.show.name}`} src={props.show.image.medium}/>
        </>
    );
};

Show.getInitialProps = async function(context) {
    const { showID } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${showID}`);
    const show = await res.json();

    console.log(`Fetched show: ${show.name}`);

    return { show };
};

export default Show;
