import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';
import ls from 'local-storage';

import ImageCard, { ImageUrls } from './imageCard';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';

interface Props {
    view: string
}

interface State {
    imagesUrls: ImageUrls[],
    isLoading: boolean,
    likedImages: ImageUrls[]
}

export default class ImageSection extends Component<Props, State> {
    readonly accessKey = "ffdbd1d729e00c403a48edc0969797cb5a9c7198464728895dbc870422757129"
    readonly imageDatabaseApiUrl = "https://api.unsplash.com/search/photos/"

    state: State = {
        imagesUrls: new Array().fill({}),
        isLoading: true,
        likedImages: ls.get(this.props.view) || []
    }

    handleResponse(response: AxiosResponse) {
        if (response.data && response.data.results) {
            const images = response.data.results.map((img: any) => img.urls)
            this.setState({ imagesUrls: images, isLoading: false })
        }
    }

    async componentDidMount() {
        try {
            const response = await Axios.get(this.imageDatabaseApiUrl, {
                params: {
                    client_id: this.accessKey,
                    query: this.props.view,
                    page: Math.round(Math.random() * 100),
                    per_page: 24,
                }
            })
            this.handleResponse(response);
        } catch(error) {
            console.error(error)
        }
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                        {this.state.likedImages.map((urls, index) =>
                            <ImageCard isLiked={true} view={this.props.view} key={index} urls={urls} />
                        )}
                        {this.state.imagesUrls.map((urls, index) =>
                            <ImageCard isLiked={false} view={this.props.view} key={index} urls={urls} />
                        )}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const root: ThemedCSSProperties = (theme) => ({
    margin: '3em -1em -1em -1em',
    display: 'flex',
    flexWrap: 'wrap',
    background: `${theme.background.primary}B3`,
    boxShadow: `0 0px 80px 15px ${theme.background.primary}`
})