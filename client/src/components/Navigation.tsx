import { Link } from "wouter";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

export default function Navigation() {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <span className="text-lg font-bold py-4 block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                  Solar System Explorer
                </span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}