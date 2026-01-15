function Footer() {
    return (
        <footer className="w-full bg-gray-900 border-t border-gray-800">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:gap-6">

                    {/* Logo & Description */}
                    <div className="col-span-2 md:col-span-1">
                        <a href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl tracking-tight text-white">
                                Home
                                <span className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 bg-clip-text text-transparent">
                                    zuela
                                </span>
                                .com
                            </span>
                        </a>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            Venezuela's #1 real estate marketplace. Find your dream home with
                            verified listings and local expertise.
                        </p>
                    </div>

                   
                    {/* Buy & Rent */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                            Buy & Rent
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Homes for sale</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Homes for rent</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Land for sale</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Ranches for sale</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">New listings</a></li>
                        </ul>
                    </div>

                    {/* Sell & Agents */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                            Sell & Agents
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Sell your home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing your home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Find realtors</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Agent reviews</a></li>
                        </ul>
                    </div>

                     {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                            Company
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>


                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                            Support
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">List your home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Advertise</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span>&copy; 2026 Homezuela.com. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
