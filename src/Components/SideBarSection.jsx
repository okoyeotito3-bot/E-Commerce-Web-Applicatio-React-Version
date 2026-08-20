import { X, House, Heart, Package, User, Settings, LogOut, Bell, HelpCircle, Tag, Moon,} from 'lucide-react'

export default function SideBarSection({ isOpen, onClose,order,home,hideSection }) {
  return (
    <section
      className={`
        fixed left-0 top-16
        w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4
        h-screen
        z-[60]
        bg-white shadow-2xl
        transition-transform duration-300
        flex flex-col gap-4 pl-2
        overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      onClick={hideSection}
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
      </div>

      {/* Account section */}
      <div className="flex items-end gap-4 px-4 pb-4 mb-12">
        <User className="w-10 h-10 p-2 bg-gray-100 rounded-full" />
        <div className="flex flex-col">
          <span className="font-bold">Guest</span>
          <span className="text-sm text-gray-500">Sign in</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex flex-col gap-4 px-4 py-4 mb-12" >
        
        <div className="flex items-center gap-3 cursor-pointer" onClick={home}>
          <House className="w-5 h-5" />
          <span>Home</span>
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <Heart className="w-5 h-5" />
          <span>Wishlist</span>
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer"
        onClick={order}>
          <Package className="w-5 h-5" />
          <span>Orders</span>
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <Tag className="w-5 h-5" />
          <span>Offers & Coupons</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-4 px-4 py-4  mb-12">
        
        <span className="text-sm font-bold text-gray-400">Categories</span>
        
        <div className="flex flex-col gap-2">
          <span className="cursor-pointer  p-2">Electronics</span>
          <span className="cursor-pointer p-2">Clothing</span>
          <span className="cursor-pointer p-2">Home & Kitchen</span>
        </div>
      </div>

      {/* Preferences */}
      <div className="flex flex-col gap-4 px-4 py-4 mb-12">
        <div className="flex items-center gap-3 cursor-pointer">
          <Moon className="w-5 h-5" />
          <span>Dark Mode</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </div>
      </div>

      {/* Bottom utility links */}
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer text-red-500">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </div>
    </section>
  )
}