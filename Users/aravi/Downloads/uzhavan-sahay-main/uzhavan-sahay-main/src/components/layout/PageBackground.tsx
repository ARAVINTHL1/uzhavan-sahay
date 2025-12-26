import bgImage from '@/assets/indian-bulls-ploughing.png';

interface PageBackgroundProps {
    children: React.ReactNode;
}

export const PageBackground = ({ children }: PageBackgroundProps) => {
    return (
        <div className="min-h-screen relative">
            {/* Background Image - Matches Login Page */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >
                {/* Dark overlay with subtle blur for contrast - Matches Login Page */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

