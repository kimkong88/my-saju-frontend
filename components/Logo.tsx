export default function Logo() {
    return (
        <>
            <div className="flex items-center gap-2">
                <div className="w-6 md:w-9 h-6 md:h-9 bg-slate-900 rounded-md md:rounded-xl flex items-center justify-center">
                    <div className="w-3 md:w-4 h-3 md:h-4 border-2 border-white rounded-full"></div>
                </div>
                <span className="font-bold text-xl md:text-2xl tracking-tight">
                    MySaju.
                </span>
            </div>
        </>
    );
}
