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
                <a className="text-lg font-bold py-4 block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Solar System Explorer
                </a>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
