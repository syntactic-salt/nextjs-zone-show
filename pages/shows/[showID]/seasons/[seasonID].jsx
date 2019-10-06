import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import MediaDetails from "../../../../components/media-details/media-details";

const Season = props => {
    return (
        <>
            <h1>
                <Link href="/shows/[showID]" as={`/shows/${props.show.id}`}>
                    <a>{props.show.name}</a>
                </Link>
            </h1>
            <h2>Season {props.season.number}</h2>
            <MediaDetails media={props.season}/>
            <ol>
                {
                    props.episodes.map((episode) => {
                        return (
                            <li key={episode.id}>
                                <Link href="/shows/[showID]/seasons/[seasonID]/episodes/[episodeID]"
                                      as={`/shows/${props.show.id}/seasons/${props.season.id}/episodes/${episode.id}`}>
                                    <a>{episode.name}</a>
                                </Link>
                            </li>
                        );
                    })
                }
            </ol>
        </>
    );
};

Season.getInitialProps = async function(context) {
    const { seasonID, showID } = context.query;

    const [showRes, seasonRes, episodesRes] = await Promise.all(
        [
            fetch(`https://api.tvmaze.com/shows/${showID}`),
            fetch(`https://api.tvmaze.com/seasons/${seasonID}`),
            fetch(`http://api.tvmaze.com/seasons/${seasonID}/episodes`),
        ],
    );

    const [show, season, episodes] = await Promise.all(
        [
            showRes.json(),
            seasonRes.json(),
            episodesRes.json(),
        ],
    );

    console.log(`Fetched season: ${season.number}`);

    return { show, season, episodes };
};

export default Season;
