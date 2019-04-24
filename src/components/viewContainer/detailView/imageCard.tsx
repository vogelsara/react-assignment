import React, { Component, CSSProperties, Fragment } from 'react';
import Spinner from '../../spinner';
import Modal from '../../modal';
import { ThemedCSSProperties, ThemeContext, ThemeState } from '../../../contexts/themeContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ls from 'local-storage';

export interface ImageUrls {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
}

interface Props {
    urls: ImageUrls
    view: string
    isLiked: boolean
}

interface State {
    isHover: boolean
    isModalOpen: boolean
    isLiked: boolean
}

export default class ImageCard extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            isHover: false,
            isModalOpen: false,
            isLiked: props.isLiked
        }

        this.onLikeCkilck = this.onLikeCkilck.bind(this);
    }

    getLikedImages() {
        if (!ls.get(this.props.view)) {
            return [];
        } else {
            return ls.get(this.props.view);
        }
    }

    addLikedImage(urls: ImageUrls) {
        let likedImages: ImageUrls[] = this.getLikedImages();
        likedImages.push(urls);
        ls.set(this.props.view, likedImages);
    }

    removeLikedImage(urls: ImageUrls) {
        let likedImages: ImageUrls[] = this.getLikedImages();
        this.removeElementFromImageUrlsArray(likedImages, urls);
        ls.set(this.props.view, likedImages);
    }

    removeElementFromImageUrlsArray(array: ImageUrls[], item: ImageUrls) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].full === item.full) {
                array.splice(i, 1);
                return;
            }
        }
    }

    style(theme: ThemeState): CSSProperties {
        const hover: CSSProperties = this.state.isHover ? {
            boxShadow: `0 8px 40px -5px ${theme.foreground.darkened}`,
            transform: 'scale(1.05, 1.05) translateY(-1%)'
        } : {}
        return {
            ...imageContainer(theme),
            ...hover
        }
    }

    onMouseEnter = () => this.setState({ isHover: true })
    onMouseLeave = () => this.setState({ isHover: false })
    openModal = () => this.setState({ isModalOpen: true });
    closeModal = () => this.setState({ isModalOpen: false });

    onLikeCkilck(event) {
        if (this.state.isLiked) {
            this.setState({
                isLiked: false
            });
            this.removeLikedImage(this.props.urls);
        } else {
            this.setState({
                isLiked: true
            });
            this.addLikedImage(this.props.urls);
        }
        event.stopPropagation();
    }

    render() {
        const { urls } = this.props
        return (
            <Fragment>
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <div
                        style={this.style(theme)}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onClick={this.openModal}
                    >
                        {this.props.urls.small ? 
                        <div style={cardContainer}> 
                            {this.state.isLiked ? <FaHeart onClick={this.onLikeCkilck}/> : <FaRegHeart onClick={this.onLikeCkilck} />}
                            <img 
                                src={this.props.urls.small} 
                                style={card}
                            /> 
                        </div> 
                        : <Spinner/> }
                    </div>
                    )}
                </ThemeContext.Consumer>
                {
                    this.state.isModalOpen ? (
                        <Modal shouldClose={this.closeModal}>
                            <img src={urls.regular} style={preview}/>
                        </Modal>
                    ) : null
                }
            </Fragment>
        )
    }
}

const imageContainer: ThemedCSSProperties = (theme) => ({
    margin: '1em',
    flexGrow: 1,
    background: `${theme.background.primary}AA`,
    width: '12em',
    height: '18em',
    transition: 'all 300ms'
})

const card: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}
const preview: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
}

const likeIcon: CSSProperties = {
    color: 'red',
    position: 'absolute',
    top: '8px',
    right: '16px',
    zIndex: 100,
    cursor: 'pointer'
}

const cardContainer: CSSProperties = {
    height: '100%',
    position: 'relative'
}