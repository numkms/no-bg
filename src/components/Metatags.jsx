import {Helmet} from "react-helmet";
import React from "react";

export default class Metatags extends React.Component {
    render () {

        const {t, lang} = this.props
        const jsonLdData = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "CutBG",
            "image": "https://cutbg.org/ogimage.webp",
            "description": t("metaDescription"),
            "provider": {
                "@type": "Organization",
                "name": t("metaTitle")
            },
            "url": 'https://cutbg.org',
            "inLanguage": lang
        };

        return (
            <Helmet>
                <html lang={lang} />
                <meta property="og:title" content={t('metaTitle')}/>
                <meta property="og:description" content={t('metaDescription')}/>
                <meta name="description" content={t('metaDescription')}/>
                <meta name="keywords" content={t('metaKeywords')}/>
                <meta name="twitter:title" content={t('metaTitle')}/>
                <meta name="twitter:description" content={t('metaDescription')}/>
                <title>{t('metaTitle')}</title>

                <script type="application/ld+json">
                    {
                        JSON.stringify(jsonLdData)
                    }
                </script>
            </Helmet>
        );
    }
};