import React, { CSSProperties } from 'react';
import ViewSection from './viewSection';
import ImageLink from './imageLink';
import SearchField from "./searchfield";


interface Props {
    detailViews: string[]
}

/** React function component */
export default function MasterView(props: Props) {

    return <SearchField />;
}

const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '1em'
}