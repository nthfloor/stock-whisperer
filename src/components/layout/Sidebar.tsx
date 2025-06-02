
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  Bookmark, 
  Calendar, 
  FileText, 
  Grid3X3, 
  Home, 
  Settings,
  TrendingUp 
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
  { name: 'Portfolio', href: '/portfolio', icon: BarChart3 },
  { name: 'Stock Directory', href: '/directory', icon: Grid3X3 },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
            Stock Watch
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
