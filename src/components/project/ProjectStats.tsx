import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ProjectDetailData } from "@/types";
import { memo } from "react";

interface ProjectStatsProps {
  project: ProjectDetailData;
}

const ProjectStats = memo(({ project }: ProjectStatsProps) => {
  return (
    <div className="animate-fade-in">
      <Card className="bg-primary text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Program Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
              <div className="text-3xl font-bold text-white mb-1">45</div>
              <div className="text-sm text-white/80 mb-2">Families Served</div>
              <div className="flex items-center justify-center text-xs text-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18% this month
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
              <div className="text-3xl font-bold text-white mb-1">Monthly</div>
              <div className="text-sm text-white/80">Distribution</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
              <div className="text-3xl font-bold text-white mb-1">Dec 15</div>
              <div className="text-sm text-white/80">Next Distribution</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
              <div className="text-3xl font-bold text-white mb-1">{project.itemsFulfilled || 0}/{project.itemsNeeded || 100}</div>
              <div className="text-sm text-white/80">Items Collected</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;