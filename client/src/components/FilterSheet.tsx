import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const REGIONS = ["UK", "Asia", "Africa", "Europe", "Middle East", "North America", "Oceania", "South America", "Space"];
const TOPICS = ["Operations", "People", "Equipment & Technology", "Heritage"];

export function FilterSheet() {
  const [regions, setRegions] = useState<string[]>(["Asia", "Middle East", "North America"]);
  const [isBestMatch, setIsBestMatch] = useState(false);
  
  const toggleRegion = (region: string) => {
    setRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 h-14 rounded-2xl px-6 border-2">
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-bold">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
          <SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-10">
          {/* Sort By */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold">Sort by</h3>
            <div className="flex items-center gap-4">
              <span className={cn("text-sm font-medium transition-colors", !isBestMatch ? "text-foreground font-bold" : "text-muted-foreground")}>Latest</span>
              <Switch checked={isBestMatch} onCheckedChange={setIsBestMatch} />
              <span className={cn("text-sm font-medium transition-colors", isBestMatch ? "text-foreground font-bold" : "text-muted-foreground")}>Best match</span>
            </div>
          </section>

          {/* Filter by Date */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold">Filter by date</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium">Anytime</span>
              <Switch />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From:</Label>
                <Input type="text" placeholder="DD/MM/YYYY" className="bg-muted border-none h-12" />
              </div>
              <div className="space-y-2">
                <Label>To:</Label>
                <Input type="text" placeholder="DD/MM/YYYY" className="bg-muted border-none h-12" />
              </div>
            </div>
          </section>

          {/* Filter by Region */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Filter by region</h3>
              <button 
                onClick={() => setRegions([])}
                className="text-sm font-bold flex items-center gap-1 hover:underline"
              >
                Clear all <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map(region => (
                <Badge
                  key={region}
                  variant={regions.includes(region) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium h-auto"
                  onClick={() => toggleRegion(region)}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </section>

          {/* Filter by Topic */}
          <section className="space-y-4 pb-10">
            <h3 className="text-lg font-bold">Filter by topic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOPICS.map(topic => (
                <div key={topic} className="flex items-center gap-3 bg-muted p-4 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                  <div className="w-5 h-5 border-2 rounded bg-white" />
                  <span className="flex-1 text-sm font-bold">{topic}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 left-0 right-0 bg-background pt-4 border-t mt-auto">
          <SheetClose asChild>
            <Button className="w-full h-12 font-bold text-lg">Apply Filters</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

