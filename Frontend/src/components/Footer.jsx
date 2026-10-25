const Footer = () => {
  return (
    <div className="py-12 border-t border-zinc-200 bg-[#05051f]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:b-0">
                    <span className=" text-cyan-500 uppercase text-2xl font-bold">Abhinay Bari.</span>
                </div>
                <div className="flex space-x-6 mb-6 md:mb-0">
                    <a href="#" className="text-white hover:text-teal-900 transition">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">

                       <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        </a>
                         <a href="#" className="text-white hover:text-teal-900 transition">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.504.337c1.909-1.295 2.748-1.026 2.748-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        </a>
                         <a href="#" className="text-white hover:text-teal-900 transition">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                        
                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.998h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM7.119 20.452H3.555V8.998h3.564v11.454zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                        </svg>
                        </a>
                </div>
                <div className="text-zinc-400 text-sm">
                    @ 2026 Abhinay Bari Developer. All right reseverd.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer