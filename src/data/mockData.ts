// Mock data for development
import type { MockProject, MockCategory } from "@/types";

import communityImage from '@/assets/community-category.jpg';
import environmentImage from '@/assets/environment-category.jpg';
import healthcareImage from '@/assets/healthcare-category.jpg';

export const mockCategories: MockCategory[] = [
  {
    id: "category-1",
    title: "Community",
    description: "Local community development and social programs",
    imageUrl: communityImage,
    projectCount: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "category-2",
    title: "Education",
    description: "Educational resources and school supplies",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    projectCount: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "category-3",
    title: "Environment",
    description: "Environmental conservation and sustainability projects",
    imageUrl: environmentImage,
    projectCount: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "category-4",
    title: "Food Security",
    description: "Nutrition assistance and food programs",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    projectCount: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "category-5",
    title: "Healthcare",
    description: "Medical supplies and healthcare support programs",
    imageUrl: healthcareImage,
    projectCount: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "category-6",
    title: "Emergency Relief", 
    description: "Disaster response and emergency aid distribution",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
    projectCount: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockFeaturedProjects: MockProject[] = [
  {
    id: "project-1",
    title: "New Beginnings Shelter Kit",
    description: "Help provide essential living kits for those transitioning from homelessness to housing.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    organization: "Shelter Hope Foundation",
    categoryId: "category-1",
    itemsFulfilled: 15,
    itemsNeeded: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-2",
    title: "Back to School Supplies",
    description: "Equip underprivileged students with the school supplies they need to succeed.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    organization: "Education for All",
    categoryId: "category-2",
    itemsFulfilled: 78,
    itemsNeeded: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-3",
    title: "Animal Shelter Care Package",
    description: "Provide food, toys, and bedding for animals awaiting adoption.",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    organization: "Paws & Whiskers Rescue",
    categoryId: "category-3",
    itemsFulfilled: 42,
    itemsNeeded: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Extended projects for backwards compatibility
const extendedProjects = [
  ...mockFeaturedProjects,
  // Community Projects
  {
    id: "project-4",
    title: "Winter Warming Kits",
    description: "Provide warm clothing, blankets, and essentials to homeless individuals during winter.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    organization: "Shelter Hope Foundation",
    categoryId: "category-1",
    itemsFulfilled: 30,
    itemsNeeded: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-5",
    title: "Community Garden Setup",
    description: "Help establish a community garden with tools, seeds, and infrastructure for neighborhood food security.",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
    organization: "Green Community Initiative",
    categoryId: "category-1",
    itemsFulfilled: 45,
    itemsNeeded: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-6",
    title: "Senior Care Support Packages",
    description: "Deliver essential care items and companionship resources to isolated seniors in our community.",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    organization: "Elder Care Alliance",
    categoryId: "category-1",
    itemsFulfilled: 22,
    itemsNeeded: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Education Projects
  {
    id: "project-7",
    title: "Digital Learning Lab",
    description: "Equip underprivileged students with laptops and tablets for remote learning and digital literacy.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    organization: "Tech Education Foundation",
    categoryId: "category-2",
    itemsFulfilled: 15,
    itemsNeeded: 40,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-8",
    title: "Library Restoration Project",
    description: "Restore and restock our community library with new books, furniture, and learning materials.",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    organization: "Literacy Champions",
    categoryId: "category-2",
    itemsFulfilled: 85,
    itemsNeeded: 150,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-9",
    title: "STEM Education Kits",
    description: "Provide hands-on science, technology, engineering, and math kits for middle school students.",
    imageUrl: "https://images.unsplash.com/photo-1581092162384-8987c1d64718",
    organization: "Future Scientists Academy",
    categoryId: "category-2",
    itemsFulfilled: 32,
    itemsNeeded: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Environment Projects
  {
    id: "project-10",
    title: "Ocean Cleanup Initiative",
    description: "Support beach cleanup efforts with equipment and supplies to protect marine ecosystems.",
    imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7",
    organization: "Ocean Guardians",
    categoryId: "category-3",
    itemsFulfilled: 18,
    itemsNeeded: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-11",
    title: "Urban Tree Planting",
    description: "Plant native trees throughout the city to improve air quality and create green spaces.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    organization: "Green City Project",
    categoryId: "category-3",
    itemsFulfilled: 67,
    itemsNeeded: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-12",
    title: "Recycling Education Program",
    description: "Educate communities about proper recycling and provide bins and educational materials.",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    organization: "Waste Reduction Alliance",
    categoryId: "category-3",
    itemsFulfilled: 28,
    itemsNeeded: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Food Security Projects
  {
    id: "project-13",
    title: "Community Food Pantry Supplies",
    description: "Help stock our community pantry with essential food items for families in need.",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    organization: "Community Food Network",
    categoryId: "category-4",
    itemsFulfilled: 120,
    itemsNeeded: 200,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-14",
    title: "Mobile Food Kitchen",
    description: "Support our mobile kitchen that serves hot meals to underserved neighborhoods daily.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554",
    organization: "Meals on Wheels Plus",
    categoryId: "category-4",
    itemsFulfilled: 45,
    itemsNeeded: 90,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-15",
    title: "Weekend Backpack Program",
    description: "Provide weekend food packages for children who rely on school meals during the week.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    organization: "Kids First Nutrition",
    categoryId: "category-4",
    itemsFulfilled: 156,
    itemsNeeded: 250,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Healthcare Projects
  {
    id: "project-16",
    title: "Mobile Health Clinic Supplies",
    description: "Equip our mobile health clinic with medical supplies and equipment for rural communities.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f",
    organization: "Rural Health Alliance",
    categoryId: "category-5",
    itemsFulfilled: 12,
    itemsNeeded: 35,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-17",
    title: "Mental Health Support Kits",
    description: "Provide self-care and mental wellness resources to individuals struggling with mental health.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
    organization: "Mind Wellness Foundation",
    categoryId: "category-5",
    itemsFulfilled: 38,
    itemsNeeded: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-18",
    title: "Diabetes Care Support",
    description: "Support diabetic patients with monitoring supplies, healthy food options, and educational materials.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    organization: "Diabetes Care Network",
    categoryId: "category-5",
    itemsFulfilled: 24,
    itemsNeeded: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Housing Assistance Projects
  {
    id: "project-19",
    title: "Emergency Shelter Supplies",
    description: "Provide bedding, toiletries, and basic necessities for emergency shelter residents.",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    organization: "Emergency Housing Coalition",
    categoryId: "category-6",
    itemsFulfilled: 42,
    itemsNeeded: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-20",
    title: "Transitional Housing Setup",
    description: "Help families transitioning from homelessness with furniture and household essentials.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    organization: "New Beginnings Housing",
    categoryId: "category-6",
    itemsFulfilled: 18,
    itemsNeeded: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-21",
    title: "Home Repair Assistance",
    description: "Provide tools and materials to help low-income families with essential home repairs.",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    organization: "Habitat for Humanity Local",
    categoryId: "category-6",
    itemsFulfilled: 8,
    itemsNeeded: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Add extended properties for project detail compatibility
const mockProjectsWithDetails = extendedProjects.map(project => ({
  ...project,
  category: mockCategories.find(c => c.id === project.categoryId)?.title || "",
  location: "Local Community",
  beneficiaries: "Varies by project",
  timeline: "Ongoing",
  organizationDescription: `${project.organization} is a nonprofit dedicated to making a positive impact in our community through various outreach programs and initiatives.`,
  organizationWebsite: "https://example.org",
  items: [
    {
      id: `${project.id}-item-1`,
      name: "Essential Item 1",
      description: "A needed item for this project",
      price: 10.99,
      imageUrl: project.imageUrl,
      current: Math.floor(project.itemsFulfilled / 3),
      needed: Math.floor(project.itemsNeeded / 3)
    },
    {
      id: `${project.id}-item-2`,
      name: "Essential Item 2",
      description: "Another important item for this project",
      price: 15.49,
      imageUrl: project.imageUrl,
      current: Math.floor(project.itemsFulfilled / 3),
      needed: Math.floor(project.itemsNeeded / 3)
    },
    {
      id: `${project.id}-item-3`,
      name: "Essential Item 3",
      description: "A critically needed item for this project",
      price: 8.99,
      imageUrl: project.imageUrl,
      current: Math.floor(project.itemsFulfilled / 3),
      needed: Math.floor(project.itemsNeeded / 3)
    }
  ]
}));

// Export both versions for compatibility
export const mockProjects = mockProjectsWithDetails;
export const projects = mockProjects;