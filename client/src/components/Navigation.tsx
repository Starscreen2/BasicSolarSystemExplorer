import { Link } from "wouter";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Gamepad2, Brain } from "lucide-react";

export default function Navigation() {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-6">
            <NavigationMenuItem>
              <Link href="/">
                <span className="text-lg font-bold py-4 block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                  Solar System Explorer
                </span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/quiz">
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                  <Brain className="h-4 w-4" />
                  <span>Quiz</span>
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/games">
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                  <Gamepad2 className="h-4 w-4" />
                  <span>Games</span>
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}