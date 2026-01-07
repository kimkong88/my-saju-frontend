export default function Footer() {
    return (
        <footer className="bg-slate-900">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <p className="text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} MySaju. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
