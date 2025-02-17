import { Flame, Lock, MusicIcon, VideoIcon, TabletSmartphone, FileText } from "lucide-react"

export default function BottomSection() {
return (
  <div>
    <section className="w-full py-10 md:py-15 lg:py-20 bg-gray-100 text-black">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
              <div className="flex flex-col items-center text-center py-2">
                <Flame className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Robust Framework</h3>
                <p className="text-gray-600 px-10">WebApp developed using NextJs + MongoDB + Shadcn</p>
              </div>
              <div className="flex flex-col items-center text-center py-2">
                <VideoIcon className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">High-Quality Video Hosting</h3>
                <p className="text-gray-600 px-10">Media Upload and Delivery is supported by ImageKit.</p>
              </div>
              <div className="flex flex-col items-center text-center py-2">
                <Lock className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
                <p className="text-gray-600 px-10">Implemented NextAuth for authentication. Added Video Like Support!</p>
              </div>
              <div className="flex flex-col items-center text-center py-2">
                <MusicIcon className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Practice</h3>
                <p className="text-gray-600 px-10">Improve your skills with pdf Notes side-by-side</p>
              </div>
              <div className="flex flex-col items-center text-center py-2">
              <TabletSmartphone className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Mobile Ready</h3>
                <p className="text-gray-600 px-10">Practice anywhere with our mobile-optimized vertical video format</p>
              </div>
              <div className="flex flex-col items-center text-center py-2">
                <FileText className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Resource Hub</h3>
                <p className="text-gray-600 px-10">Access lyrics, chord sheets, and tabs - all in one place</p>
              </div>
            </div>
          </div>
        </section>    
          <section className="w-full py-12 md:py-20 lg:py-32 bg-black text-white">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Developed with ❤️ by Satvik
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 text-md">
                    A Full-Stack Developer who loves to code and build amazing products. Reach me out if you are interested to work with this project!
                </p>
              </div>
            </div>
          </div>
        </section>
      <footer className="flex flex-col py-2 sm:flex-row  w-full shrink-0 items-center px-4 md:py-2 border-t">
        <p className="text-xs text-gray-500">© 2025 LEGATO. All rights reserved.</p>
      </footer>
      </div>
)};