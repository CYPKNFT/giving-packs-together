
export const mockCategories = [
  {
    id: "category-1",
    title: "Homeless Support",
    description: "Projects providing essential items and support for homeless individuals and families.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    projectCount: 12
  },
  {
    id: "category-2",
    title: "Education",
    description: "Support educational initiatives for underprivileged children and communities.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    projectCount: 8
  },
  {
    id: "category-3",
    title: "Animal Welfare",
    description: "Help animals in need through shelters, rescue operations, and care packages.",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    projectCount: 6
  },
  {
    id: "category-4",
    title: "Food Security",
    description: "Projects focused on addressing hunger and food insecurity in communities.",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    projectCount: 9
  },
  {
    id: "category-5",
    title: "Farm & Agriculture",
    description: "Supporting sustainable farming practices and agricultural development.",
    imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    projectCount: 5
  }
];

export const mockFeaturedProjects = [
  {
    id: "project-1",
    title: "New Beginnings Shelter Kit",
    description: "Help provide essential living kits for those transitioning from homelessness to housing.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    organization: "Shelter Hope Foundation",
    categoryId: "category-1",
    itemsFulfilled: 15,
    itemsNeeded: 50
  },
  {
    id: "project-2",
    title: "Back to School Supplies",
    description: "Equip underprivileged students with the school supplies they need to succeed.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    organization: "Education for All",
    categoryId: "category-2",
    itemsFulfilled: 78,
    itemsNeeded: 120
  },
  {
    id: "project-3",
    title: "Animal Shelter Care Package",
    description: "Provide food, toys, and bedding for animals awaiting adoption.",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    organization: "Paws & Whiskers Rescue",
    categoryId: "category-3",
    itemsFulfilled: 42,
    itemsNeeded: 60
  }
];

export const mockProjects = [
  ...mockFeaturedProjects,
  {
    id: "project-4",
    title: "Community Food Pantry Supplies",
    description: "Help stock our community pantry with essential food items for families in need.",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    organization: "Community Food Network",
    categoryId: "category-4",
    itemsFulfilled: 120,
    itemsNeeded: 200
  },
  {
    id: "project-5",
    title: "Sustainable Farm Equipment",
    description: "Support local farmers with necessary equipment for sustainable agriculture.",
    imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    organization: "Farm Futures Initiative",
    categoryId: "category-5",
    itemsFulfilled: 3,
    itemsNeeded: 10
  },
  {
    id: "project-6",
    title: "Winter Warming Kits",
    description: "Provide warm clothing, blankets, and essentials to homeless individuals during winter.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    organization: "Shelter Hope Foundation",
    categoryId: "category-1",
    itemsFulfilled: 30,
    itemsNeeded: 100
  }
];

// Expand the projects data with more details for the project detail page
mockProjects.forEach(project => {
  Object.assign(project, {
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
  });
});
