export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            {/* SVG Logo - Filled dot with circle around it */}
            <svg
                className="w-6 md:w-9 h-6 md:h-9"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer rounded square */}
                <rect width="48" height="48" rx="12" fill="#0f172a" />

                {/* Outer circle - perfectly centered */}
                <circle
                    cx="24"
                    cy="24"
                    r="12"
                    stroke="white"
                    strokeWidth="2.5"
                    fill="none"
                />

                {/* Filled center dot - perfectly centered */}
                <circle cx="24" cy="24" r="6" fill="white" />
            </svg>
            <span className="font-bold text-xl md:text-2xl tracking-tight">
                PulseMap
            </span>
        </div>
    );
}
