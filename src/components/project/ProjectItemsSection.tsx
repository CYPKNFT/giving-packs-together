import { Badge } from "@/components/ui/badge";
import ItemNeeds, { Item } from "@/components/ItemNeeds";
import { ProjectDetailData } from "@/types";
import { memo } from "react";

interface ProjectItemsSectionProps {
  project: ProjectDetailData;
  onDonateItem: (itemId: string, quantity: number) => void;
}

// Calculate item status counts
const getItemStatusCounts = (items: any[]) => {
  if (!items || items.length === 0) return { urgent: 0, low: 0, moderate: 0, stocked: 0 };
  
  return items.reduce((counts, item) => {
    const current = item.quantityFulfilled || item.current || 0;
    const needed = item.quantityNeeded || item.needed || 1;
    const percentage = Math.min(Math.round((current / needed) * 100), 100);
    if (percentage < 25) counts.urgent++;
    else if (percentage < 50) counts.low++;
    else if (percentage < 75) counts.moderate++;
    else counts.stocked++;
    return counts;
  }, { urgent: 0, low: 0, moderate: 0, stocked: 0 });
};

const ProjectItemsSection = memo(({ project, onDonateItem }: ProjectItemsSectionProps) => {
  const itemStatusCounts = getItemStatusCounts(project.items || []);

  return (
    <div className="bg-gray-100 -mx-4 px-4 py-12 rounded-lg animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">Items Needed</h2>
          
          {/* Status Tags */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="destructive" className="px-3 py-1">
              <span className="w-2 h-2 bg-red-300 rounded-full mr-2 inline-block"></span>
              {itemStatusCounts.urgent} Urgent (&lt;25%)
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 bg-orange-100 text-orange-800 border-orange-200">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 inline-block"></span>
              {itemStatusCounts.low} Low Stock (25-49%)
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 bg-yellow-100 text-yellow-800 border-yellow-200">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 inline-block"></span>
              {itemStatusCounts.moderate} Moderate (50-74%)
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 bg-green-100 text-green-800 border-green-200">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 inline-block"></span>
              {itemStatusCounts.stocked} Well Stocked (75%+)
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(project.items || []).map((item) => {
            // Transform ProjectItem to Item interface for ItemNeeds component
            const transformedItem: Item = {
              id: item.id,
              name: item.name,
              description: item.description || '',
              price: item.estimatedCost || 0,
              imageUrl: item.imageUrl || project.imageUrl,
              current: item.quantityFulfilled || 0,
              needed: item.quantityNeeded
            };
            
            return (
              <ItemNeeds 
                key={item.id}
                item={transformedItem} 
                onDonate={onDonateItem} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

ProjectItemsSection.displayName = 'ProjectItemsSection';

export default ProjectItemsSection;