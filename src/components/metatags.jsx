import {Helmet} from "react-helmet";
import React from "react";

export default class Metatags extends React.Component {
    render () {
        const {t} = this.props
        return (
            <Helmet>
                <meta property="og:title" content={t('title')}/>
                <meta property="og:description" content={t('metaDescription')}/>
                <meta name="description" content={t('metaDescription')}/>
                <meta name="keywords" content={t('metaKeywords')}/>
                <meta name="twitter:title" content={t('title')}/>
                <meta name="twitter:description" content={t('metaDescription')}/>
                <title>{t('title')}</title>
            </Helmet>
        );
    }
};