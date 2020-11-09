import React, {useContext} from 'react';
import {media} from "../../constants/Menu";
import './Footer.scss';
import {strings} from "../../strings/strings";
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";

export const Footer = () => {
    const [isDarkTheme] = useContext(DarkThemeContext);
    return (
        <div className={`${isDarkTheme && 'darks'} footer`}>
            <div className="footer-media">{strings.socialNetwork}</div>
            <div className="footer-media">
                {
                    media.map(value => {
                        return (
                            <a href={value.href} key={value.src} className="footer-media" target="blanket">
                                <img src={value.src} alt={value.alt} className="footer-media-icons"/>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
}


