import React from 'react';

const MediaDetails = (props) => {
    return (
        <>
            {
                props.media.image &&
                <img alt={`Poster image for ${props.media.name}`} src={props.media.image.medium}/>
            }
            {
                props.media.summary &&
                <p>{props.media.summary.replace(/<[/]?p>/g, '')}</p>
            }
        </>
    );
};

export default MediaDetails;
