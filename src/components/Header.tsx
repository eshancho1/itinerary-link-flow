import { Button } from '@/components/ui/button';
import { Plus, Share2, Save, Menu, Link as LinkIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-card border-b border-border shadow-sm">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* App Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <LinkIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Link</h1>
            <p className="text-xs text-muted-foreground">Itinerary Planner</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Save className="h-4 w-4" />
            Save
          </Button>
          
          <Button variant="gradient" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <Button variant="floating" size="sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New</span>
          </Button>

          {/* Mobile menu */}
          <Button variant="ghost" size="sm" className="sm:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;