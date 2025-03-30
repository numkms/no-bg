export default ({t}) => {
    return (
        <div className="mt-6 text-center">
            <h2>{t('how_to_use')}</h2> 
            {t('tutorial').split('\n').filter(e => e.length > 0).map((line, index) => (
                <div className="tutorial-element flex justify-center  items-center w-84  sm:w-[500px] pl-1 pr-1 pt-1 pb-1 bg-white rounded-md min-h-10 shadow-md overflow-hidden mt-1 text-xs text-neutral-600" key={index}>
                    {line}
                </div>
            ))}
        </div>
    )
}