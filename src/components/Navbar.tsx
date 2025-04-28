
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center">
          <div className="relative w-8 h-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-taxi-yellow rounded-full">
              <span className="text-taxi-dark text-xl font-bold">U</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-taxi-dark">Urban<span className="text-taxi-blue">Wheels</span></span>
        </div>
        
        <div className="flex items-center justify-end flex-1 space-x-4">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex flex-col h-full w-full justify-end rounded-md bg-gradient-to-b from-taxi-blue/80 to-taxi-blue p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Premium Rides
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Experience luxury and comfort with our premium taxi service.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="#" title="Standard">
                      Affordable daily rides
                    </ListItem>
                    <ListItem href="#" title="XL">
                      Spacious vehicles for groups
                    </ListItem>
                    <ListItem href="#" title="Economy">
                      Budget-friendly options
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Safety</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <ListItem href="#" title="Rider Safety">
                      Our commitment to passenger safety
                    </ListItem>
                    <ListItem href="#" title="Driver Verification">
                      How we verify our drivers
                    </ListItem>
                    <ListItem href="#" title="COVID-19">
                      Health and safety protocols
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  About Us
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
              className="rounded-full h-9 w-9 p-0 border-2 border-taxi-blue"
            >
              <span className="sr-only">Open user menu</span>
              <span className="text-taxi-blue font-bold">JD</span>
            </Button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ride History</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({ className, title, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { title: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default Navbar;
