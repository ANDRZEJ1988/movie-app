import React from 'react';
import {media} from "../../constants/Menu";
import './Footer.scss';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-media">Ми в соціальаних мережах:</div>
            <div className="footer-media">
                {
                    media.map(value => {
                        return (
                            <a href={value.href} key={value.src} className="footer-media">
                                <img src={value.src} alt={value.alt} className="footer-media-icons"/>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
}


