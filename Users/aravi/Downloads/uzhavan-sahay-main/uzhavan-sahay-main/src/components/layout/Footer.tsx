import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-black/90 backdrop-blur-md border-t border-white/10 py-8 text-white mt-auto relative z-10">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-300 text-sm md:text-base">
                    {t('footerCopyright')}
                </p>
            </div>
        </footer>
    );
};
