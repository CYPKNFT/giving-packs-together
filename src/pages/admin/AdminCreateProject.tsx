import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { 
  Plus, 
  Trash2, 
  Save, 
  Send, 
  MapPin, 
  Calendar,
  DollarSign,
  Package,
  Users,
  AlertTriangle
} from "lucide-react";

interface ProjectItem {
  name: string;
  description: string;
  category: string;
  quantity_needed: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_cost?: number;
}

const AdminCreateProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { adminUser } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    about_text: '',
    location: '',
    beneficiaries: '',
    urgency: 'medium',
    start_date: '',
    end_date: '',
    estimated_cost: '',
    image_url: '',
    website_url: '',
    timeline: '',
    category_id: ''
  });

  const [items, setItems] = useState<ProjectItem[]>([
    {
      name: '',
      description: '',
      category: '',
      quantity_needed: 1,
      priority: 'medium'
    }
  ]);

  const categories = [
    { id: 'food', name: 'Food & Nutrition' },
    { id: 'clothing', name: 'Clothing & Textiles' },
    { id: 'education', name: 'Education & Learning' },
    { id: 'health', name: 'Health & Medical' },
    { id: 'shelter', name: 'Housing & Shelter' },
    { id: 'community', name: 'Community Development' }
  ];

  const addItem = () => {
    setItems([...items, {
      name: '',
      description: '',
      category: '',
      quantity_needed: 1,
      priority: 'medium'
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ProjectItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSaveDraft = async () => {
    await handleSubmit('draft');
  };

  const handleSubmitForReview = async () => {
    await handleSubmit('pending');
  };

  const handleSubmit = async (status: 'draft' | 'pending') => {
    if (!adminUser?.organization_id) {
      setError('Organization information not found');
      return;
    }

    if (!projectData.title || !projectData.description) {
      setError('Please fill in the required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create the project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          ...projectData,
          organization_id: adminUser.organization_id,
          status,
          estimated_cost: projectData.estimated_cost ? parseFloat(projectData.estimated_cost) : null
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Add project items
      if (items.length > 0 && items.some(item => item.name)) {
        const validItems = items
          .filter(item => item.name.trim())
          .map(item => ({
            ...item,
            project_id: project.id
          }));

        if (validItems.length > 0) {
          const { error: itemsError } = await supabase
            .from('project_items')
            .insert(validItems);

          if (itemsError) throw itemsError;
        }
      }

      toast({
        title: status === 'draft' ? 'Draft saved!' : 'Project submitted!',
        description: status === 'draft' 
          ? 'Your project has been saved as a draft'
          : 'Your project has been submitted for review'
      });

      navigate('/admin/projects');
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-muted-foreground">
              Create a project to connect with donors and fulfill community needs
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={projectData.title}
                    onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                    placeholder="Winter Coat Drive for Local Families"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={projectData.description}
                    onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                    placeholder="Brief description of your project goals and impact"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="about_text">Detailed About Text</Label>
                  <Textarea
                    id="about_text"
                    value={projectData.about_text}
                    onChange={(e) => setProjectData({...projectData, about_text: e.target.value})}
                    placeholder="Tell the full story of your project, its importance, and how it will help the community"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={projectData.category_id} onValueChange={(value) => setProjectData({...projectData, category_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={projectData.urgency} onValueChange={(value) => setProjectData({...projectData, urgency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Needed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Items Needed
                  </span>
                  <Button onClick={addItem} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Item {index + 1}</h4>
                      {items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Item Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                          placeholder="Winter coats"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={item.category}
                          onChange={(e) => updateItem(index, 'category', e.target.value)}
                          placeholder="Clothing"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Describe the item and any specific requirements"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <Label>Quantity Needed</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity_needed}
                          onChange={(e) => updateItem(index, 'quantity_needed', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Select value={item.priority} onValueChange={(value) => updateItem(index, 'priority', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Est. Cost ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.estimated_cost || ''}
                          onChange={(e) => updateItem(index, 'estimated_cost', parseFloat(e.target.value))}
                          placeholder="25.00"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline & Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={projectData.start_date}
                    onChange={(e) => setProjectData({...projectData, start_date: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={projectData.end_date}
                    onChange={(e) => setProjectData({...projectData, end_date: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={projectData.location}
                    onChange={(e) => setProjectData({...projectData, location: e.target.value})}
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <Label htmlFor="beneficiaries">Who Will Benefit</Label>
                  <Textarea
                    id="beneficiaries"
                    value={projectData.beneficiaries}
                    onChange={(e) => setProjectData({...projectData, beneficiaries: e.target.value})}
                    placeholder="Families in need, seniors, children..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media & Links */}
            <Card>
              <CardHeader>
                <CardTitle>Media & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image_url">Project Image URL</Label>
                  <Input
                    id="image_url"
                    value={projectData.image_url}
                    onChange={(e) => setProjectData({...projectData, image_url: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    value={projectData.website_url}
                    onChange={(e) => setProjectData({...projectData, website_url: e.target.value})}
                    placeholder="https://yourorganization.org"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>

                <Button
                  onClick={handleSubmitForReview}
                  className="w-full"
                  disabled={loading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>

                <p className="text-xs text-muted-foreground">
                  Projects must be reviewed and approved before becoming visible to donors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateProject;