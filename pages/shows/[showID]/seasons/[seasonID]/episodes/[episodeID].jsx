import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import MediaDetails from "../../../../../../components/media-details/media-details";

const Season = props => {
    return (
        <>
            <h1>
                <Link href="/shows/[showID]" as={`/shows/${props.show.id}`}>
                    <a>{props.show.name}</a>
                </Link>
            </h1>
            <h2>
                <Link href="/shows/[showID]/seasons/[seasonID]"
                      as={`/shows/${props.show.id}/seasons/${props.season.id}`}>
                    <a>Season {props.season.number}</a>
                </Link>
            </h2>
            <h3>Episode {props.episode.number}</h3>
            <h4>{props.episode.name}</h4>
            <MediaDetails media={props.episode}/>
        </>
    );
};

Season.getInitialProps = async function(context) {
    const { seasonID, showID, episodeID } = context.query;

    const [showRes, seasonRes, episodesRes] = await Promise.all(
        [
            fetch(`https://api.tvmaze.com/shows/${showID}`),
            fetch(`https://api.tvmaze.com/seasons/${seasonID}`),
            fetch(`https://api.tvmaze.com/episodes/${episodeID}`),
        ],
    );

    const [show, season, episode] = await Promise.all(
        [
            showRes.json(),
            seasonRes.json(),
            episodesRes.json(),
        ],
    );

    console.log(`Fetched season: ${episode.number}`);

    return { show, season, episode };
};

export default Season;
