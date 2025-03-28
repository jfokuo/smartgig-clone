
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";

// Mock data for gigs
const allGigs = [
  {
    id: 1,
    title: "Interactive Calculus Course",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Mathematics",
    creator: "Dr. Jane Smith",
    rating: 4.9,
    price: 119.99,
  },
  {
    id: 2,
    title: "AI & Machine Learning Fundamentals",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Computer Science",
    creator: "Prof. Marcus Chen",
    rating: 4.8,
    price: 149.99,
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Language Arts",
    creator: "Emily Johnson",
    rating: 4.7,
    price: 89.99,
  },
  {
    id: 4,
    title: "Physics of Everyday Life",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Science",
    creator: "Dr. Richard Feynman",
    rating: 5.0,
    price: 129.99,
  },
  {
    id: 5,
    title: "Introduction to Python Programming",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Computer Science",
    creator: "Alex Turner",
    rating: 4.6,
    price: 79.99,
  },
  {
    id: 6,
    title: "Advanced Statistical Methods",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Mathematics",
    creator: "Dr. Lisa Wong",
    rating: 4.5,
    price: 139.99,
  },
  {
    id: 7,
    title: "English Literature Masterclass",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Language Arts",
    creator: "Prof. James Miller",
    rating: 4.8,
    price: 99.99,
  },
  {
    id: 8,
    title: "Chemistry Lab Techniques",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Science",
    creator: "Dr. Maria Rodriguez",
    rating: 4.7,
    price: 119.99,
  },
];

const categories = [
  "Mathematics",
  "Computer Science",
  "Language Arts",
  "Science",
];

const Gigs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort gigs
  const filteredGigs = allGigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(gig.category);
    const matchesPrice = priceRange === "all" || 
      (priceRange === "under100" && gig.price < 100) || 
      (priceRange === "100to150" && gig.price >= 100 && gig.price <= 150) || 
      (priceRange === "over150" && gig.price > 150);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort gigs
  const sortedGigs = [...filteredGigs].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "price_high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default: recommended
  });

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange("all");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Page Header */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Browse All Gigs</h1>
            <p className="text-gray-600">
              Discover interactive educational gigs created by expert educators.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search gigs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="lg:hidden flex items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(selectedCategories.length > 0 || priceRange !== "all") && (
                  <span className="ml-1 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {selectedCategories.length + (priceRange !== "all" ? 1 : 0)}
                  </span>
                )}
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Filters Sidebar */}
            <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    {(selectedCategories.length > 0 || priceRange !== "all") && (
                      <Button 
                        variant="ghost" 
                        className="h-auto p-0 text-sm flex items-center text-gray-500"
                        onClick={clearFilters}
                      >
                        Clear all <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Categories */}
                    <div>
                      <h3 className="font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox 
                              id={`category-${category}`} 
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label 
                              htmlFor={`category-${category}`}
                              className="ml-2 text-sm font-normal cursor-pointer"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="under100">Under $100</SelectItem>
                          <SelectItem value="100to150">$100 to $150</SelectItem>
                          <SelectItem value="over150">Over $150</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t lg:hidden">
                    <Button 
                      className="w-full bg-brand-blue hover:bg-brand-dark"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Grid */}
            <div className="flex-grow">
              <div className="mb-4">
                <p className="text-gray-600">{sortedGigs.length} results</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedGigs.map((gig) => (
                  <Link to={`/gig/${gig.id}`} key={gig.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={gig.image}
                          alt={gig.title}
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4 flex-grow">
                        <div className="text-sm text-brand-blue font-medium mb-1">
                          {gig.category}
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {gig.title}
                        </h3>
                        <div className="text-sm text-gray-500 mb-2">
                          By {gig.creator}
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 mr-1">
                            {"★".repeat(Math.floor(gig.rating))}
                          </div>
                          <span className="text-sm text-gray-700">
                            {gig.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className="font-bold text-lg">
                          ${gig.price.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {sortedGigs.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gigs;
