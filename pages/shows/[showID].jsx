import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import MediaDetails from "../../components/media-details/media-details";

const Show = props => {
    return (
        <>
            <h1>{props.show.name}</h1>
            <MediaDetails media={props.show}/>
            <ul>
                {
                    props.seasons.map((season) => {
                        return (
                            <li key={season.id}>
                                <Link href="/shows/[showID]/seasons/[seasonID]" as={`/shows/${props.show.id}/seasons/${season.id}`}>
                                    <a>Season {season.number}</a>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};

Show.getInitialProps = async function(context) {
    const { showID } = context.query;

    const [showRes, seasonsRes] = await Promise.all(
        [
            fetch(`https://api.tvmaze.com/shows/${showID}`),
            fetch(`https://api.tvmaze.com/shows/${showID}/seasons`),
        ],
    );

    const [show, seasons] = await Promise.all(
        [
            showRes.json(),
            seasonsRes.json(),
        ],
    );

    console.log(`Fetched show: ${show.name}`);

    return { show, seasons };
};

export default Show;
